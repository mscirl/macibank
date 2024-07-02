import { v4 as uuidv4 } from 'uuid';
import { Cliente } from '../cliente/cliente.model';

export class ContaBancaria {
    private saldo: number;
    private numeroDaConta: string;
    private cliente: Cliente;

    constructor(cliente: Cliente, saldoInicial: number) {
        this.saldo = saldoInicial;
        this.numeroDaConta = uuidv4();
        this.cliente = cliente;
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
}
