import { Injectable } from '@nestjs/common';
import { Cliente } from '../services/cliente.service';

@Injectable()
export class ClienteRepository {
    private clientes: Cliente[] = [];

    save(cliente: Cliente): Cliente {
        this.clientes.push(cliente);
        return cliente;
    }

    findAll(): Cliente[] {
        return this.clientes;
    }

    delete(id: string): void {
        this.clientes = this.clientes.filter(cliente => cliente.id !== id);
    }
}
