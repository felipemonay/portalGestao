import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';

import { EnderecoService } from 'src/app/shared/services/endereco.service';
import { PessoaService } from 'src/app/shared/services/pessoa.service';
import { DropdownService } from './../../../shared/services/dropdown.service';
import { FiliacaoService } from './filiacao.service';
import { Filiacao } from './filiacao.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmaRespModalComponent } from './confirma-resp-modal/confirma-resp-modal.component';
import { LogService } from 'src/app/shared/services/log.service';
import { IntegracaoService } from 'src/app/shared/services/integracao.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-filiacao',
  templateUrl: './filiacao.component.html',
  styleUrls: ['./filiacao.component.scss',
              '../matricula.component.scss']
})
export class FiliacaoComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  f: FormGroup;
  formStatus = false;
  statusPai = true;
  possuiRespPed = false;
  spinnerCpfMae = false;
  spinnerCepMae = false;
  spinnerCpfPai = false;
  spinnerCepPai = false;
  maeRespFin: boolean;
  paiRespFin: boolean;
  possuiCepMae = true;
  possuiCepPai = true;

  idMatricula: number;
  listaTipoSexos: any[];
  listaNacionalidades: any[];
  listaOrgaosEmissores: any[];
  listaCidades: any[];
  listaEstados: any[];
  filiacao: Filiacao;
  dados = {
    Basicos: {
      nome: [Validators.required],
      idNacionalidade: [Validators.required],
      dataNascimento: [Validators.required],
      sexo: [Validators.required],
      email: [Validators.email],
      telefonefixo: [],
      telefonecelular: [Validators.required],
    },
    Documento: {
      cpf: [Validators.required],
      rgEmissor: [Validators.required, Validators.maxLength(3)],
      rg: [Validators.required, Validators.minLength(6)]
    },
    Endereco: {
      cep: [Validators.required],
      logradouro: [Validators.required],
      numero: [Validators.required],
      complemento: [],
      bairro: [Validators.required],
      idUf: [Validators.required],
      idCidade: [Validators.required]
    },
    Responsavel: {
      financeiro: [Validators.required],
      pedagogico: [Validators.required]
    }
  };
  confirmaResp: true;
  navega: boolean;

  constructor(
    private fbSrv: FormBuilder,
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private locationSrv: Location,
    private filiacaoSrv: FiliacaoService,
    private pessoaSrv: PessoaService,
    private enderecoSrv: EnderecoService,
    private dropdownSrv: DropdownService,
    private toastrSrv: ToastrService,
    private modalService: NgbModal,
    private logSrv: LogService,
    private integraSrv: IntegracaoService,    
  ) {

    this.idMatricula = Number(this.routeActiveSrv.snapshot.paramMap.get('idMatricula'));
    this.navega = Boolean(this.routeActiveSrv.snapshot.paramMap.get('navega'));
    // console.log(this.idMatricula);
   }

   ngOnInit() {
     // carrega combos
    this.routeActiveSrv.data.subscribe(data => {
      this.listaNacionalidades  = data.nacionalidades;
      this.listaOrgaosEmissores = data.OrgaoEmissores;
      this.listaTipoSexos       = data.tipoSexos;
      this.listaEstados         = data.estados;
      this.listaCidades         = data.cidades;
      this.filiacao             = data.filiacao;
    });

    window.scrollTo(0, 0);

      this.f = this.fbSrv.group({
        mae: this.fbSrv.group({
          Basicos: this.fbSrv.group(
            (this.filiacao.pessoa && this.filiacao.pessoa.mae && this.filiacao.pessoa.mae.Basicos) ?
            {
            idPessoa:            [this.filiacao.pessoa.mae.Basicos.idPessoa],
            nome:                [this.filiacao.pessoa.mae.Basicos.nome, [Validators.required]],
            idNacionalidade:     [this.filiacao.pessoa.mae.Basicos.idNacionalidade, [Validators.required]],
            dataNascimento:      [this.filiacao.pessoa.mae.Basicos.dataNascimento, [Validators.required]],
            sexo:                [this.filiacao.pessoa.mae.Basicos.sexo, [Validators.required]],
            email:               [this.filiacao.pessoa.mae.Basicos.email, [Validators.required, Validators.email]],
            telefonefixo:        [(this.filiacao.pessoa.mae.Basicos.telefonefixo ? this.filiacao.pessoa.mae.Basicos.telefonefixo
                                     .replace('+55', '').replace(/\D/g, '') : null)],
            telefonecelular:     [(this.filiacao.pessoa.mae.Basicos.telefonecelular ? this.filiacao.pessoa.mae.Basicos.telefonecelular
                                     .replace('+55', '').replace(/\D/g, '') : null), [Validators.required]],
          } : {
            idPessoa:            [null],
            nome:                [null, [Validators.required]],
            idNacionalidade:     [null, [Validators.required]],
            dataNascimento:      [null, [Validators.required]],
            sexo:                [null, [Validators.required]],
            email:               [null, [Validators.required, Validators.email]],
            telefonefixo:        [null],
            telefonecelular:     [null, [Validators.required]]
          }),

          Documento: this.fbSrv.group(
            (this.filiacao.pessoa && this.filiacao.pessoa.mae && this.filiacao.pessoa.mae.Documento) ?
            {
              cpf:                [this.filiacao.pessoa.mae.Documento.cpf + ''.replace(/\D/g, ''), [Validators.required]],
              rgEmissor:          [this.filiacao.pessoa.mae.Documento.rgEmissor, [Validators.required, Validators.maxLength(3)]],
              rg:                 [this.filiacao.pessoa.mae.Documento.rg + ''.replace(/\D/g, ''),
                                  [Validators.required, Validators.minLength(6)]]
            } : {
              cpf:                [null, [Validators.required]],
              rgEmissor:          [null, [Validators.required, Validators.maxLength(3)]],
              rg:                 [null, [Validators.required, Validators.minLength(6)]]
            }),

          Endereco: this.fbSrv.group(
            (this.filiacao.pessoa && this.filiacao.pessoa.mae && this.filiacao.pessoa.mae.Endereco) ?
            {
              cep:                 [this.filiacao.pessoa.mae.Endereco.cep.replace(/\D/g, ''), [Validators.required]],
              logradouro:          [this.filiacao.pessoa.mae.Endereco.logradouro, [Validators.required]],
              numero:              [this.filiacao.pessoa.mae.Endereco.numero, [Validators.required]],
              complemento:         [this.filiacao.pessoa.mae.Endereco.complemento],
              bairro:              [this.filiacao.pessoa.mae.Endereco.bairro, [Validators.required]],
              idUf:                [this.filiacao.pessoa.mae.Endereco.idUf, [Validators.required]],
              idCidade:            [this.filiacao.pessoa.mae.Endereco.idCidade, [Validators.required]]
            } : {
              cep:                 [null, [Validators.required]],
              logradouro:          [null, [Validators.required]],
              numero:              [null, [Validators.required]],
              complemento:         [null],
              bairro:              [null, [Validators.required]],
              idUf:                [null, [Validators.required]],
              idCidade:            [null, [Validators.required]]
            }
          ),
          Responsavel: this.fbSrv.group(
            (this.filiacao.pessoa && this.filiacao.pessoa.mae && this.filiacao.pessoa.mae.Responsavel) ?
            {
              financeiro:          [(this.filiacao.pessoa.mae.Responsavel.financeiro) ? 1 : 0, [Validators.required]],
              pedagogico:          [(this.filiacao.pessoa.mae.Responsavel.pedagogico) ? 1 : 0, [Validators.required]]
            } : {
              financeiro:          [0, [Validators.required]],
              pedagogico:          [0, [Validators.required]]
            }
          ),
        }),

        pai: this.fbSrv.group({
          Basicos: this.fbSrv.group(
            (this.filiacao.pessoa && this.filiacao.pessoa.pai && this.filiacao.pessoa.pai.Basicos ) ?
            {
              idPessoa:            [this.filiacao.pessoa.pai.Basicos.idPessoa],
              nome:                [this.filiacao.pessoa.pai.Basicos.nome, [Validators.required]],
              idNacionalidade:     [this.filiacao.pessoa.pai.Basicos.idNacionalidade, [Validators.required]],
              dataNascimento:      [this.filiacao.pessoa.pai.Basicos.dataNascimento, [Validators.required]],
              sexo:                [this.filiacao.pessoa.pai.Basicos.sexo, [Validators.required]],
              email:               [this.filiacao.pessoa.pai.Basicos.email, [Validators.required, Validators.email]],
              telefonefixo:        [(this.filiacao.pessoa.pai.Basicos.telefonefixo ? this.filiacao.pessoa.pai.Basicos.telefonefixo
                                       .replace('+55', '').replace(/\D/g, '') : null)],
              telefonecelular:     [(this.filiacao.pessoa.pai.Basicos.telefonecelular ? this.filiacao.pessoa.pai.Basicos.telefonecelular
                                       .replace('+55', '').replace(/\D/g, '') : null), [Validators.required]],
            } : {
              idPessoa:            [null],
              nome:                [null, [Validators.required]],
              idNacionalidade:     [null, [Validators.required]],
              dataNascimento:      [null, [Validators.required]],
              sexo:                [null, [Validators.required]],
              email:               [null, [Validators.required, Validators.email]],
              telefonefixo:        [null],
              telefonecelular:     [null, [Validators.required]]
            }
          ),

          Documento: this.fbSrv.group(
            (this.filiacao.pessoa && this.filiacao.pessoa.pai &&  this.filiacao.pessoa.pai.Documento ) ?
            {
              cpf:                 [this.filiacao.pessoa.pai.Documento.cpf + ''.replace(/\D/g, ''),
                                     [Validators.required]],
              rgEmissor:           [this.filiacao.pessoa.pai.Documento.rgEmissor, [Validators.required, Validators.maxLength(3)]],
              rg:                  [this.filiacao.pessoa.pai.Documento.rg + ''.replace(/\D/g, ''),
                                    [Validators.required, Validators.minLength(6)]]
            } : {
              cpf:                 [null, [Validators.required]],
              rgEmissor:           [null, [Validators.required, Validators.maxLength(3)]],
              rg:                  [null, [Validators.required, Validators.minLength(6)]]
            }
          ),

          Endereco: this.fbSrv.group(
            (this.filiacao.pessoa && this.filiacao.pessoa.pai && this.filiacao.pessoa.pai.Endereco) ?
            {
              cep:                 [this.filiacao.pessoa.pai.Endereco.cep.replace(/\D/g, ''), [Validators.required]],
              logradouro:          [this.filiacao.pessoa.pai.Endereco.logradouro, [Validators.required]],
              numero:              [this.filiacao.pessoa.pai.Endereco.numero, [Validators.required]],
              complemento:         [this.filiacao.pessoa.pai.Endereco.complemento],
              bairro:              [this.filiacao.pessoa.pai.Endereco.bairro, [Validators.required]],
              idUf:                [this.filiacao.pessoa.pai.Endereco.idUf, [Validators.required]],
              idCidade:            [this.filiacao.pessoa.pai.Endereco.idCidade, [Validators.required]]
            } : {
              cep:                 [null, [Validators.required]],
              logradouro:          [null, [Validators.required]],
              numero:              [null, [Validators.required]],
              complemento:         [null],
              bairro:              [null, [Validators.required]],
              idUf:                [null, [Validators.required]],
              idCidade:            [null, [Validators.required]]
            }
          ),

          Responsavel: this.fbSrv.group(
            (this.filiacao.pessoa && this.filiacao.pessoa.pai && this.filiacao.pessoa.pai.Responsavel) ?
            {
              financeiro:          [(this.filiacao.pessoa.pai.Responsavel.financeiro) ? 1 : 0, [Validators.required]],
              pedagogico:          [(this.filiacao.pessoa.pai.Responsavel.pedagogico) ? 1 : 0, [Validators.required]]
            } : {
              financeiro:          [0, [Validators.required]],
              pedagogico:          [0, [Validators.required]]
            }
          )
        })
      });

      this.maeRespFin = (this.f.controls.mae.get('Responsavel.financeiro').value === 1 ) ? true : null;
      this.paiRespFin = (this.f.controls.pai.get('Responsavel.financeiro').value === 1 ) ? true : null;

      if (this.filiacao.pessoa) {
        if (this.filiacao.pessoa.pai) {
          this.statusPai = true;
        } else {
          this.setValidatorNullPai(this.f.controls.pai, this.dados);
          this.statusPai = false;
        }
      } else {
        this.statusPai = true;
      }

      if (this.filiacao.pessoa && this.filiacao.pessoa.mae && this.filiacao.pessoa.mae.Endereco) {
        this.consultaCEPMae(this.filiacao.pessoa.mae.Endereco.cep);
      }
      if (this.filiacao.pessoa && this.filiacao.pessoa.pai && this.filiacao.pessoa.pai.Endereco) {
        this.consultaCEPPai(this.filiacao.pessoa.pai.Endereco.cep);
      }
  }

  validaResp() {
    const data = this.f.value;
    const respFin = (data.mae.Responsavel.financeiro || ( data.pai && data.pai.Responsavel.financeiro)) ? true : false;
    const respPed = (data.mae.Responsavel.pedagogico || ( data.pai && data.pai.Responsavel.pedagogico)) ? true : false;
    if (!respFin && !respPed) {
      this.open();
      this.formStatus = false;
    } else {
      this.onSubmit();
    }
  }
  onSubmit() {

    if (this.f.valid && !this.formStatus) {
      const data = this.f.value;
      // console.log('dado', data);

      const respFin = (data.mae.Responsavel.financeiro || ( data.pai && data.pai.Responsavel.financeiro)) ? true : false;
      const respPed = (data.mae.Responsavel.pedagogico || ( data.pai && data.pai.Responsavel.pedagogico)) ? true : false;

      if (this.statusPai === false) {
        delete data['pai'];
      }

      if (this.navega) {
        this.integra('prox');
      } else {
        this.formStatus = true;
        this.filiacaoSrv.save(data, this.idMatricula).subscribe(success => {
          this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
            // if (respFin) {
            //   if (respPed) {
            //     this.navigateTo('/admin/matricula/fichaSaude', {idMatricula: this.idMatricula});
            //   } else {
            //     this.navigateTo('/admin/matricula/responsavelPedagogico', {idMatricula: this.idMatricula});
            //   }
            // } else {
              this.navigateTo('/admin/matricula/responsavelFinanceiro', {idMatricula: this.idMatricula, possuiRespPed: true});
            // }
          }, (err) => {
            this.formStatus = false;
            this.trataErro(err);
            console.error(err);
          }
        );
      }
    } else {
      window.scrollTo(0, 0);
      this.mostraErrosForm(this.f);
    }
  }

  integra(status: string) {
    if (this.f.valid && !this.formStatus) {
      this.formStatus = true;
      const data = this.f.value;
      // console.log('dado', data);
      const respFin = (data.mae.Responsavel.financeiro || ( data.pai && data.pai.Responsavel.financeiro)) ? true : false;
      const respPed = (data.mae.Responsavel.pedagogico || ( data.pai && data.pai.Responsavel.pedagogico)) ? true : false;
      if (this.statusPai === false) {
        delete data['pai'];
      }

      this.filiacaoSrv.save(data, this.idMatricula).subscribe(success => {
        this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
        this.blockUI.start('Integrando com o Perseus...'); // Start blocking
        this.integraSrv.integraFiliacao(this.idMatricula).subscribe(success => {
          console.log('success2', success);
            this.toastrSrv.success('', 'Dados integrados com sucesso!', {timeOut: 600});
            if (status === 'prox') {
              this.navigateTo('/admin/matricula/responsavelFinanceiro', {idMatricula: this.idMatricula, possuiRespPed: true});
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
      window.scrollTo(0, 0);
      this.mostraErrosForm(this.f);
    }
  }

  trataErro(err: HttpErrorResponse) {
    this.logSrv.log('filiacao', 'tratamento de erro BackEnd', this.f.value, err);
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
          this.logSrv.log('filiacao',
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

  hide(event): void {
    this.statusPai = (this.statusPai === true) ? false : true;
    if ((<HTMLInputElement>event.target).checked) {
      this.setValidatorNullPai(this.f.controls.pai, this.dados);
    } else {
      this.setValidatorRequiredPai(this.f.controls.pai, this.dados);
    }
  }

  changeRespFinanceiro(event, tipo): void {
    // console.log('event', (<HTMLInputElement>event.target).value);
    if (tipo === 'pai') {
      this.f.get('mae.Responsavel.financeiro').patchValue(0);
    } else if (tipo === 'mae') {
      this.f.get('pai.Responsavel.financeiro').patchValue(0);
    }
    if (!this.statusPai) {
      this.f.get('pai.Responsavel.financeiro').patchValue(0);
    }
  }

  changeRespPedagogico(event, tipo): void {
    // console.log('event', (<HTMLInputElement>event.target).value);
    if (tipo === 'pai') {
      this.f.get('mae.Responsavel.pedagogico').patchValue(0);
    } else if (tipo === 'mae') {
      this.f.get('pai.Responsavel.pedagogico').patchValue(0);
    }
    if (!this.statusPai) {
      this.f.get('pai.Responsavel.pedagogico').patchValue(0);
    }
  }

  public setValidatorNullPai(formGroup, data) {
    Object.keys(formGroup.controls).forEach(campo => {
        const control = formGroup.get(campo);
        if (control instanceof FormControl) {
            control.clearValidators();
            control.updateValueAndValidity();
        } else if (control instanceof FormGroup) {
            this.setValidatorNullPai(control, data[campo]);
        }
    });
  }

  public setValidatorRequiredPai(formGroup, data) {
    Object.keys(formGroup.controls).forEach(campo => {
        const control = formGroup.get(campo);
        if (control instanceof FormControl) {
            control.setValidators(data[campo]);
            control.updateValueAndValidity();
        } else if (control instanceof FormGroup) {
            this.setValidatorRequiredPai(control, data[campo]);
        }
    });
  }

  public setNullPai(formGroup, data) {
    Object.keys(formGroup.controls).forEach(campo => {
        const control = formGroup.get(campo);
        if (control instanceof FormControl) {
            control.patchValue(null);
        } else if (control instanceof FormGroup) {
            this.setNullPai(control, data[campo]);
        }
    });
  }

  consultaPessoaMaeCPF(evento) {
    // (<HTMLInputElement>evento.target).value;
    const cpf = (<HTMLInputElement>evento.target).value;

    // Expressão regular para validar o CEP.
    const validaCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

    if (cpf != null && validaCpf.test(cpf) ) {
      this.spinnerCpfMae = true;
      this.pessoaSrv.getByParm(0, cpf.replace(/\D/g, '')).subscribe(dados => {
        this.populaDadosPessoaForm(this.f.controls.mae, dados.dados);
      });
      this.spinnerCpfMae = false;
    }
  }

  consultaPessoaPaiCPF(evento) {
    // (<HTMLInputElement>evento.target).value;
    const cpf = (<HTMLInputElement>evento.target).value;

    // Expressão regular para validar o CEP.
    const validaCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

    if (cpf != null && validaCpf.test(cpf) ) {
      this.spinnerCpfPai = true;
      this.pessoaSrv.getByParm(0, cpf.replace(/\D/g, '')).subscribe(dados => {
        this.populaDadosPessoaForm(this.f.controls.pai, dados.dados);
      });
      this.spinnerCpfPai = false;
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

  consultaCEPMae(cep) {
    // Expressão regular para validar o CEP.'
    const validacep = /^[0-9]{5}[0-9]{3}$/;
    cep = cep.replace(/\D/g, '');

    if (cep != null && validacep.test(cep) ) {
      this.spinnerCepMae = true;
      this.enderecoSrv.getByCEP(cep.replace(/\D/g, '')).subscribe(dados => {
        this.populaDadosEderecoMaeForm(dados.endereco);
        this.spinnerCepMae = false;
      });
    }
  }

  populaDadosEderecoMaeForm(dados) {
    if (dados.erro) {
      this.possuiCepMae = null;
    } else {
      this.possuiCepMae = true;
      this.f.patchValue({
        mae: {
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
    }
  }

  consultaCEPPai(cep) {
    // Expressão regular para validar o CEP.
    const validacep = /^[0-9]{5}[0-9]{3}$/;
    cep = cep.replace(/\D/g, '');

    if (cep != null && validacep.test(cep) ) {
      this.spinnerCepPai = true;
      this.enderecoSrv.getByCEP(cep.replace(/\D/g, '')).subscribe(dados => {
        this.populaDadosEderecoPaiForm(dados.endereco);
        this.spinnerCepPai = false;
      });
    }
  }

  populaDadosEderecoPaiForm(dados) {
    if (dados.erro) {
      this.possuiCepPai = null;
    } else {
      this.possuiCepPai = true;
      this.f.patchValue({
        pai: {
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

  open() {
    const modalRef = this.modalService.open(ConfirmaRespModalComponent, {centered: true});
    modalRef.result.then((result) => {
      if (result) {
        this.onSubmit();
      } else {
        window.scrollTo(0, 0);
      }
      });
  }
}
