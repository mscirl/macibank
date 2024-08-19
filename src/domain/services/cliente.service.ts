import { Injectable, NotFoundException } from '@nestjs/common';
import { ClienteDto } from '../../aplication/dtos/cliente.dto';
import { ContaBancariaDto } from '../../aplication/dtos/conta.dto';
import { GerenteDto } from '../../aplication/dtos/gerente.dto';
import { RespostaClienteDto } from '../../aplication/dtos/resposta-cliente.dto';
import { Cliente } from '../entities/cliente.entity';
import { ContaBancaria } from '../entities/conta.entity';
import { Gerente } from '../entities/gerente.entity';
import { ClienteRepository } from '../repositories/cliente.repository';
import { gerarCodigoSequencial } from '../utilities/utility';
import { GerenteService } from './gerente.service';

@Injectable()
export class ClienteService {
    private clientes: Cliente[] = [];
    private clientesExcluidos: Cliente[] = [];
    
    constructor(private readonly gerenteService: GerenteService, private readonly clienteRepository: ClienteRepository) {}

    async findAll(): Promise<Cliente[]> {
        return this.clientes;
    }

    async criarCliente(clienteDto: ClienteDto): Promise<RespostaClienteDto> {
        const { nomeCompleto, endereco, telefone, contas, gerente } = clienteDto;
        const codigoPessoa = gerarCodigoSequencial();
        
        let gerenteEncontrado: Gerente | null = null;
    
        if (gerente && gerente.codigoPessoa) {
            gerenteEncontrado = await this.gerenteService.findOne(gerente.codigoPessoa);
            if (!gerenteEncontrado) {
                console.warn(`Gerente de código ${gerente.codigoPessoa} não encontrado. Cliente será criado sem gerente.`);
            }
        }
    
        const novoCliente = new Cliente(nomeCompleto, endereco, telefone, [], codigoPessoa, gerenteEncontrado);
        
        if (gerenteEncontrado) {
            gerenteEncontrado.adicionarCliente(novoCliente);
        }
    
        const contasEntidades = contas.map(contaDto => new ContaBancaria(novoCliente, contaDto.numeroConta, contaDto.saldo, contaDto.tipo));
        novoCliente.contas = contasEntidades;
    
        await this.clienteRepository.save(novoCliente);
    
        const contasDto = novoCliente.contas.map(conta => new ContaBancariaDto(conta.numeroConta, conta.saldo, conta.tipo));
        const gerenteDto = gerenteEncontrado ? new GerenteDto(gerenteEncontrado.nomeCompleto, gerenteEncontrado.codigoPessoa) : null;
        return new RespostaClienteDto(novoCliente.id, novoCliente.nomeCompleto, novoCliente.endereco, novoCliente.telefone, novoCliente.codigoPessoa, contasDto, gerenteDto);
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
