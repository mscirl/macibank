import { Injectable } from '@nestjs/common';
import { Cliente } from '../models/cliente.model';
import { ContaBancaria } from '../models/conta.model';
import { Gerente } from '../models/gerente.model';

@Injectable()
export class ClienteService {
    private clientes: Cliente[] = [];

    findAll(): Promise<Cliente[]> {
        return Promise.resolve(this.clientes);
    }

    createCliente(nomeCompleto: string, endereco: string, telefone: string, contas: ContaBancaria[], gerente: Gerente): Cliente {
        const newCliente = new Cliente(nomeCompleto, endereco, telefone, contas, gerente);
        this.clientes.push(newCliente);
        return newCliente;
    }

    create(cliente: Cliente): Cliente {
        this.clientes.push(cliente);
        return cliente;
    }


    getAllClientes(): Cliente[] {
        return this.clientes;
    }

    deleteCliente(id: string): Cliente {
        const index = this.clientes.findIndex(cliente => cliente.id === id);
        if (index !== -1) {
            return this.clientes.splice(index, 1)[0];
        }
        throw new Error(`Cliente de Id ${id} não encontrado.`);
    }
}

export { Cliente };
