import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GerenteDto } from "../../aplication/dtos/gerente.dto";
import { Cliente } from "../entities/cliente.entity";
import { TipoConta } from "../entities/conta.entity";
import { Gerente } from "../entities/gerente.entity";
import { gerenteInvalidoException, nomeInvalidoException } from "../utilities/exceptions";
import { gerarCodigoSequencial } from "../utilities/utility";

@Injectable()
export class GerenteService {
    constructor(
        @InjectRepository(Gerente)
        private readonly gerenteRepository: Repository<Gerente>,
    ) {}

    async findAll(): Promise<Gerente[]> {
        return this.gerenteRepository.find({ relations: ['clientes'] });
    }

    async findOne(codigoPessoaGerente: number): Promise<Gerente> {
        const gerente = await this.gerenteRepository.findOne({
            where: { codigoPessoaGerente },
            relations: ['clientes'],
        });

        if (!gerente) {
            throw new NotFoundException(`Pessoa gerente de código ${codigoPessoaGerente} não encontrada.`);
        }

        return gerente;
    }

    async findByCodigo(codigoPessoaGerente: number): Promise<Gerente> {
        const gerente = await this.gerenteRepository.findOne({
            where: { codigoPessoaGerente },
            relations: ['clientes'],
        });
    
        if (!gerente) {
            throw new NotFoundException(`Pessoa gerente de código ${codigoPessoaGerente} não encontrada.`);
        }
    
        return gerente;
    }



    async adicionarCliente(codigoPessoaGerente: number, cliente: Cliente): Promise<Gerente> {
        const gerente = await this.findOne(codigoPessoaGerente);
        gerenteInvalidoException(gerente);

        gerente.adicionarCliente(cliente);
        await this.gerenteRepository.save(gerente);
        return gerente;
    }

    async criarGerente(gerenteDto: GerenteDto): Promise<Gerente> {
        nomeInvalidoException(gerenteDto.nomeCompleto);
        
        const codigoPessoaGerente = gerarCodigoSequencial();

        const novoGerente = this.gerenteRepository.create({
            ...gerenteDto,
            codigoPessoaGerente,
        });

        const gerenteSalvo = await this.gerenteRepository.save(novoGerente);
        return gerenteSalvo;
    }

    async removerCliente(codigoPessoaGerente: number, codigoPessoaCliente: number): Promise<Gerente> {
        const gerente = await this.findByCodigo(codigoPessoaGerente);
        gerenteInvalidoException(gerente);

        const cliente = gerente.clientes.find(cliente => cliente.codigoPessoaCliente === codigoPessoaCliente);

        gerente.removerCliente(cliente!.id);
        await this.gerenteRepository.save(gerente);
        return gerente;
    }

    async abrirConta(codigoPessoaGerente: number, codigoPessoaCliente: number, tipo: TipoConta, saldoInicial: number): Promise<Gerente> {
        const gerente = await this.findByCodigo(codigoPessoaGerente);
        gerenteInvalidoException(gerente);

        const cliente = gerente.clientes.find(cliente => cliente.codigoPessoaCliente === codigoPessoaCliente);
        if (!cliente) {
            throw new NotFoundException(`Pessoa cliente de código ${codigoPessoaCliente} não encontrada.`);
        }

        gerente.abrirConta(cliente, tipo, saldoInicial);
        await this.gerenteRepository.save(gerente);
        return gerente;
    }

    async fecharConta(codigoPessoaGerente: number, contaNumero: string): Promise<Gerente> {
        const gerente = await this.findByCodigo(codigoPessoaGerente);
        gerenteInvalidoException(gerente);

        const cliente = gerente.clientes.find(cliente => cliente.contas.some(conta => conta.numeroConta === contaNumero));

        if (!cliente) {
            throw new NotFoundException(`Conta de número ${contaNumero} não encontrada para pessoa gerente de código ${codigoPessoaGerente}.`);
        }

        gerente.fecharConta(cliente!, contaNumero);
        await this.gerenteRepository.save(gerente);
        return gerente;
    }

    async modificarConta(codigoPessoaGerente: number, clienteId: string, contaNumero: string, novoTipo: TipoConta): Promise<Gerente> {
        const gerente = await this.findByCodigo(codigoPessoaGerente);
        gerenteInvalidoException(gerente);

        const cliente = gerente.clientes.find(cliente => cliente.id === clienteId);

        gerente.modificarTipoConta(cliente!, contaNumero, novoTipo);
        await this.gerenteRepository.save(gerente);
        return gerente;
    }
}
