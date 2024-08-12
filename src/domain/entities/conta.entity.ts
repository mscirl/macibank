import { v4 as uuidv4 } from 'uuid';
import { TipoConta } from '../enums/conta.enum';
import { contaBancariaInvalidaException } from '../exceptions/exceptions';
import { Cliente } from './cliente.entity';
import { metodoDePagamento } from './pagamento.entity';

export class ContaBancaria {
    id: string;
    numero: string;
    saldo: number;
    tipo: TipoConta;
    cliente: Cliente;

    constructor(cliente: Cliente, numero: string, saldo: number, tipo: TipoConta) {
        this.id = uuidv4();
        this.cliente = cliente;
        this.numero = numero;
        this.saldo = saldo;
        this.tipo = tipo;

        contaBancariaInvalidaException(numero);
    }

    pagar(valor: number, metodoDePagamento: metodoDePagamento): void {
        if (valor <= 0) {
            throw new Error('Ops! O valor do pagamento deve ser maior que zero.');
        }

        if (this.saldo < valor) {
            throw new Error('Ops! Saldo insuficiente para realizar o pagamento.');
        }
        this.saldo -= valor;

        metodoDePagamento.processaPagamento(valor);

        console.log(`Pagamento de R$${valor.toFixed(2)} realizado com sucesso. Novo saldo em conta: R$${this.saldo.toFixed(2)}.`);
    }


    getNumeroDaConta(): string {
        return this.numero;
    }

    setTipo(novoTipo: TipoConta): void {
        this.tipo = novoTipo;
    }
}

export { TipoConta };
