export interface metodoDePagamento{
    processaPagamento(valor: number):void;
}

export class PagamentoPix implements metodoDePagamento {
    processaPagamento(valor: number): void {
        console.log(`Pagamento por pix realizado com sucesso!`)
    }
}

export class PagamentoBoleto implements metodoDePagamento {
    processaPagamento(valor: number): void {
        console.log(`Pagamento por boleto realizado com sucesso! Obs: A compensação é feita em horário bancário.`)
    }
}