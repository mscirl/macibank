import { v4 as uuidv4 } from 'uuid';
import { validaNome } from '../helpers/helpers';
import { ContaBancaria, TipoConta } from '../models/conta.model';
import { Cliente } from './cliente.model';


export class Gerente {
    nomeCompleto: string;
    id: string;
    clientes: Cliente[];

    constructor(nomeCompleto: string, clientes: Cliente[]) {
        this.validarNome(nomeCompleto);
        this.nomeCompleto = nomeCompleto;
        this.id = uuidv4();
        this.clientes = clientes;
    }


    private validarNome(nomeCompleto: string): void {
        const mensagemErroNomeGerente = validaNome(nomeCompleto);
        if(mensagemErroNomeGerente){
            throw new Error(mensagemErroNomeGerente);
        }
    }

    adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    removerCliente(clienteId: string): void {
        this.clientes = this.clientes.filter(cliente => cliente.id !== clienteId);
    }

    abrirConta(cliente: Cliente, tipo: TipoConta, saldoInicial: number): ContaBancaria {
        const novaConta = new ContaBancaria(cliente, tipo, saldoInicial);
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
}
