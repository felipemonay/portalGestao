import { Component, OnInit, Input } from '@angular/core';
import { IntegracaoService } from 'src/app/shared/services/integracao.service';
import { ToastrService } from 'ngx-toastr';
// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'erros-integracao',
  templateUrl: './erros-integracao.component.html',
  styleUrls: ['./erros-integracao.component.scss',
  '../pesquisa-rematricula.component.scss']
})
export class ErrosIntegracaoComponent implements OnInit {
  @Input() aluno: any;
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private integraSrv: IntegracaoService,
    private toastrSrv: ToastrService,
    // private blockUI: NgBlockUI,
  ) { }

  ngOnInit() {
  }

  integraMatricula(id: number) {
    this.blockUI.start('Integrando com o Perseus...'); // Start blocking
    this.integraSrv.integraMatricula(id).subscribe(success => {
      console.log('success2', success);
        this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
    }, (err) => {
      this.toastrSrv.error('', 'Não foi possivel completar a integraçao, favor valide se os dados estão corretos.', {timeOut: 600});
    });
  }

  integraFiliacao(id: number) {
    this.blockUI.start('Integrando com o Perseus...'); // Start blocking
    this.integraSrv.integraFiliacao(id).subscribe(success => {
      console.log('success2', success);
        // this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
    }, (err) => {
      this.toastrSrv.error('', 'Não foi possivel completar a integraçao, favor valide se os dados estão corretos.', {timeOut: 600});
    });
  }

  integraResponsavel(id: number, resp: string) {
    this.integraSrv.integraResponsavel(id, resp).subscribe(success => {
      console.log('success2', success);
        this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
    }, (err) => {
      this.toastrSrv.error('', 'Não foi possivel completar a integraçao, favor valide se os dados estão corretos.', {timeOut: 600});
    });
  }

  integraMensalidade(id: number) {
    this.blockUI.start('Integrando com o Perseus...'); // Start blocking
    this.integraSrv.integraMensalidade(id).subscribe(success => {
      console.log('success2', success);
        this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
    }, (err) => {
      this.toastrSrv.error('', 'Não foi possivel completar a integraçao, favor valide se os dados estão corretos.', {timeOut: 600});
    });
  }
}
