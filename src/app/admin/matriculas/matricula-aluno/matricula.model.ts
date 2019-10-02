export interface Matricula {

    aluno: {
        Basicos: {
            idPessoa: number;
            idNacionalidade: number;
            nome: string;
            dataNascimento: any;
            sexo: string;
            idcliente: number;
            idPessoaPai: number;
            idPessoaMae: number;
            email: string;
            telefonefixo: string;
            telefonecelular: string
            };

        Endereco: {
            idEndereco: number;
            idCidade: number;
            idUf: number;
            cep: string;
            logradouro: string;
            numero: number;
            complemento: number;
            bairro: string;
            idPessoa: number
        };

        Documento: {
            idDocumento: number;
            rg: string;
            rgEmissor: string;
            cpf: string;
            idPessoa: number
        };
    };

    matricula: {
        idMatricula: number;
        idSituacao: number;
        idSerie: number;
        idTurma: number;
        dataMatricula: any;
        primeiraMatricula: number;
        dataSituacao: any;
        matriculaDependencia: number;
        numeroChamada: number;
        numeroDependencias: number;
        observacao: string;
        idCurso: number;
        confirmada: number;
        matcodigo: number;
        rematriculavel: number;
        idAluno: number;
        idPeriodoLetivo: number;
        idUnidade: number;
    };
}
