export interface FichaSaude {

    fichaSaude: {
        idps_saude: number;
        tipoSanguineo: any;
        possuiPlanoSaude: number;
        nomePlanoSaude: string;
        possuiNecessidadeEspecial: number;
        nomeNecessidadeEspecial: string;
        possuiAlergiaMedicamento: number;
        nomeAlergiaMedicamento: string;
        realizaTratamentoMedico: number;
        nomeTratamentoMedico: string;
        possuiMedicacaoRegular: number;
        nomeMedicacaoRegular: string;
        informacaoAdicional: string;
        idPessoa: number;
    }

}