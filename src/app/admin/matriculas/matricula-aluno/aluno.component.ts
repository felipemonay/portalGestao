import { HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Matricula } from './matricula.model';
import { DropdownService } from './../../../shared/services/dropdown.service';
import { EnderecoService } from 'src/app/shared/services/endereco.service';
import { PessoaService } from 'src/app/shared/services/pessoa.service';
import { AlunoService } from './aluno.service';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { IntegracaoService } from 'src/app/shared/services/integracao.service';
import { LogService } from 'src/app/shared/services/log.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss',
              '../matricula.component.scss']
})
export class AlunoComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  f: FormGroup;
  formStatus = false;
  spinnerCpf = false;
  spinnerCep = false;
  possuiCep = true;

  idMatricula: number;
  listaTipoSexos: any[];
  listaNacionalidades: any[];
  listaOrgaosEmissores: any[];
  listaCidades: any[];
  listaEstados: any[];
  listaUnidades: any[];
  listaPeriodosLetivos: any[];
  listaSeries: any[];
  listaTurmas: any[];
  matricula: Matricula;
  idUnidade: number;
  idCurso: number;
  idPeriodoLetivo: number;
  idSerie: number;
  idTurma: number;
  navega: boolean;


  constructor(
    private fbSrv: FormBuilder,
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private locationSrv: Location,
    private alunoSrv: AlunoService,
    private enderecoSrv: EnderecoService,
    private pessoaSrv: PessoaService,
    private dropdownSrv: DropdownService,
    private toastrSrv: ToastrService,
    private integraSrv: IntegracaoService,
    private logSrv: LogService
  ) {

    this.idMatricula = Number(this.routeActiveSrv.snapshot.paramMap.get('idMatricula'));
    this.navega = Boolean(this.routeActiveSrv.snapshot.paramMap.get('navega'));
    this.idUnidade = Number(this.routeActiveSrv.snapshot.paramMap.get('idUnidade'));
    this.idCurso = Number(this.routeActiveSrv.snapshot.paramMap.get('idCurso'));
    this.idPeriodoLetivo = Number(this.routeActiveSrv.snapshot.paramMap.get('idPeriodoLetivo'));
    this.idSerie = Number(this.routeActiveSrv.snapshot.paramMap.get('idSerie'));
    this.idTurma = Number(this.routeActiveSrv.snapshot.paramMap.get('idTurma'));
    console.log('idMatricula', this.idMatricula);
  }

  ngOnInit() {
    // carrega combos
    this.routeActiveSrv.data.subscribe(data => {
      this.listaNacionalidades  = data.nacionalidades;
      this.listaOrgaosEmissores = data.OrgaoEmissores;
      this.listaTipoSexos       = data.tipoSexos;
      this.listaEstados         = data.estados;
      this.listaCidades         = data.cidades;
      this.listaUnidades        = data.unidades;
      this.listaPeriodosLetivos = data.peridoLetivos;
      this.listaSeries          = data.series;
      this.listaTurmas          = data.turmas;
      this.matricula            = data.matricula;
    });

    

    this.f = this.fbSrv.group({
      aluno: this.fbSrv.group({
        Basicos: this.fbSrv.group(
          (this.matricula.aluno && this.matricula.aluno.Basicos) ?
          {
          nome:                [this.matricula.aluno.Basicos.nome, [Validators.required]],
          idNacionalidade:     [this.matricula.aluno.Basicos.idNacionalidade, [Validators.required]],
          dataNascimento:      [this.matricula.aluno.Basicos.dataNascimento, [Validators.required]],
          sexo:                [this.matricula.aluno.Basicos.sexo, [Validators.required]],
          email:               [this.matricula.aluno.Basicos.email, [Validators.email]],
          telefonefixo:        [(this.matricula.aluno.Basicos.telefonefixo ? this.matricula.aluno.Basicos.telefonefixo
                                 .replace('+55', '').replace(/\D/g, '') : null)],
          telefonecelular:     [(this.matricula.aluno.Basicos.telefonecelular ? this.matricula.aluno.Basicos.telefonecelular
                                 .replace('+55', '').replace(/\D/g, '') : null)],
        } : {
          nome:                [null, [Validators.required]],
          idNacionalidade:     [null, [Validators.required]],
          dataNascimento:      [null, [Validators.required]],
          sexo:                [null, [Validators.required]],
          email:               [null, [Validators.email]],
          telefonefixo:        [null],
          telefonecelular:     [null],
        }),

        Documento: this.fbSrv.group(
          (this.matricula.aluno && this.matricula.aluno.Documento) ?
          {
            cpf:                [(this.matricula.aluno.Documento.cpf) ?
                                  this.matricula.aluno.Documento.cpf+''.replace(/\D/g, '') : null],
            rg:                 [(this.matricula.aluno.Documento.rg) ?
                                  this.matricula.aluno.Documento.rg+''.replace(/\D/g, '') : null ,
                                  [Validators.required, Validators.minLength(6)]],
            rgEmissor:          [this.matricula.aluno.Documento.rgEmissor, [Validators.required]],
          } : {
            cpf:                [null],
            rg:                 [null, [Validators.required, Validators.minLength(6)]],
            rgEmissor:          [null, [Validators.required]],

          }),

        Endereco: this.fbSrv.group(
          (this.matricula.aluno && this.matricula.aluno.Endereco) ?
          {
            cep:                [this.matricula.aluno.Endereco.cep.replace(/\D/g, ''), [Validators.required]],
            logradouro:         [this.matricula.aluno.Endereco.logradouro, [Validators.required]],
            numero:             [this.matricula.aluno.Endereco.numero, [Validators.required]],
            idUf:               [this.matricula.aluno.Endereco.idUf, [Validators.required]],
            bairro:             [this.matricula.aluno.Endereco.bairro, [Validators.required]],
            idCidade:           [this.matricula.aluno.Endereco.idCidade, [Validators.required]],
            complemento:        [this.matricula.aluno.Endereco.complemento],
          } : {
            cep:                [null, [Validators.required]],
            logradouro:         [null, [Validators.required]],
            numero:             [null, [Validators.required]],
            idUf:               [null, [Validators.required]],
            bairro:             [null, [Validators.required]],
            idCidade:           [null, [Validators.required]],
            complemento:        [null],
          }),
      }),

      matricula: this.fbSrv.group(
        (this.matricula.aluno && this.matricula.matricula) ? {
        escolaAnterior:        [null],
        idUnidade:             [this.matricula.matricula.idUnidade, [Validators.required]],
        idPeriodoLetivo:       [this.matricula.matricula.idPeriodoLetivo, [Validators.required]],
        idSerie:               [this.matricula.matricula.idSerie, [Validators.required]],
        idTurma:               [this.matricula.matricula.idTurma, [Validators.required]]
      } : {
        escolaAnterior:        [null],
        idUnidade:             [this.idUnidade],
        idCurso:               [this.idCurso, [Validators.required]],
        idPeriodoLetivo:       [this.idPeriodoLetivo, [Validators.required]],
        idSerie:               [this.idSerie, [Validators.required]],
        idTurma:               [this.idTurma, [Validators.required]]
      })
    });

    // zera scroll ao entrar na tela
    window.scrollTo(0, 0);
    // Busca Cep
    if (this.matricula && this.matricula.aluno && this.matricula.aluno.Endereco && this.matricula.aluno.Endereco.cep) {
      this.consultaCEP(this.matricula.aluno.Endereco.cep);
    }
  }

trataErro(err: HttpErrorResponse) {
  this.logSrv.log('dadosAluno', 'tratamento de erro BackEnd', this.f.value, err);
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
          this.logSrv.log('dadosAluno',
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

  consultaPessoaCPF(evento) {
    // (<HTMLInputElement>evento.target).value;
    const cpf = (<HTMLInputElement>evento.target).value;

    // Expressão regular para validar o CEP.
    const validaCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

    if (cpf != null && validaCpf.test(cpf) ) {
      this.spinnerCpf = true;
      this.pessoaSrv.getByParm(0, cpf.replace(/\./g, '').replace('-', '')).subscribe(dados => {
        this.populaDadosPessoaForm(this.f.controls.aluno, dados.dados);
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
    cep = cep.replace('-', '');
    if (cep != null && validacep.test(cep) ) {
      this.spinnerCep = true;
      this.enderecoSrv.getByCEP(cep).subscribe(dados => {
        this.populaDadosEderecoForm(dados.endereco);
        this.spinnerCep = false;
      });
    }
  }

  populaDadosEderecoForm(dados) {
    console.log(dados);
    if (dados.erro) {
      this.possuiCep = null;
    } else {
      this.f.patchValue({
        aluno: {
          Endereco: {
            logradouro: dados.logradouro,
            // cep: dados.cep,
            // complemento: dados.complemento,
            bairro: dados.bairro,
            idCidade: dados.idCidade,
            idUf: dados.idUf
          }
        }
      });
      this.possuiCep = true;
    }
  }

  onChangeCidade(idUf = null) {
    this.routeActiveSrv.data.subscribe(data => {
      this.listaCidades         = data.cidades.filter((item) => item.idUf.toString() === idUf );
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

  onSubmit() {
    if (this.f.valid && !this.formStatus) {
      const cep = this.f.get('aluno.Endereco.cep');
      cep.setValue(cep.value.replace('-', ''));
      // console.log('aa', cep.value);
      if (this.navega) {
        this.integra('prox');
      } else {
        this.formStatus = true;
        this.alunoSrv.save(this.f.value, this.idMatricula).subscribe(success => {
          console.log('success', success);
          const data = (this.idMatricula) ? this.idMatricula : success.matricula.idMatricula;
          this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
          this.navigateTo('/admin/matricula/filiacao', {idMatricula: data});
        }, (err) => {
          this.formStatus = false;
          this.trataErro(err);
          console.error(err);
        });
      }
  } else {
    console.log('err');
    window.scrollTo(0, 0);
    this.mostraErrosForm(this.f);
  }
}

  integra(status: string) {
    if (this.f.valid && !this.formStatus) {
      console.log('status', status);
      const cep = this.f.get('aluno.Endereco.cep');
      cep.setValue(cep.value.replace('-', ''));
      // console.log('aa', cep.value);
      this.alunoSrv.save(this.f.value, this.idMatricula).subscribe(success => {
        console.log('success', success);
        this.toastrSrv.success('', 'Dados atualizados com sucesso!', {timeOut: 600});
        console.log('teste');
        this.blockUI.start('Integrando com o Perseus...'); // Start blocking
        this.integraSrv.integraMatricula(this.idMatricula).subscribe(success => {
          console.log('success2', success);
            this.toastrSrv.success('', 'Dados integrados com sucesso!', {timeOut: 600});
            if (status === 'prox') {
              this.navigateTo('/admin/matricula/filiacao', {idMatricula: this.idMatricula});
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
      }
    );
    } else {
      console.log('Notvalid');
      window.scrollTo(0, 0);
      this.mostraErrosForm(this.f);
    }
  }
}
