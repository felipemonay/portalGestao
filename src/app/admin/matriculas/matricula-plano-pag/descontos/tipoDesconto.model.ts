export class TipoDescontoModel {
    idTipoDesconto: number;
    descricao: string;
    percentualPadrao: number;
    idcliente: number;
    parcelascarencia: number;
    descontoSomativo: number;
    sigla: string;
    ordem: number;
    descontoPlano: number;
    idTipoArrecadacao: number;

    constructor(
    ) {
        this.idTipoDesconto = 0;
        this.descricao = '';
        this.percentualPadrao = 0;
        this.idcliente = 0;
        this.parcelascarencia = 0;
        this.descontoSomativo = 0;
        this.sigla = '';
        this.ordem = 0;
        this.descontoPlano = 0;
        this.idTipoArrecadacao = 0;
    }
}

