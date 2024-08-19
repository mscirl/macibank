import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TipoConta } from '../enums/conta.enum';
import { Cliente } from './cliente.entity';
import { metodoDePagamento } from './metodos-de-pagamento.entity';

@Entity()
export class ContaBancaria {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    numeroConta: string;

    @Column('decimal')
    saldo: number;

    @Column({ type: 'enum', enum: TipoConta })
    tipo: TipoConta;

    @ManyToOne(() => Cliente, (cliente) => cliente.contas)
    cliente: Cliente;

    constructor(cliente: Cliente, numeroConta: string, saldo: number, tipo: TipoConta) {
        this.id = uuidv4();
        this.cliente = cliente;
        this.numeroConta = numeroConta;
        this.saldo = saldo;
        this.tipo = tipo;
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
        return this.numeroConta;
    }

    setTipo(novoTipo: TipoConta): void {
        this.tipo = novoTipo;
    }
}

export { TipoConta };
