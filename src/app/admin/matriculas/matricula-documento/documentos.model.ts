export interface Documentos {

    docResponsavel: [{
            iddocumentosrequeridos: number;
            descricao: string;
            idcliente: number;
            documentoresponsavel: null;
            validade: any;
            status: number;

            documentoEntregue: {
                iddocumentoEntregue: number;
                idMatricula: number;
                iddocumentosrequeridos: number;
                urldocumento: any;
                idPessoa: number;
                dataentrega: any;
                validadedocumento: any;
            }
        }];

    docAluno: [{
        iddocumentosrequeridos: number;
        descricao: string;
        idcliente: number;
        documentoresponsavel: null;
        validade: any;
        status: number;

        documentoEntregue: {
            iddocumentoEntregue: number;
            idMatricula: number;
            iddocumentosrequeridos: number;
            urldocumento: any;
            idPessoa: number;
            dataentrega: any;
            validadedocumento: any;
        }
    }];
}
