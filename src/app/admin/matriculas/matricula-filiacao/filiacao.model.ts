export interface Filiacao {

    pessoa: {
        mae: {
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
                cep: string;
                tipoLogradouro: string;
                logradouro: string;
                numero: number;
                complemento: number;
                bairro: string;
                idPessoa: number;
                idUf: number;
            };

            Documento: {
                idDocumento: number;
                rg: string;
                rgEmissor: string;
                cpf: string;
                idPessoa: number
            };

            Responsavel: {
                idresponsavel: number;
                idPessoa: number;
                idMatricula: number;
                financeiro: number;
                pedagogico: number
            };
        };

        pai: {
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
                idCidade: number;
                cep: string;
                logradouro: string;
                numero: number;
                complemento: string;
                bairro: string;
                idPessoa: number;
                idUf: number;
            };

            Documento: {
                idDocumento: number;
                rg: string;
                rgEmissor: string;
                cpf: string;
                idPessoa: number
            };

            Responsavel: {
                idresponsavel: number;
                idPessoa: number;
                idMatricula: number;
                financeiro: number;
                pedagogico: number
            };
        };
    };
}
