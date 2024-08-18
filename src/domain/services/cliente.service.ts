import { Injectable, NotFoundException } from '@nestjs/common';
import { ClienteDto } from '../../aplication/dtos/cliente.dto';
import { Cliente } from '../entities/cliente.entity';
import { ContaBancaria } from '../entities/conta.entity';
import { GerenteService } from './gerente.service';

@Injectable()
export class ClienteService {
    private clientes: Cliente[] = [];
    private clientesExcluidos: Cliente[] = [];

    constructor(private readonly gerenteService: GerenteService) {}

    async findAll(): Promise<Cliente[]> {
        return this.clientes;
    }

    async criarCliente(clienteDto: ClienteDto, codigoPessoaGerente: number): Promise<Cliente> {
        const { nomeCompleto, endereco, telefone, contas } = clienteDto;

        const gerente = await this.gerenteService.findOne(codigoPessoaGerente);
        if (!gerente) {
            throw new NotFoundException(`Pessoa gerente de código ${codigoPessoaGerente} não encontrada.`);
        }

        const novoCliente = new Cliente(nomeCompleto, endereco, telefone, [], codigoPessoaGerente, codigoPessoaGerente);
        this.clientes.push(novoCliente);
        gerente.adicionarCliente(novoCliente);

        const contasEntidades = contas.map(contaDto => {
            return new ContaBancaria(novoCliente, contaDto.numeroConta, contaDto.saldo, contaDto.tipo);
        });

        novoCliente.contas = contasEntidades;

        return novoCliente;
    }

    async deleteCliente(id: string): Promise<void> {
        const clienteIndex = this.clientes.findIndex(cliente => cliente.id === id);

        if (clienteIndex === -1) {
            throw new NotFoundException(`Pessoa cliente de id ${id} não encontrada.`);
        }

        const [clienteExcluido] = this.clientes.splice(clienteIndex, 1);
        this.clientesExcluidos.push(clienteExcluido);
    }

    getClientes(): Cliente[] {
        return this.clientes;
    }
}

export { Cliente };
