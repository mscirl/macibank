import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TipoConta } from '../enums/conta.enum';
import { nomeInvalidoException } from '../utilities/exceptions';
import { gerarCodigoSequencial, gerarNumeroConta } from '../utilities/utility';
import { Cliente } from './cliente.entity';
import { ContaBancaria } from './conta.entity';


@Entity()
export class Gerente {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nomeCompleto: string;

    @OneToMany(() => Cliente, (cliente) => cliente.codigoPessoaGerente, { cascade: true })
    clientes: Cliente[];

    @Column({ unique: true })
    codigoPessoaGerente: number;

    constructor(nomeCompleto: string, clientes: Cliente[], codigoPessoaGerente: number) {
        this.id = uuidv4();
        this.nomeCompleto = nomeCompleto;
        this.clientes = clientes;
        this.codigoPessoaGerente = gerarCodigoSequencial();

        nomeInvalidoException('JORGE AMADO');
    }

    adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    removerCliente(clienteId: string): void {
        this.clientes = this.clientes.filter(cliente => cliente.id !== clienteId);
    }

    abrirConta(cliente: Cliente, tipo: TipoConta, saldoInicial: number): ContaBancaria {
        const numeroConta = gerarNumeroConta();
        console.log('Número da conta gerado:', numeroConta);
        const novaConta = new ContaBancaria(cliente, numeroConta, saldoInicial, tipo);
        cliente.contas.push(novaConta);
        return novaConta;
    }
    
    
    fecharConta(cliente: Cliente, contaNumero: string): void {
        cliente.contas = cliente.contas.filter(conta => conta.getNumeroDaConta() !== contaNumero);
    }

    modificarTipoConta(cliente: Cliente, contaNumero: string, novoTipo: TipoConta): void {
        const conta = cliente.contas.find(conta => conta.getNumeroDaConta() === contaNumero);
        if (conta) {
            conta.setTipo(novoTipo);
        }
    }

}
