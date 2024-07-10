
export class Transacao {
    tipo: string;
    data: Date;
    valor: number;

    constructor(tipo: string, data: Date, valor: number){
        this.tipo = tipo;
        this.data = data;
        this.valor = valor;

    }
}