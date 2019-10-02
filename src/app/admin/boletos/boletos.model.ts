export interface Boletos {
    boletos: {
            vencimento: any;
            valor: number;
            status: string;
            transacao: number;
            origem: string;
            boletourl: any;
            aluno: [
                {
                    nome: string;
                }
            ];
            produto: [
                {
                    nome: string;
                }
            ]
        };
    }
