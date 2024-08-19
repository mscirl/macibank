import { Cliente } from '../../domain/entities/cliente.entity';

export class DeleteClienteUseCase {
    private clientes: Cliente[] = [];
    private clientesExcluidos: Cliente[] = [];

    execute(id: string): Cliente {
        const index = this.clientes.findIndex(cliente => cliente.id === id);
        if (index !== -1) {
            const clienteExcluido = this.clientes.splice(index, 1)[0];
            this.clientesExcluidos.push(clienteExcluido);
            return clienteExcluido;
        }

        throw new Error(`Pessoa cliente com id ${id} não encontrada para exclusão.`);
    }
}
