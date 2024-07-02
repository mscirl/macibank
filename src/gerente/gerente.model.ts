import { v4 as uuidv4 } from 'uuid';
import { Cliente } from '../cliente/cliente.model';

export class Gerente {
    nomeCompleto: string;
    id: string;
    clientes: Cliente[];

    constructor(nomeCompleto: string, clientes: Cliente[]) {
        this.nomeCompleto = nomeCompleto;
        this.id = uuidv4();
        this.clientes = clientes;
    }
}
