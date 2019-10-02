export class DescontoModel {
    idTipoDescontoMatricula: number;
    percentual: number;
    observacao: string;
    data: any;
    datainicio: any;
    datafinal: any;
    idTipoDesconto: number;
    idMatricula: number;
    idTipoArrecadacao: number;
    descricao: string;
    acao: string;

    constructor(
    ) {
        this.percentual = 0;
        this.observacao = '';
        this.data = new Date();
        this.datainicio = '';
        this.datafinal = '';
        this.idTipoDesconto = 0;
        this.idMatricula = 0;
        this.idTipoArrecadacao = 0;
        this.descricao = '';
        this.acao = '3-insert';
    }
}
