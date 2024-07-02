import { v4 as uuidv4 } from 'uuid';
import { Cliente } from '../cliente/cliente.model';
import { ContaBancaria, TipoConta } from '../conta/conta.model';

let listaNomesGerentes: string []= [];
let listaIdsGerentes: string []= [];

export class Gerente {
    nomeCompleto: string;
    id: string = ''; 
    clientes: Cliente[];

    constructor(nomeCompleto: string, clientes: Cliente[]) {
        const index = listaNomesGerentes.indexOf(nomeCompleto);
        if (index !== -1) {
            this.id = listaIdsGerentes[index];
        } else {
            this.id = uuidv4();
            listaIdsGerentes.push(this.id);
            listaNomesGerentes.push(nomeCompleto);
        }

        this.nomeCompleto = nomeCompleto;
        this.id = uuidv4();
        this.clientes = clientes;
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
