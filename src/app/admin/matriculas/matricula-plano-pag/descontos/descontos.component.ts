import { DescontosService } from './descontos.service';
import { Input, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, empty } from 'rxjs';
import { tap, catchError, switchMap, take } from 'rxjs/operators';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { DescontoModel } from './desconto.model';
import { TipoDescontoModel } from './tipoDesconto.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { DadosComponent } from '../../pesquisa-rematricula/consulta-matricula/dados/dados.component';

@Component({
  selector: 'desconto-modal',
  templateUrl: './descontos.component.html',
  styleUrls: ['./descontos.component.scss']
})
export class DescontoModal implements OnInit {
  @Input() idMatricula;

  novoDesconto: DescontoModel;
  tipoArrecadacao$: Observable<any>;
  tipoDescontos$: Observable<TipoDescontoModel[]>;
  descontos$: Observable<DescontoModel[]>;

  form: FormGroup;
  formArrayDescontos: FormArray;

  config = { 'progressBar': true, maxOpened: 5};

  constructor(
    public activeModal: NgbActiveModal,
    public descontosSrv: DescontosService,
    private formBuilderSrv: FormBuilder,
    private toastrSrv: ToastrService
  ) {
    this.novoDesconto = new DescontoModel();
    this.novoDesconto.idMatricula = this.idMatricula;
  }

  ngOnInit() {

    this.tipoArrecadacao$ = this.descontosSrv.getTipoArrecadacao().pipe(
      tap(console.log),
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        // alert('erro');
        return empty();
      })
    );


    this.tipoDescontos$ = this.descontosSrv.getTipoDescontos(this.idMatricula).pipe(
      tap(console.log),
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        // alert('erro');
        return empty();
      })
    );

    this.descontos$ =  this.descontosSrv.getDescontos(this.idMatricula).pipe(
        tap(console.log),
        catchError(error => {
          console.error(error);
          // this.error$.next(true);
          // alert('erro');
          return empty();
      })
    );

    this.form = this.formBuilderSrv.group({
      descontos: this.formBuilderSrv.array([])
    });

    this.formArrayDescontos = this.form.get('descontos') as FormArray;

    // assina observable cria itens de desconto
    this.descontos$.subscribe((ret) => {
      ret.forEach((item) => {
        this.formArrayDescontos.push(this.createItem(item));
      });
    });
  }



  createItem(desconto: DescontoModel): FormGroup {
    return this.formBuilderSrv.group(
      {
      // (this.validaEdicao(desconto.idTipoDesconto)) ? {
        idTipoDescontoMatricula:  [desconto.idTipoDescontoMatricula, [Validators.required]],
        percentual:               [desconto.percentual, [Validators.required]],
        observacao:               [desconto.observacao, [Validators.required]],
        data:                     [desconto.data, [Validators.required]],
        datainicio:               [desconto.datainicio, [Validators.required]],
        datafinal:                [desconto.datafinal, [Validators.required]],
        idTipoDesconto:           [desconto.idTipoDesconto, [Validators.required]],
        idMatricula:              [desconto.idMatricula, [Validators.required]],
        idTipoArrecadacao:        [desconto.idTipoArrecadacao, [Validators.required]],
        acao:                     [(desconto.acao !== '') ? desconto.acao : null]
      // } : {
      //   idTipoDescontoMatricula:  [desconto.idTipoDescontoMatricula, [Validators.required]],
      //   percentual:               [{value: desconto.percentual, disabled: false}, [Validators.required]],
      //   observacao:               [{value: desconto.observacao, disabled: false}, [Validators.required]],
      //   data:                     [{value: desconto.data, disabled: false}, [Validators.required]],
      //   datainicio:               [{value: desconto.datainicio, disabled: false}, [Validators.required]],
      //   datafinal:                [{value: desconto.datafinal, disabled: false}, [Validators.required]],
      //   idTipoDesconto:           [{value: desconto.idTipoDesconto, disabled: false}, [Validators.required]],
      //   nomeTipoDesconto:         [{value: desconto.nomeTipoDesconto, disabled: false}, [Validators.required]],
      //   idMatricula:              [{value: desconto.idMatricula, disabled: false}, [Validators.required]],
      //   idTipoArrecadacao:        [{value: desconto.idTipoArrecadacao, disabled: false}, [Validators.required]],
      //   nomeTipoArrecadacao:      [{value: desconto.nomeTipoArrecadacao, disabled: false}, [Validators.required]],
      //   acao:                     [null]
      }
    );
  }

  validaEdicao(idTipoDesconto: number): boolean {
    // this.listaTipoDesconto.forEach(item => {
    //   if (item.idTipoDesconto === idTipoDesconto) {
    //     return true;
    //   }
    // });
    return false;
  }

  selecionaTipoDesconto(idTipoDesconto: any) {
    console.log('idTipoDesconto', idTipoDesconto);
    this.novoDesconto = idTipoDesconto;
    console.log('teste', this.novoDesconto);
  }

  inserirNovoDesconto() {
    let error = false;

    console.log('idMatricula', this.idMatricula);

    if (this.novoDesconto.percentual <= 0) {
      this.toastrSrv.error('o desconto deve ser maior que 0%', '', this.config).onTap.pipe(take(1));
      error = true;
    }
    if (!this.novoDesconto.datainicio) {
      this.toastrSrv.error('a Data de inicio é obrigatória', '', this.config).onTap.pipe(take(1));
      error = true;
    }
    if (!this.novoDesconto.datafinal) {
      this.toastrSrv.error('a Data de final é obrigatória', '', this.config).onTap.pipe(take(1));
      error = true;
    }
    if (!this.novoDesconto.idTipoArrecadacao) {
      this.toastrSrv.error('o tipo de arrecadacao é obrigatório', '', this.config).onTap.pipe(take(1));
      error = true;
    }
    if (!this.novoDesconto.idTipoDesconto) {
      this.toastrSrv.error('o tipo de desconto é obrigatório', '', this.config).onTap.pipe(take(1));
      error = true;
    }
    if (this.novoDesconto.observacao.length <= 3) {
      this.toastrSrv.error('O motivo do desconto deve conter ao menos 3 caracteres', '', this.config).onTap.pipe(take(1));
      error = true;
    }


    if (!error) {
      // this.formArrayDescontos = this.form.get('descontos') as FormArray;
      this.novoDesconto.acao = '3-insert';
      this.novoDesconto.idMatricula = this.idMatricula;
      this.formArrayDescontos.push(this.createItem(this.novoDesconto));
      this.novoDesconto = new DescontoModel();
    }
  }

  removerDesconto(index) {
    console.log('teste');
    let acao = this.formArrayDescontos.controls[index].get('acao');
    acao.setValue('1-delete');
    console.log('index', index);
    console.log('acao', acao);
  }

  removerDescontoForm(index) {
    this.formArrayDescontos.removeAt(index);
  }


  aplicaDesconto() {
    let error = false;

    let dados = this.formArrayDescontos.value;
    dados = dados.filter((item) => (item.acao !== null));
    if (!dados.lenght && this.novoDesconto.percentual > 0) {
      this.toastrSrv.error('Inclua o desconto antes de aplicar', '', this.config).onTap.pipe(take(1));
      error = true;
    }

    dados = this.formArrayDescontos.value;

    dados.sort((a, b) => { let x = a['acao']; let y = b['acao']; return ((x < y) ? -1 : ((x > y) ? 1 : 0)); });

    console.log('processamento');
    this.formArrayDescontos.value.forEach((item, index) => {
      console.log('ação', item.acao);
      console.log('item', item);
      if (item.acao === '3-insert') {
        this.descontosSrv.save(item, item.idTipoDescontoMatricula).subscribe((ret) => {
          console.log(ret);
          item.idTipoDescontoMatricula = 1;
        }, (err) => {
          // console.log('deu ruim');
          error = true;
          console.log('error', err);
          this.trataErro(err);
        });
      }
      if (item.acao === '1-delete') {
        this.descontosSrv.remove(item.idTipoDescontoMatricula).subscribe((ret) => {
          this.removerDescontoForm(index);
        }, (err) => {
          error = true;
          console.log('error', err);
          this.trataErro(err);
        });
      }
    });

    if (!error) {
      this.activeModal.close();
    }
  }

  trataErro(err: HttpErrorResponse) {
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
}



