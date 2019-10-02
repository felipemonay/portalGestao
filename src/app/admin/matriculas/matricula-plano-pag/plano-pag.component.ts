import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { take, tap, catchError, timeout } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PlanoPagService } from './plano-pag.service';
import { PlanoPagEscolhido } from './plano-pagEscolhido.model';
import { PlanoPag } from './plano-pag.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DescontoModal } from './descontos/descontos.component';
import { Observable, empty } from 'rxjs';
import { LogService } from 'src/app/shared/services/log.service';
import { IntegracaoService } from 'src/app/shared/services/integracao.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-plano-pag',
  templateUrl: './plano-pag.component.html',
  styleUrls: ['./plano-pag.component.scss',
              '../matricula.component.scss']
})
export class PlanoPagComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  f: FormGroup;
  formStatus = false;
  idMatricula: number;
  planoEscolhido: PlanoPagEscolhido;
  planos$: Observable<PlanoPag[]>;

  planoVencimento: any;
  navega: boolean;

  constructor(
    private fbSrv: FormBuilder,
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private locationSrv: Location,
    private planoPagSrv: PlanoPagService,
    private toastrSrv: ToastrService,
    private modalService: NgbModal,
    private logSrv: LogService,
    private integraSrv: IntegracaoService,
  ) {
    this.idMatricula = Number(this.routeActiveSrv.snapshot.paramMap.get('idMatricula'));
    this.navega = Boolean(this.routeActiveSrv.snapshot.paramMap.get('navega'));
    console.log(this.idMatricula);
  }

  ngOnInit() {
    console.log('onInit');
    window.scrollTo(0, 0);
    this.routerSrv.routeReuseStrategy.shouldReuseRoute = function() {return false;}
    this.routerSrv.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this.routerSrv.navigated = false;
         // if you need to scroll back to top, here is the right place
         window.scrollTo(0, 0);
      }
  });

    this.routeActiveSrv.data.subscribe(data => {
      this.planoEscolhido    = data.planoEscolhido;
      // this.planos            = data.planos;
      this.planoVencimento   = data.planoEscolhido;
    });
    // console.log('planoEscolhido', this.planoEscolhido);
    // console.log('planos', this.planos);

    this.f = this.fbSrv.group({
      plano: [this.planoEscolhido, [Validators.required]]
    });
    this.refresh();
  }

  refresh() {
    this.planos$ = this.planoPagSrv.getPlanos(this.idMatricula).pipe(
      tap(console.log),
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        // alert('erro');
        return empty();
      })
    );
  }

  selecionaPlano(ev: any) {
    this.f.controls.plano.patchValue(ev);
    this.planoEscolhido = ev;
  }

  onSubmit() {
    if (this.f.valid && !this.formStatus) {
      console.log('submit');

      let data = this.f.value;
      if (data.plano.idprecificacao === this.planoVencimento.idPrecificacao) {
        data.plano.planosPagamento = this.planoVencimento.planosPagamento;
      }
      if (this.navega) {
        this.integra('prox');
      } else {
        this.formStatus = true;
        this.planoPagSrv.save(data, this.idMatricula).subscribe(success => {
            this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
            this.navigateTo('/admin/matricula/contrato', {idMatricula: this.idMatricula});
        }, (err) => {
          this.formStatus = false;
          this.trataErro(err);
          console.error(err);
        });
      }
    } else {
      window.scrollTo(0, 0);
      this.mostraErrosForm(this.f);
    }
  }

  integra(status: string) {
    if (this.f.valid && !this.formStatus) {
      this.formStatus = true;
      console.log('submit');
      let data = this.f.value;
      if (data.plano.idprecificacao === this.planoVencimento.idPrecificacao) {
        data.plano.planosPagamento = this.planoVencimento.planosPagamento;
      }
      this.planoPagSrv.save(data, this.idMatricula).subscribe(success => {
        this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
        this.blockUI.start('Integrando com o Perseus...'); // Start blocking
        this.integraSrv.alteraDesconto(this.idMatricula).subscribe(success => {
          console.log('success2', success);
            this.toastrSrv.success('', 'Dados integrados com sucesso!', {timeOut: 600});
            if (status === 'prox'){
              this.navigateTo('/admin/matricula/contrato', {idMatricula: this.idMatricula});
            }
        }, (err) => {
          this.formStatus = false;
          this.trataErro(err);
          console.error(err);
        });
      }, (err) => {
        this.formStatus = false;
        this.trataErro(err);
        console.error(err);
      });
    } else {
      window.scrollTo(0, 0);
      this.mostraErrosForm(this.f);
    }
  }

  trataErro(err: HttpErrorResponse) {
    this.logSrv.log('planoPagamento', 'tratamento de erro BackEnd', this.f.value, err);
    // console.log(err);
    try {
      const arrKeys = Object.keys(err.error);
      const config = {
        'progressBar': true,
        maxOpened: 5
      };
      arrKeys.forEach(key => {
        const arrKeyErros = err.error[key];
        if (Array.isArray(arrKeyErros)) {
          arrKeyErros.forEach(errorMessage => {
            this.toastrSrv.error(errorMessage, '', config).onTap.pipe(take(1));
          });
        } else {
          this.toastrSrv.error(arrKeyErros, '').onTap.pipe(take(1));
        }
      });
    } catch (error) {
      console.log('Erro Não tratado handle', error);
      this.toastrSrv.error('Ocorreu um erro inesperado!!!', '').onTap.pipe(take(1));
    }
  }

  mostraErrosForm(formGroup) {
    // console.log('teste');
    Object.keys(formGroup.controls).forEach(campo => {
      const control = formGroup.get(campo);
      if (control instanceof FormControl) {
        if (control.invalid) {
          this.logSrv.log('planoPagamento',
                          'tratamento de erro FrontEnd',
                         {
                          'idMatricula': this.idMatricula,
                          'campo': campo,
                          'value': control.value
                        });
          this.toastrSrv.warning(`O campo ${campo} deve ser prenchido` , 'Existem campos incompletos', {timeOut: 3000});
        }
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.mostraErrosForm(control);
      }
    });
  }

  navigateTo(route: string, parm: any = []) {
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv});
  }

  backClicked() {
    this.locationSrv.back();
  }

  open() {
    const modalRef = this.modalService.open(DescontoModal, {centered: true, size: 'lg'});
    modalRef.componentInstance.idMatricula = this.idMatricula;
    modalRef.result.then((result) => {
        console.log('resultModal', result);
        setTimeout(() => {
          this.refresh();
        }, 2000);
      }).catch((error) => {
        console.log('errorModal', error);
    });


  }

}
