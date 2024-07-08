import { Injectable } from '@nestjs/common';
import { Gerente } from '../models/gerente.model';
import { Cliente } from '../models/cliente.model';
import { TipoConta } from '../models/conta.model';

@Injectable()
export class GerenteService {
    private readonly gerentes: Gerente[] = [];

    findAll(): Gerente[] {
        return this.gerentes;
    }

    findOne(id: string): Gerente | undefined {
        return this.gerentes.find(gerente => gerente.id === id);
    }

    create(gerente: Gerente): Gerente {
        this.gerentes.push(gerente);
        return gerente;
    }

    adicionarCliente(id: string, cliente: Cliente): Gerente | undefined {
        const gerente = this.findOne(id);
        if (gerente) {
            gerente.adicionarCliente(cliente);
            return gerente;
        }
        return undefined;
    }

    removerCliente(id: string, clienteId: string): Gerente | undefined {
        const gerente = this.findOne(id);
        if (gerente) {
            gerente.removerCliente(clienteId);
            return gerente;
        }
        return undefined;
    }

    abrirConta(id: string, clienteId: string, tipo: TipoConta, saldoInicial: number): Gerente | undefined {
        const gerente = this.findOne(id);
        if (gerente) {
            const cliente = gerente.clientes.find(cliente => cliente.id === clienteId);
            if (cliente) {
                gerente.abrirConta(cliente, tipo, saldoInicial);
                return gerente;
            }
        }
        return undefined;
    }

    fecharConta(id: string, clienteId: string, contaNumero: string): Gerente | undefined {
        const gerente = this.findOne(id);
        if (gerente) {
            const cliente = gerente.clientes.find(cliente => cliente.id === clienteId);
            if (cliente) {
                gerente.fecharConta(cliente, contaNumero);
                return gerente;
            }
        }
        return undefined;
    }

    modificarConta(id: string, clienteId: string, contaNumero: string, novoTipo: TipoConta): Gerente | undefined {
        const gerente = this.findOne(id);
        if (gerente) {
            const cliente = gerente.clientes.find(cliente => cliente.id === clienteId);
            if (cliente) {
                gerente.modificarTipoConta(cliente, contaNumero, novoTipo);
                return gerente;
            }
        }
        return undefined;
    }
}
