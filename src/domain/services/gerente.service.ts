import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GerenteDto } from "../../aplication/dtos/gerente.dto";
import { Cliente } from "../entities/cliente.entity";
import { TipoConta } from "../entities/conta.entity";
import { Gerente } from "../entities/gerente.entity";
import { gerenteInvalidoException, nomeInvalidoException } from "../exceptions/exceptions";

@Injectable()
export class GerenteService {
    constructor(
        @InjectRepository(Gerente)
        private readonly gerenteRepository: Repository<Gerente>,
    ) {}

    async findAll(): Promise<Gerente[]> {
        return this.gerenteRepository.find({ relations: ['clientes'] });
    }

    async findOne(id: string): Promise<Gerente> {
        const gerente = await this.gerenteRepository.findOne({
            where: { id },
            relations: ['clientes'],
        });

        gerenteInvalidoException(gerente);
        return gerente!;
    }

    async adicionarCliente(id: string, cliente: Cliente): Promise<Gerente> {
        const gerente = await this.findOne(id);
        gerenteInvalidoException(gerente);

        gerente.adicionarCliente(cliente);
        await this.gerenteRepository.save(gerente);
        return gerente;
    }

    async criarGerente(gerenteDto: GerenteDto): Promise<Gerente> {
        nomeInvalidoException(gerenteDto.nomeCompleto);
    
        const novoGerente = this.gerenteRepository.create(gerenteDto);
        return this.gerenteRepository.save(novoGerente);
    }

    async removerCliente(id: string, clienteId: string): Promise<Gerente> {
        const gerente = await this.findOne(id);
        gerenteInvalidoException(gerente);

        const cliente = gerente.clientes.find(cliente => cliente.id === clienteId);

        gerente.removerCliente(cliente!.id);
        await this.gerenteRepository.save(gerente);
        return gerente;
    }

    async abrirConta(id: string, clienteId: string, tipo: TipoConta, saldoInicial: number): Promise<Gerente> {
        const gerente = await this.findOne(id);
        gerenteInvalidoException(gerente);

        const cliente = gerente.clientes.find(cliente => cliente.id === clienteId);

        gerente.abrirConta(cliente!, tipo, saldoInicial);
        await this.gerenteRepository.save(gerente);
        return gerente;
    }

    async fecharConta(id: string, contaNumero: string): Promise<Gerente> {
        const gerente = await this.findOne(id);
        gerenteInvalidoException(gerente);

        const cliente = gerente.clientes.find(cliente => cliente.id === id);

        gerente.fecharConta(cliente!, contaNumero);
        await this.gerenteRepository.save(gerente);
        return gerente;
    }

    async modificarConta(id: string, clienteId: string, contaNumero: string, novoTipo: TipoConta): Promise<Gerente> {
        const gerente = await this.findOne(id);
        gerenteInvalidoException(gerente);

        const cliente = gerente.clientes.find(cliente => cliente.id === clienteId);

        gerente.modificarTipoConta(cliente!, contaNumero, novoTipo);
        await this.gerenteRepository.save(gerente);
        return gerente;
    }
}
