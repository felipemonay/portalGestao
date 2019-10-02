import { LogService } from './../../../shared/services/log.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl, NgControlStatus } from '@angular/forms';

import { Documentos } from './documentos.model';
import { DocumentosService } from './documentos.service';
import { FileManager } from 'src/app/shared/components/input-file/input-file.component';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { IntegracaoService } from 'src/app/shared/services/integracao.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss',
              '../matricula.component.scss']
})
export class DocumentosComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  f: FormGroup;
  documentos: Documentos;
  formStatus = false;
  idMatricula: number;
  formArrayDocumentos: FormArray;
  contador = -1;
  navega: boolean;

  constructor(
    private formBuilderSrv: FormBuilder,
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private locationSrv: Location,
    private documentosSrv: DocumentosService,
    private toastrSrv: ToastrService,
    private logSrv: LogService,
    private integraSrv: IntegracaoService,
  ) {

    this.idMatricula = Number(this.routeActiveSrv.snapshot.paramMap.get('idMatricula'));
    this.navega = Boolean(this.routeActiveSrv.snapshot.paramMap.get('navega'));
    console.log(this.idMatricula);
  }

  ngOnInit() {

    window.scrollTo(0, 0);

    // carrega dados
    this.routeActiveSrv.data.subscribe(data => {
      this.documentos = data.documentos;
    });

    this.f = this.formBuilderSrv.group({
      documentos: this.formBuilderSrv.array([])
    });

    this.formArrayDocumentos = this.f.get('documentos') as FormArray;
    this.documentos.docAluno.forEach(doc => {
      this.contador += 1;
      this.formArrayDocumentos.push(this.createItem(doc));
    });

    this.documentos.docResponsavel.forEach(doc => {
      this.formArrayDocumentos.push(this.createItem(doc));
    });

    console.log('model:',this.documentos.docAluno );
  }
  onSubmit(proximaRota: string) {
    // console.log(this.f.valid);
    if (!this.documentos.docAluno.length && !this.documentos.docResponsavel.length ) {
      this.navigateTo('/admin/matricula/planoPagamento', {idMatricula: this.idMatricula});
    } else if (this.f.valid) {
      // console.log('submit');
      this.formStatus = true;

      let dados: any[];
      dados = this.formArrayDocumentos.value;

      dados = dados.filter((item) => 
        item.urldocumento !== null
      );

      // console.log('dados', dados);
      if (!dados.length) {
        this.navigateTo('/admin/matricula/planoPagamento', {idMatricula: this.idMatricula});
      } else {
        if (this.navega) {
          this.integra('prox');
        } else {
          this.documentosSrv.save(dados, this.idMatricula).subscribe(success => {
          this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 1000});
          this.navigateTo('/admin/matricula/planoPagamento', {idMatricula: this.idMatricula});
          }, (err) => {
            this.formStatus = false;
            this.trataErro(err);
            console.error(err);
          });
        }
      }
    } else {
      window.scrollTo(0, 0);
      this.mostraErrosForm(this.f);
    }
  }

  trataErro(err: HttpErrorResponse) {
    this.logSrv.log('documentos', 'tratamento de erro BackEnd', this.f.value, err);
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
          this.logSrv.log('documentos',
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

  createItem(documentos: any): FormGroup {
    // console.log(this.documentos);
    return this.formBuilderSrv.group(
      (documentos.documentoEntregue) ?
      {
        idMatricula:            [this.idMatricula],
        iddocumentosrequeridos: [documentos.iddocumentosrequeridos],
        idPessoa:               [documentos.idPessoa],
        validadedocumento:      [documentos.documentoEntregue.validadedocumento, (documentos.validade && documentos.obrigatorio) ?
                                 [Validators.required] : []],
        urldocumento:           [documentos.documentoEntregue.imageBase64, (documentos.obrigatorio) ? [Validators.required] : [] ]
      } : {
        idMatricula:            [this.idMatricula],
        iddocumentosrequeridos: [documentos.iddocumentosrequeridos],
        idPessoa:               [documentos.idPessoa],
        validadedocumento:      [null, (documentos.validade && documentos.obrigatorio) ? [Validators.required] : []],
        urldocumento:           [null, (documentos.obrigatorio) ? [Validators.required] : [] ]
      }
    );
  }

  selectedFile(file: FileManager, i: number): void {
    if (file.name) {
      this.formArrayDocumentos.controls[i].get('urldocumento').setValue(file.base64Data);
    } else {
      this.formArrayDocumentos.controls[i].get('urldocumento').setValue(null);
    }
  }

  selectedFileResp(file: FileManager, i: number): void {
    let count = i + this.contador + 1;
    if (file.name) {
      this.formArrayDocumentos.controls[count].get('urldocumento').setValue(file.base64Data);
    } else {
      this.formArrayDocumentos.controls[count].get('urldocumento').setValue(null);
    }
  }

  integra(status: string) {
    // console.log(this.f.valid);
    if (!this.documentos.docAluno.length && !this.documentos.docResponsavel.length ) {

    } else if (this.f.valid) {
      // console.log('submit');
      this.formStatus = true;
      let dados: any[];
      dados = this.formArrayDocumentos.value;
      dados = dados.filter((item) =>
        item.urldocumento !== null
      );
      // console.log('dados', dados);
      if (!dados.length) {
      } else {
        this.documentosSrv.save(dados, this.idMatricula).subscribe(success => {
          this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
          this.blockUI.start('Integrando com o Perseus...'); // Start blocking
          this.integraSrv.integraMatricula(this.idMatricula).subscribe(success => {
            console.log('success2', success);
              this.toastrSrv.success('', 'Dados integrados com sucesso!', {timeOut: 600});
              if (status === 'prox') {
                this.navigateTo('/admin/matricula/planoPagamento', {idMatricula: this.idMatricula});
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
      }
    } else {
      window.scrollTo(0, 0);
      this.mostraErrosForm(this.f);
    }
  }
}
