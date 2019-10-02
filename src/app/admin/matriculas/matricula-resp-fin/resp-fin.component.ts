import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { EnderecoService } from 'src/app/shared/services/endereco.service';
import { PessoaService } from 'src/app/shared/services/pessoa.service';
import { DropdownService } from './../../../shared/services/dropdown.service';
import { RespFinService } from './resp-fin.service';
import { ResponsavelFinanceiro } from './resp-fin.model';
import { take } from 'rxjs/operators';
import { LogService } from 'src/app/shared/services/log.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmaCpfComponent } from '../modal/confirmaCpf/modal-confirma-cpf.component';
import { IntegracaoService } from 'src/app/shared/services/integracao.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-resp-fin',
  templateUrl: './resp-fin.component.html',
  styleUrls: ['./resp-fin.component.scss',
              '../matricula.component.scss']
})
export class RespFinComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  f: FormGroup;
  formStatus = false;
  spinnerCep = false;
  spinnerCpf = false;
  idMatricula: any;
  possuiRespPed: boolean;
  listaTipoSexos: any[];
  listaNacionalidades: any[];
  listaOrgaosEmissores: any[];
  listaCidades: any[];
  listaEstados: any[];
  respFin: ResponsavelFinanceiro;
  possuiCep = true;
  navega: boolean;


  constructor(
    private fbSrv: FormBuilder,
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private locationSrv: Location,
    private respFinSrv: RespFinService,
    private pessoaSrv: PessoaService,
    private enderecoSrv: EnderecoService,
    private dropdownSrv: DropdownService,
    private toastrSrv: ToastrService,
    private logSrv: LogService,
    private modalService: NgbModal,
    private integraSrv: IntegracaoService,
  ) {

    this.idMatricula = this.routeActiveSrv.snapshot.paramMap.get('idMatricula');
    this.navega = Boolean(this.routeActiveSrv.snapshot.paramMap.get('navega'));
    this.possuiRespPed = (this.routeActiveSrv.snapshot.paramMap.get('possuiRespPed') === 'false') ? false : true;
  console.log(this.idMatricula);

}

ngOnInit() {
  window.scrollTo(0, 0);

   // carrega combos
   this.routeActiveSrv.data.subscribe(data => {
    this.listaNacionalidades  = data.nacionalidades;
    this.listaOrgaosEmissores = data.OrgaoEmissores;
    this.listaTipoSexos       = data.tipoSexos;
    this.listaEstados         = data.estados;
    this.listaCidades         = data.cidades;
    this.respFin              = data.respFin;
    console.log('respFin', this.respFin);
  });
  console.log('dadosResp', this.respFin);
  this.f = this.fbSrv.group({
      Basicos: this.fbSrv.group(
        (this.respFin.pessoa && this.respFin.pessoa.Basicos) ?
        {
          nome:                [this.respFin.pessoa.Basicos.nome, [Validators.required]],
          idNacionalidade:     [this.respFin.pessoa.Basicos.idNacionalidade, [Validators.required]],
          dataNascimento:      [this.respFin.pessoa.Basicos.dataNascimento, [Validators.required]],
          sexo:                [this.respFin.pessoa.Basicos.sexo, [Validators.required]],
          email:               [this.respFin.pessoa.Basicos.email, [Validators.required, Validators.email]],
          telefonefixo:        [(this.respFin.pessoa.Basicos.telefonefixo ? this.respFin.pessoa.Basicos.telefonefixo
                                  .replace('+55', '').replace(/\D/g, '') : null)],
          telefonecelular:     [(this.respFin.pessoa.Basicos.telefonecelular ? this.respFin.pessoa.Basicos.telefonecelular
                                  .replace('+55', '').replace(/\D/g, '') : null), [Validators.required]],
          idPessoa:            [this.respFin.pessoa.Basicos.idPessoa]
        } : {
          nome:                [null, [Validators.required]],
          idNacionalidade:     [null, [Validators.required]],
          dataNascimento:      [null, [Validators.required]],
          sexo:                [null, [Validators.required]],
          email:               [null, [Validators.required, Validators.email]],
          telefonefixo:        [null],
          telefonecelular:     [null, [Validators.required]],
          idPessoa:            [null]
        }
      ),

      Documento: this.fbSrv.group(
        (this.respFin.pessoa && this.respFin.pessoa.Documento) ?
        {
          cpf:                [this.respFin.pessoa.Documento.cpf + ''.replace(/\D/g, ''), [Validators.required]],
          rgEmissor:          [this.respFin.pessoa.Documento.rgEmissor, [Validators.required, Validators.maxLength(3)]],
          rg:                 [this.respFin.pessoa.Documento.rg + ''.replace(/\D/g, ''),
                              [Validators.required, Validators.minLength(6)]]
        } : {
          cpf:                [null, [Validators.required]],
          rgEmissor:          [null, [Validators.required, Validators.maxLength(3)]],
          rg:                 [null, [Validators.required, Validators.minLength(6)]]
        }
      ),

      Endereco: this.fbSrv.group(
        (this.respFin.pessoa && this.respFin.pessoa.Endereco) ?
        {
          cep:                 [this.respFin.pessoa.Endereco.cep.replace(/\D/g, ''), [Validators.required]],
          logradouro:          [this.respFin.pessoa.Endereco.logradouro, [Validators.required]],
          numero:              [this.respFin.pessoa.Endereco.numero, [Validators.required]],
          complemento:         [this.respFin.pessoa.Endereco.complemento],
          bairro:              [this.respFin.pessoa.Endereco.bairro, [Validators.required]],
          idUf:                [this.respFin.pessoa.Endereco.idUf, [Validators.required]],
          idCidade:            [this.respFin.pessoa.Endereco.idCidade, [Validators.required]]
        } : {
          cep:                 [null, [Validators.required]],
          logradouro:          [null, [Validators.required]],
          numero:              [null, [Validators.required]],
          complemento:         [null],
          bairro:              [null, [Validators.required]],
          idUf:                [null, [Validators.required]],
          idCidade:            [null, [Validators.required]]
        }
      )
    });

    if (this.respFin.pessoa && this.respFin.pessoa.Endereco) {
      this.consultaCEP( this.respFin.pessoa.Endereco.cep);
    }
  }

  onSubmit() {
    if (this.f.valid && !this.formStatus) {
      // console.log('submit',this.f.value);
      if (this.navega) {
        this.integra('prox');
      } else {
      this.formStatus = true;
      this.respFinSrv.save(this.f.value, this.idMatricula).subscribe(success => {
        this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
          // if (this.possuiRespPed === false) {
          //   this.navigateTo('/admin/matricula/fichaSaude', {idMatricula: this.idMatricula});
          // } else {
            this.navigateTo('/admin/matricula/responsavelPedagogico', {idMatricula: this.idMatricula});
          // }
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

  trataErro(err: HttpErrorResponse) {
    this.logSrv.log('respFin', 'tratamento de erro BackEnd', this.f.value, err);
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
          this.logSrv.log('respFin',
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

  enderecoDiferente() {
    this.f.patchValue({
        Endereco: {
          cep: null,
          logradouro: null,
          numero: null,
          complemento: null,
          bairro: null,
          idUf: null,
          idCidade: null
        }
    });
  }

  consultaPessoaCPF(evento) {
    // (<HTMLInputElement>evento.target).value;
    const cpf = (<HTMLInputElement>evento.target).value;

    // Expressão regular para validar o CEP.
    const validaCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

    if (cpf != null && validaCpf.test(cpf) ) {
      this.spinnerCpf = true;
      this.pessoaSrv.getByParm(0, cpf.replace(/\D/g, '')).subscribe(dados => {
        this.populaDadosPessoaForm(this.f, dados.dados);
      });
      this.spinnerCpf = false;
    }
  }

  public populaDadosPessoaForm(formGroup, data) {
    if (data) {
      Object.keys(formGroup.controls).forEach(campo => {
          const control = formGroup.get(campo);
          if (control instanceof FormControl) {
              control.patchValue(data[campo]);
          } else if (control instanceof FormGroup) {
              this.populaDadosPessoaForm(control, data[campo]);
          }
      });
    }
  }

  consultaCEP(cep) {
    // Expressão regular para validar o CEP.
    const validacep = /^[0-9]{5}[0-9]{3}$/;
    cep = cep.replace(/\D/g, '');
    if (cep != null && validacep.test(cep) ) {
      this.spinnerCep = true;
      this.enderecoSrv.getByCEP(cep).subscribe(dados => {
        this.populaDadosEderecoForm(dados.endereco);
        this.spinnerCep = false;
      });
    }
  }

  populaDadosEderecoForm(dados) {
    if (dados.erro) {
      this.possuiCep = null;
    } else {
      this.possuiCep = true;
      this.f.patchValue({
          Endereco: {
            logradouro: dados.logradouro,
            // cep: dados.cep,
            // complemento: dados.complemento,
            bairro: dados.bairro,
            idCidade: dados.idCidade,
            idUf: dados.idUf
          }
      });
    }
  }

  onChangeCidade(idUf = null) {
    this.routeActiveSrv.data.subscribe(data => {
      this.listaCidades = data.cidades.filter((item) => item.idUf.toString() === idUf );
    });
  }

  verificaValidTouched(form: FormGroup | FormArray, nomeCampo: string) {
    return (
      !form.get(nomeCampo).valid &&
      (form.get(nomeCampo).touched || form.get(nomeCampo).dirty)
    );
  }

  aplicaCssErro(nomeCampo: string) {
    return {
      'has-error': this.verificaValidTouched(this.f, nomeCampo),
      'has-feedback': this.verificaValidTouched(this.f, nomeCampo)
    };
  }

  validaCpf() {
    if ((this.respFin.pessoa) && (this.respFin.pessoa.Aluno) && (this.respFin.pessoa.Aluno.cpf !== '')) {
      console.log('documentoRespFin', this.f.get('Documento.cpf').value);
      console.log('documentoAluno', this.respFin.pessoa.Aluno.cpf);
      if (this.f.get('Documento.cpf').value === this.respFin.pessoa.Aluno.cpf) {
        this.open();
        this.formStatus = false;
      } else {
        this.onSubmit();
      }
    } else {
      this.onSubmit();
    }
  }

  open() {
    const modalRef = this.modalService.open(ModalConfirmaCpfComponent, {centered: true});
    modalRef.result.then((result) => {
      if (result) {
        this.onSubmit();
      } else {
        window.scrollTo(0, 0);
      }
    });
  }

  integra(status: string) {
    if (this.f.valid && !this.formStatus) {
      this.formStatus = true;
      // console.log('submit',this.f.value);

      this.respFinSrv.save(this.f.value, this.idMatricula).subscribe(success => {
        this.blockUI.start('Integrando com o Perseus...'); // Start blocking
        this.integraSrv.integraResponsavel(this.idMatricula, 'financeiro').subscribe(success => {
          this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
          console.log('success2', success);
            this.toastrSrv.success('', 'Dados integrados com sucesso!', {timeOut: 600});
            if (status === 'prox') {
              this.navigateTo('/admin/matricula/responsavelPedagogico', {idMatricula: this.idMatricula});
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
}
