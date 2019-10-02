export interface FichaSaida {

    autorizacaoSaida: {
        idAutorizacaoSaida: number;
        pai: number;
        mae: number;
        responsavelFinanceiro: number;
        responsavelPedagogico: number;
        outros: number;
        idTipoAutorizacaoSaida: number;
    };

    autorizacaoRetirarAluno: {
        nome: string;
        cpf: number;
        parentesco: string;
        telefoneResidencial: number;
        telefoneCelular: number;
      };

    transporteEscolar: {
        idTransporteEscolar: number;
        usaTransporteEscolar: number;
        naoDefinido: number;
        nomeCondutor: string;
        telefoneCondutor: number;
        idAutorizacaoSaida: number;
    };

    valeTransporte: {
    idValeTransporte: number;
    sptrans: number;
    bom: number;
    naoSolicitado: number;
    idMatricula: number;
    };
}
