import { v4 as uuidv4 } from 'uuid';
import { TipoConta } from '../enums/conta.enum';
import { Cliente } from '../models/cliente.model';
import { metodoDePagamento } from './pagamento.model';

export class ContaBancaria {
    id: string;
    cliente: Cliente;
    tipo: TipoConta;
    saldo: number;

    constructor(cliente: Cliente, tipo: TipoConta, saldoInicial: number) {
        this.id = uuidv4();
        this.cliente = cliente;
        this.tipo = tipo;
        this.saldo = saldoInicial;
    }

    getNumeroDaConta(): string {
        return this.id;
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
export { TipoConta };

