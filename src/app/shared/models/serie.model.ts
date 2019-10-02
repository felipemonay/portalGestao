export interface Serie {

    idSerie: number;
    idTurno: number;
    idCurso: number;
    idPeriodoLetivo: number;
    descricao: string;
    serie: string;
    vagas: number;
    idadeMinima: number;
    idadeMaxima: number;
    ativa: boolean;
    datainicio: any;
    datafinal: any;
    idcriterioavaliacao: string;
    descricaoTurno: string;
    descricaoCurso: string;
    descricaoPeriodoLetivo: string;
    descricaoCriterioAvaliacao: string;
}
