import { v4 as uuidv4 } from 'uuid';
import { TipoConta } from '../enums/conta.enum';
import { nomeInvalidoException } from '../exceptions/exceptions';
import { Cliente } from './cliente.entity';
import { ContaBancaria } from './conta.entity';

export class Gerente {
    nomeCompleto: string;
    id: string;
    clientes: Cliente[];

    constructor(nomeCompleto: string, clientes: Cliente[]) {
        this.nomeCompleto = nomeCompleto;
        this.id = uuidv4();
        this.clientes = clientes;

        nomeInvalidoException(nomeCompleto);
    }

    adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    removerCliente(clienteId: string): void {
        this.clientes = this.clientes.filter(cliente => cliente.id !== clienteId);
    }

    abrirConta(cliente: Cliente, tipo: TipoConta, saldoInicial: number): ContaBancaria {
        const numeroConta = this.gerarNumeroConta();
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
            conta.setTipo(novoTipo); // set pra alterar dados set => setar
        }
    }

    private gerarNumeroConta(): string {
        return Math.random().toString().substring(2, 10);
    }
}
