import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TipoConta } from '../enums/conta.enum';
import { gerarNumeroConta } from '../utilities/utility';
import { Cliente } from './cliente.entity';
import { ContaBancaria } from './conta.entity';


@Entity()
export class Gerente {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    nomeCompleto: string;

    @OneToMany(() => Cliente, (cliente) => cliente.gerente, { cascade: true })
    clientes!: Cliente[];

    @Column({ unique: true })
    codigoPessoa: number;

    constructor(nomeCompleto: string, codigoPessoa: number) {
        this.nomeCompleto = nomeCompleto;
        this.codigoPessoa = codigoPessoa;
    }

    adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    removerCliente(codigoPessoa: number): void {
        this.clientes = this.clientes.filter(cliente => cliente.codigoPessoa !== codigoPessoa);
    }

    abrirConta(cliente: Cliente, tipo: TipoConta, saldoInicial: number): ContaBancaria {
        const numeroConta = gerarNumeroConta();
        const novaConta = new ContaBancaria(cliente, numeroConta, saldoInicial, tipo);
        cliente.contas.push(novaConta);
        return novaConta;
    }

    fecharConta(cliente: Cliente, contaNumero: string): void {
        cliente.contas = cliente.contas.filter(conta => conta.numeroConta !== contaNumero);
    }

    modificarTipoConta(cliente: Cliente, contaNumero: string, novoTipo: TipoConta): void {
        const conta = cliente.contas.find(conta => conta.numeroConta === contaNumero);
        if (conta) {
            conta.setTipo(novoTipo);
        }
    }
}

