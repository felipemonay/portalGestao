export interface ResponsavelPedagogico {

    pessoa: {
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
            cep: number;
            logradouro: string;
            numero: number;
            complemento: string;
            bairro: string;
            idPessoa: number;
            idUf: number;
        };

        Documento: {
            idDocumento: number;
            rg: number;
            rgEmissor: string;
            cpf: number;
            idPessoa: number
        };
    };
}
