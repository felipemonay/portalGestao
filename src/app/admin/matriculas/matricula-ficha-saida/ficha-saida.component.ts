import { ComponentFixture } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { FichaSaida } from './ficha-saida.model';
import { FichaSaidaService } from './ficha-saida.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { LogService } from 'src/app/shared/services/log.service';
import { IntegracaoService } from 'src/app/shared/services/integracao.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-ficha-saida',
  templateUrl: './ficha-saida.component.html',
  styleUrls: ['./ficha-saida.component.scss',
              '../matricula.component.scss']
})
export class FichaSaidaComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  f: FormGroup;
  formStatus = false;
  pessoasAut: boolean;
  saida: string;
  idMatricula: number;
  idAutorizacaoSaida: number;
  fichaSaida: FichaSaida;
  retirar = 'hidden';
  outros = 'hidden';
  transporte = 'hidden';
  navega: boolean;

  constructor(
    private fbSrv: FormBuilder,
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private locationSrv: Location,
    private fichaSaidaSrv: FichaSaidaService,
    private toastrSrv: ToastrService,
    private logSrv: LogService,
    private integraSrv: IntegracaoService,
  ) {
    this.idMatricula = Number(this.routeActiveSrv.snapshot.paramMap.get('idMatricula'));
    this.navega = Boolean(this.routeActiveSrv.snapshot.paramMap.get('navega'));
    // console.log(this.idMatricula);

  }

  ngOnInit() {
    window.scrollTo(0, 0);

    // carrega combos
    this.routeActiveSrv.data.subscribe(data => {
      this.fichaSaida = data.fichaSaida;
    });
    if (this.fichaSaida.autorizacaoSaida) {
      this.idAutorizacaoSaida = this.fichaSaida.autorizacaoSaida.idAutorizacaoSaida;
      this.retirar = ((this.fichaSaida.autorizacaoSaida.idTipoAutorizacaoSaida === 2) ||
                      (this.fichaSaida.autorizacaoSaida.idTipoAutorizacaoSaida === 3)) ? '' : 'hidden';
      this.outros =  (this.fichaSaida.autorizacaoSaida.outros) ? '' : 'hidden';
      this.transporte = (this.fichaSaida.autorizacaoSaida.idTipoAutorizacaoSaida === 4) ? '' : 'hidden';
    }

    this.f = this.fbSrv.group({
      autorizacaoSaida: this.fbSrv.group(
        (this.fichaSaida.autorizacaoSaida) ?
        {
          idMatricula:            [this.idMatricula],
          idTipoAutorizacaoSaida: [this.fichaSaida.autorizacaoSaida.idTipoAutorizacaoSaida, [Validators.required]],
          pai:                    [this.fichaSaida.autorizacaoSaida.pai],
          mae:                    [this.fichaSaida.autorizacaoSaida.mae],
          responsavelFinanceiro:  [this.fichaSaida.autorizacaoSaida.responsavelFinanceiro],
          responsavelPedagogico:  [this.fichaSaida.autorizacaoSaida.responsavelPedagogico],
          outros:                 [this.fichaSaida.autorizacaoSaida.outros],
        } : {
          idMatricula:            [this.idMatricula],
          idTipoAutorizacaoSaida: [null, [Validators.required]],
          pai:                    [0],
          mae:                    [0],
          responsavelFinanceiro:  [0],
          responsavelPedagogico:  [0],
          outros:                 [0],
        }
      ),

      autorizacaoRetirarAluno: this.fbSrv.group(
        (this.fichaSaida.autorizacaoRetirarAluno) ?
        {
          nome:                   [this.fichaSaida.autorizacaoRetirarAluno.nome],
          cpf:                    [this.fichaSaida.autorizacaoRetirarAluno.cpf],
          parentesco:             [this.fichaSaida.autorizacaoRetirarAluno.parentesco],
          telefoneResidencial:    [this.fichaSaida.autorizacaoRetirarAluno.telefoneResidencial],
          telefoneCelular:        [this.fichaSaida.autorizacaoRetirarAluno.telefoneCelular]
        } : {
          nome:                   [null],
          cpf:                    [null],
          parentesco:             [null],
          telefoneResidencial:    [null],
          telefoneCelular:        [null]
        }
      ),

      transporteEscolar: this.fbSrv.group(
        (this.fichaSaida.transporteEscolar) ?
        {
          idTransporteEscolar:    [this.fichaSaida.transporteEscolar.idTransporteEscolar],
          usaTransporteEscolar:   [(this.fichaSaida.transporteEscolar.usaTransporteEscolar) ?
            this.fichaSaida.transporteEscolar.usaTransporteEscolar : 0 ],
          naoDefinido:            [1],
          nomeCondutor:           [this.fichaSaida.transporteEscolar.nomeCondutor],
          telefoneCondutor:       [this.fichaSaida.transporteEscolar.telefoneCondutor],
          idAutorizacaoSaida:     [this.fichaSaida.transporteEscolar.idAutorizacaoSaida]
        } : {
          idTransporteEscolar:    [null],
          usaTransporteEscolar:   [null],
          naoDefinido:            [1],
          nomeCondutor:           [null],
          telefoneCondutor:       [null],
          idAutorizacaoSaida:     [null]

        }
      ),

      valeTransporte: this.fbSrv.group(
        (this.fichaSaida.valeTransporte) ?
        {
          sptrans:                [this.fichaSaida.valeTransporte.sptrans],
          bom:                    [this.fichaSaida.valeTransporte.bom],
          naoSolicitado:          [this.fichaSaida.valeTransporte.naoSolicitado],
          idMatricula:            [this.idMatricula]
        } : {
          sptrans:                [0],
          bom:                    [0],
          naoSolicitado:          [1],
          idMatricula:            [this.idMatricula]
        }
      )
    });
  }

  onSubmit(proximaRota: string) {
    console.log(this.f.valid);

    if (this.f.valid) {

      const data = this.f.value;
      if (data.autorizacaoSaida.idTipoAutorizacaoSaida === 1) {
        delete data['autorizacaoRetirarAluno'];
        delete data['transporteEscolar'];
      } else if ((data.autorizacaoSaida.idTipoAutorizacaoSaida === 2) ||
          (data.autorizacaoSaida.idTipoAutorizacaoSaida === 3)) {
        delete data['transporteEscolar'];
        if (!data.autorizacaoSaida.outros) {
          delete data['autorizacaoRetirarAluno'];
        }
      } else {
        delete data['autorizacaoRetirarAluno'];
        data['transporteEscolar']['usaTransporteEscolar'] = 1;
        (data.transporteEscolar.idAutorizacaoSaida) ? data.transporteEscolar.idAutorizacaoSaida :
        delete data['transporteEscolar']['idAutorizacaoSaida'];
        (data.transporteEscolar.idTransporteEscolar) ? data.transporteEscolar.idTransporteEscolar :
        delete data['transporteEscolar']['idTransporteEscolar'];
      }
      // console.log('data', data);

      if (this.navega) {
        this.integra('prox');
      } else {
        this.fichaSaidaSrv.save(data, this.idAutorizacaoSaida).subscribe(success => {
          this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
          this.navigateTo('/admin/matricula/documentos', {idMatricula: this.idMatricula});
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
  this.formStatus = true;
  console.log(this.f.valid);

  if (this.f.valid) {

    const data = this.f.value;
    if (data.autorizacaoSaida.idTipoAutorizacaoSaida === 1) {
      delete data['autorizacaoRetirarAluno'];
      delete data['transporteEscolar'];
    } else if ((data.autorizacaoSaida.idTipoAutorizacaoSaida === 2) ||
        (data.autorizacaoSaida.idTipoAutorizacaoSaida === 3)) {
      delete data['transporteEscolar'];
      if (!data.autorizacaoSaida.outros) {
        delete data['autorizacaoRetirarAluno'];
      }
    } else {
      delete data['autorizacaoRetirarAluno'];
      data['transporteEscolar']['usaTransporteEscolar'] = 1;
      (data.transporteEscolar.idAutorizacaoSaida) ? data.transporteEscolar.idAutorizacaoSaida :
      delete data['transporteEscolar']['idAutorizacaoSaida'];
      (data.transporteEscolar.idTransporteEscolar) ? data.transporteEscolar.idTransporteEscolar :
      delete data['transporteEscolar']['idTransporteEscolar'];
    }
    // console.log('data', data);

    this.fichaSaidaSrv.save(data, this.idAutorizacaoSaida).subscribe(success => {
      this.integraSrv.integraMatricula(this.idMatricula).subscribe(success => {
        this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
        this.blockUI.start('Integrando com o Perseus...'); // Start blocking
        console.log('success2', success);
          this.toastrSrv.success('', 'Dados integrados com sucesso!', {timeOut: 600});
          if (status === 'prox') {
            this.navigateTo('/admin/matricula/documentos', {idMatricula: this.idMatricula});
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
  this.logSrv.log('fichaSaida', 'tratamento de erro BackEnd', this.f.value, err);
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
        if (control.invalid) {
          this.logSrv.log('fichaSaida',
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

  hideRetirar(): void {
    this.retirar = '';
    this.transporte = 'hidden';
    (this.f.controls.autorizacaoSaida.get('outros').value) ? this.outros = '' : this.outros = 'hidden';
  }

  hideOutros(): void {
    this.outros = (this.outros === 'hidden') ? '' : 'hidden';
  }

  hideTransporte(): void {
    this.transporte = '';
    this.outros = 'hidden';
    this.retirar = 'hidden';
  }

  hideAll(): void {
    this.transporte = 'hidden';
    this.outros = 'hidden';
    this.retirar = 'hidden';
  }

  solicitar(ev: any) {
    ev.target.value = 1;
    console.log('ev', ev.target);
    if (ev.target.name === 'naoSolicitado') {
      this.f.get('valeTransporte.sptrans').setValue(0);
      this.f.get('valeTransporte.bom').setValue(0);
    } else {
      this.f.get('valeTransporte.naoSolicitado').setValue(0);
    }
  }
}
