export interface PlanoPagEscolhido {
    idprecificacao: number;
    idSerie: number;
    dataInicio: any;
    dataFinal: any;
    ativo: number;
    descricao: string;
    planosPagamento: {
        idPlanoPagamento: number;
        diaVencimento1: number;
        valorParcela: number;
        numeroParcelas: number;
        descontoPlano: number;
        idTipoArrecadacao: number;
        tipoArrecadacao: string;
        idprecificacao: number;
        idTipoDesconto: number;
        idSerie: number;
        dataInicio: any;
        dataFinal: any;
        valorParcelaDesconto: number;
        valorTotalDesconto: number;
        valorTotal: number;
    };
}
