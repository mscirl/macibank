// adicionada uma class dto para que eu possa utilizar os dados da classe
// tanto no controller como no service, deixando ela centralizada aqui

export class PagamentoDto {
    numeroConta: string;
    valor: number;
    metodo: string;

    constructor(numeroConta: string, valor: number, metodo:string){
        this.numeroConta = numeroConta,
        this.valor = valor,
        this.metodo = metodo
}
}