import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskModule} from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';

import { MatriculaComponent } from './matricula.component';
import { MatriculaRoutingModule } from './matricula-routing.module';
import { AlunoComponent } from './matricula-aluno/aluno.component';
import { FiliacaoComponent } from './matricula-filiacao/filiacao.component';
import { RespFinComponent } from './matricula-resp-fin/resp-fin.component';
import { RespPedComponent } from './matricula-resp-ped/resp-ped.component';
import { FichaSaudeComponent } from './matricula-ficha-saude/ficha-saude.component';
import { EtapaComponent } from './matricula-etapa/etapa.component';
import { DocumentosComponent } from './matricula-documento/documentos.component';
import { ContratoComponent } from './matricula-contrato/contrato.component';
import { FichaSaidaComponent } from './matricula-ficha-saida/ficha-saida.component';
import { PlanoPagComponent } from './matricula-plano-pag/plano-pag.component';
import { PesquisaRematriculaComponent } from './pesquisa-rematricula/pesquisa-rematricula.component';
import { NovaMatriculaComponent } from './pesquisa-rematricula/nova-matricula/nova-matricula.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { DescontoModal } from './matricula-plano-pag/descontos/descontos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmaRespModalComponent } from './matricula-filiacao/confirma-resp-modal/confirma-resp-modal.component';
import { ConsultaMatriculaComponent } from './pesquisa-rematricula/consulta-matricula/consulta-matricula.component';
import { ErrosIntegracaoComponent } from './pesquisa-rematricula/erros-integracao/erros-integracao.component';
import { RematriculaComponent } from './pesquisa-rematricula/rematricula/rematricula.component';
import { MatriculasPendentesComponent } from './pesquisa-rematricula/matriculas-pendentes/matriculas-pendentes.component';
import { DadosComponent } from './pesquisa-rematricula/consulta-matricula/dados/dados.component';
import { BoletosComponent } from './pesquisa-rematricula/consulta-matricula/boletos/boletos.component';
import { ModalConfirmaCpfComponent } from './modal/confirmaCpf/modal-confirma-cpf.component';


@NgModule({
    imports: [
        NgxMaskModule.forRoot(),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        MatriculaRoutingModule,
        SharedModule,
        DataTablesModule,
        NgbModule
    ],
    declarations: [
        MatriculaComponent,
        AlunoComponent,
        FichaSaidaComponent,
        ContratoComponent,
        DocumentosComponent,
        EtapaComponent,
        FichaSaudeComponent,
        FiliacaoComponent,
        PlanoPagComponent,
        RespFinComponent,
        RespPedComponent,
        PesquisaRematriculaComponent,
        NovaMatriculaComponent,
        DescontoModal,
        ConfirmaRespModalComponent,
        ModalConfirmaCpfComponent,
        ConsultaMatriculaComponent,
        ErrosIntegracaoComponent,
        RematriculaComponent,
        MatriculasPendentesComponent,
        DadosComponent,
        BoletosComponent
    ],
    exports: [MatriculaComponent],
    entryComponents: [DescontoModal, ConfirmaRespModalComponent, DadosComponent, BoletosComponent, ModalConfirmaCpfComponent]
})

export class MatriculaModule {}
