import { v4 as uuidv4 } from 'uuid';
import { Cliente } from '../models/cliente.model';
import { metodoDePagamento } from './pagamento.model';

export enum TipoConta {
    CORRENTE = 'CORRENTE',
    POUPANCA = 'POUPANCA',
}

export class ContaBancaria {
    private saldo: number;
    private numeroDaConta: string;
    private cliente: Cliente;
    private tipo: TipoConta;

    constructor(cliente: Cliente, tipo: TipoConta, saldoInicial: number) {
        this.saldo = saldoInicial;
        this.numeroDaConta = uuidv4();
        this.cliente = cliente;
        this.tipo = tipo;
    }

    depositar(valor: number): void {
        if (valor > 0) {
            this.saldo += valor;
        } else {
            throw new Error(`O valor a ser depositado deve ser maior que zero (${valor})`);
        }
    }

    sacar(valor: number): void {
        if (valor <= this.saldo) {
            this.saldo -= valor;
        } else {
            throw new Error(`Saldo insuficiente para saque (${this.saldo})`);
        }
    }

    transferir(destino: ContaBancaria, valor: number): void {
        if (valor <= this.saldo) {
            this.saldo -= valor;
            destino.depositar(valor);
        } else {
            throw new Error(`Transferência não concluída. Motivo: Saldo insuficiente (${this.saldo})`);
        }
    }

    verificarSaldo(): string {
        return `O seu saldo atual é de ${this.saldo}`;
    }

    getNumeroDaConta(): string {
        return this.numeroDaConta;
    }

    setTipo(novoTipo: TipoConta): void {
        this.tipo = novoTipo;
    }

    pagar(valor: number, metodo: metodoDePagamento){
        if (valor >= this.saldo){
            this.saldo -= valor;
            metodo.processaPagamento(valor);
        }else{
            throw new Error(`Seu saldo de ${this.saldo} é insuficiente para realizar o pagamento de ${valor}`)
        }
    }

}
