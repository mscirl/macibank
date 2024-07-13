import { Injectable } from '@nestjs/common';
import { Cliente } from '../models/cliente.model';
import { ContaBancaria } from '../models/conta.model';
import { GerenteService } from './gerente.service';

@Injectable()
export class ClienteService {
    private clientes: Cliente[] = [];
    private clientesExcluidos: Cliente[] = [];

    constructor(private readonly gerenteService: GerenteService) {}

    findAll(): Promise<Cliente[]> {
        return Promise.resolve(this.clientes);
    }

    createCliente(nomeCompleto: string, endereco: string, telefone: string, contas: ContaBancaria[], gerenteId: string): Cliente {
        const gerente = this.gerenteService.findOne(gerenteId);
        if(!gerente) {
            throw new Error (`Gerente de id ${gerenteId} não encontrado`);
        }

        const newCliente = new Cliente(nomeCompleto, endereco, telefone, contas, gerente);
        this.clientes.push(newCliente);
        
        gerente.adicionarCliente(newCliente);

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
        //criação da constante que vai receber a lista de clientes,
        //após comparar se existe algum id dessa lista que corresponde com o informado
        const index = this.clientes.findIndex(cliente => cliente.id === id);
        if (index !== -1){
        const clienteExcluido = this.clientes.splice(index, 1) [0];
        this.clientesExcluidos.push(clienteExcluido);
        return clienteExcluido;
    }
    throw new Error(`Cliente de id ${id} não encontrado para exclusão`);
    }
}
    export { Cliente };
