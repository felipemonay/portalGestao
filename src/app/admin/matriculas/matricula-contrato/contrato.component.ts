import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ContratoService } from './contrato.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { LogService } from 'src/app/shared/services/log.service';


@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['../matricula.component.scss',
              './contrato.component.scss']
})
export class ContratoComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  f: FormGroup;
  formStatus = false;
  idMatricula: number;
  contratoPDF: any;
  navega: boolean;

  constructor(
    private fbSrv: FormBuilder,
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private locationSrv: Location,
    private contratoSrv: ContratoService,
    private toastrSrv: ToastrService,
    private sanitizer: DomSanitizer,
    private logSrv: LogService,

    // private blockUISrv: NgBlockUI
  ) {
    this.idMatricula = Number(this.routeActiveSrv.snapshot.paramMap.get('idMatricula'));
    this.navega = Boolean(this.routeActiveSrv.snapshot.paramMap.get('navega'));
    console.log(this.idMatricula);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.f = this.fbSrv.group({
      termoAceite: [null, [Validators.required]]
    });

    this.contratoSrv.getFile(this.idMatricula).subscribe(file => {
      this.contratoPDF = this.sanitizer.bypassSecurityTrustResourceUrl(
         window.URL.createObjectURL(file));
        console.log('conteudo', this.contratoPDF);
      }, (erro) => {
        // this.contratoPDF = erro;
        console.log('erro:', erro);
      }
    );
  }

  onSubmit() {
    if (this.f.valid && !this.formStatus) {
      this.formStatus = true;

      console.log(this.f.value);
      let mensagem = 'Enviamos para seu email uma copia do contrato assinado digitalmente';
      mensagem += '\n acesse nossa loja para efetuar compras de materiais';

      this.contratoSrv.save({idMatricula: this.idMatricula}).subscribe(success => {
        this.toastrSrv.success(mensagem, 'Matricula efetuada com Sucesso', {timeOut: 6000});
        this.navigateTo('/admin/dashboard2', {});
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
    this.logSrv.log('contrato', 'tratamento de erro BackEnd', this.f.value, err);
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
    Object.keys(formGroup.controls).forEach(campo => {
      const control = formGroup.get(campo);
      if (control instanceof FormControl) {
        control.markAsDirty();
        control.markAsTouched();

        if (control.invalid) {
          this.logSrv.log('contrato',
                          'tratamento de erro FrontEnd',
                         {
                          'idMatricula': this.idMatricula,
                          'campo': campo,
                          'value': control.value
                        });
          this.toastrSrv.warning(`O campo ${campo} deve ser prenchido` , 'Existem campos incompletos', {timeOut: 3000});
        }
      } else if (control instanceof FormGroup) {
        this.mostraErrosForm(control);
      }
    });
  }


  navigateTo(route: string, parm: any = '') {
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv});
  }

  backClicked() {
    this.locationSrv.back();
  }

}
