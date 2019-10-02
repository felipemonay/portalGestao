import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { FichaSaude } from './ficha-saude.model';
import { FichaSaudeService } from './ficha-saude.service';
import { DropdownService } from './../../../shared/services/dropdown.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { LogService } from 'src/app/shared/services/log.service';
import { IntegracaoService } from 'src/app/shared/services/integracao.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-ficha-saude',
  templateUrl: './ficha-saude.component.html',
  styleUrls: ['./ficha-saude.component.scss',
              '../matricula.component.scss']
})
export class FichaSaudeComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  f: FormGroup;
  formStatus = false;
  statusPlano = 'hidden';
  statusNecessidade = 'hidden';
  statusAlergico = 'hidden';
  statusTratamento = 'hidden';
  statusMedicacao = 'hidden';
  idMatricula: number;
  listaTipoSanguineo: any[];
  fichaSaude: FichaSaude;
  navega: boolean;

  constructor(
    private fbSrv: FormBuilder,
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private locationSrv: Location,
    private fichaSaudeSrv: FichaSaudeService,
    private dropdownSrv: DropdownService,
    private toastrSrv: ToastrService,
    private logSrv: LogService,
    private integraSrv: IntegracaoService,
  ) {
    this.idMatricula = Number(this.routeActiveSrv.snapshot.paramMap.get('idMatricula'));
    this.navega = Boolean(this.routeActiveSrv.snapshot.paramMap.get('navega'));
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    // carrega combos
    this.routeActiveSrv.data.subscribe(data => {
      this.listaTipoSanguineo       = data.tipoSanguineo;
      this.fichaSaude               = data.fichaSaude;
      console.log('fichaSaude', (this.fichaSaude.fichaSaude));
    });

    this.f = this.fbSrv.group({
      fichaSaude: this.fbSrv.group(
        (this.fichaSaude.fichaSaude) ?
        {
          idMatricula:                [this.idMatricula],
          idps_saude:                 [this.fichaSaude.fichaSaude.idps_saude],
          idPessoa:                   [this.fichaSaude.fichaSaude.idPessoa],
          tipoSanguineo:              [this.fichaSaude.fichaSaude.tipoSanguineo, [Validators.required, Validators.nullValidator]],
          possuiPlanoSaude:           [this.fichaSaude.fichaSaude.possuiPlanoSaude],
          nomePlanoSaude:             [this.fichaSaude.fichaSaude.nomePlanoSaude],
          possuiNecessidadeEspecial:  [this.fichaSaude.fichaSaude.possuiNecessidadeEspecial],
          nomeNecessidadeEspecial:    [this.fichaSaude.fichaSaude.nomeNecessidadeEspecial],
          possuiAlergiaMedicamento:   [this.fichaSaude.fichaSaude.possuiAlergiaMedicamento],
          nomeAlergiaMedicamento:     [this.fichaSaude.fichaSaude.nomeAlergiaMedicamento],
          realizaTratamentoMedico:    [this.fichaSaude.fichaSaude.realizaTratamentoMedico],
          nomeTratamentoMedico:       [this.fichaSaude.fichaSaude.nomeTratamentoMedico],
          possuiMedicacaoRegular:     [this.fichaSaude.fichaSaude.possuiMedicacaoRegular],
          nomeMedicacaoRegular:       [this.fichaSaude.fichaSaude.nomeMedicacaoRegular],
          informacaoAdicional:        [this.fichaSaude.fichaSaude.informacaoAdicional]
        } : {
          idMatricula:                [this.idMatricula],
          idps_saude:                 [null],
          idPessoa:                   [null],
          tipoSanguineo:              ['', [Validators.required]],
          possuiPlanoSaude:           [null],
          nomePlanoSaude:             [null],
          possuiNecessidadeEspecial:  [null],
          nomeNecessidadeEspecial:    [null],
          possuiAlergiaMedicamento:   [null],
          nomeAlergiaMedicamento:     [null],
          realizaTratamentoMedico:    [null],
          nomeTratamentoMedico:       [null],
          possuiMedicacaoRegular:     [null],
          nomeMedicacaoRegular:       [null],
          informacaoAdicional:        [null]
        }
      ),
    });

    if (this.fichaSaude.fichaSaude) {
      this.statusPlano =        ((this.fichaSaude.fichaSaude.possuiPlanoSaude) ? '' : 'hidden' );
      this.statusNecessidade =  ((this.fichaSaude.fichaSaude.possuiNecessidadeEspecial) ? '' : 'hidden' );
      this.statusAlergico =     ((this.fichaSaude.fichaSaude.possuiAlergiaMedicamento) ? '' : 'hidden' );
      this.statusTratamento =   ((this.fichaSaude.fichaSaude.realizaTratamentoMedico) ? '' : 'hidden' );
      this.statusMedicacao =    ((this.fichaSaude.fichaSaude.possuiMedicacaoRegular) ? '' : 'hidden' );
    } else {
      this.statusPlano =        'hidden';
      this.statusNecessidade =  'hidden';
      this.statusAlergico =     'hidden';
      this.statusTratamento =   'hidden';
      this.statusMedicacao =    'hidden';
    }
   console.log('get', this.f.get('fichaSaude.idps_saude').value);
}


  onSubmit() {
    if (this.f.valid && !this.formStatus) {
      this.formStatus = true;
      console.log('submit', this.f.value);
      if (this.navega) {
        this.integra('prox');
      } else {
        this.fichaSaudeSrv.save(this.f.value, this.f.get('fichaSaude.idps_saude').value).subscribe(success => {
          this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 1000});
          this.navigateTo('/admin/matricula/fichaSaida', {idMatricula: this.idMatricula});
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
      console.log('submit', this.f.value);
      this.fichaSaudeSrv.save(this.f.value, this.f.get('fichaSaude.idps_saude').value).subscribe(success => {
        this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
        this.blockUI.start('Integrando com o Perseus...'); // Start blocking
        this.integraSrv.integraMatricula(this.idMatricula).subscribe(success => {
          console.log('success2', success);
            this.toastrSrv.success('', 'Dados integrados com sucesso!', {timeOut: 600});
            if (status === 'prox') {
              this.navigateTo('/admin/matricula/fichaSaida', {idMatricula: this.idMatricula});
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
    this.logSrv.log('fichaSaude', 'tratamento de erro BackEnd', this.f.value, err);
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
          this.logSrv.log('fichaSaude',
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

  hidePlano(): void {
    this.statusPlano = (this.statusPlano === 'hidden') ? '' : 'hidden';
  }

  hideNecessidade(): void {
    this.statusNecessidade = (this.statusNecessidade === 'hidden') ? '' : 'hidden';
  }

  hideAlergico(): void {
    this.statusAlergico = (this.statusAlergico === 'hidden') ? '' : 'hidden';
  }

  hideTratamento(): void {
    this.statusTratamento = (this.statusTratamento === 'hidden') ? '' : 'hidden';
  }

  hideMedicacao(): void {
    this.statusMedicacao = (this.statusMedicacao === 'hidden') ? '' : 'hidden';
  }


  verificaValidTouched(form: FormGroup | FormArray, nomeCampo: string) {
    return (
      !form.get(nomeCampo).valid &&
      (form.get(nomeCampo).touched || form.get(nomeCampo).dirty)
    );
  }

  aplicaCssErro(nomeCampo: string) {
    return {
      'has-success': this.verificaValidTouched(this.f, nomeCampo),
      'has-feedback': this.verificaValidTouched(this.f, nomeCampo),
      'has-error': this.verificaValidTouched(this.f, nomeCampo)
    };
  }


}
