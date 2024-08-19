import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GerenteDto } from "../../aplication/dtos/gerente.dto";
import { Cliente } from "../entities/cliente.entity";
import { ContaBancaria, TipoConta } from "../entities/conta.entity";
import { Gerente } from "../entities/gerente.entity";
import { gerenteInvalidoException, nomeInvalidoException } from "../utilities/exceptions";
import { gerarCodigoSequencial, gerarNumeroConta } from "../utilities/utility";

@Injectable()
export class GerenteService {
    constructor(
        @InjectRepository(Gerente)
        private readonly gerenteRepository: Repository<Gerente>,
    ) {}

    async findAll(): Promise<Gerente[]> {
        return this.gerenteRepository.find({ relations: ['clientes'] });
    }

    async findOne(codigoPessoa: number): Promise<Gerente> {
        const gerente = await this.gerenteRepository.findOne({
            where: { codigoPessoa },
            relations: ['clientes'],
        });

        if (!gerente) {
            throw new NotFoundException(`Pessoa gerente de código ${codigoPessoa} não encontrada.`);
        }
        return gerente;
    }

    async criarGerente(gerenteDto: GerenteDto): Promise<{ codigoPessoa: number }> {
        nomeInvalidoException(gerenteDto.nomeCompleto);
        
        const novoGerente = this.gerenteRepository.create({
            ...gerenteDto,
            codigoPessoa: gerarCodigoSequencial(),
        });

        const gerenteSalvo = await this.gerenteRepository.save(novoGerente);
        return { codigoPessoa: gerenteSalvo.codigoPessoa };
    }

    async adicionarCliente(codigoPessoa: number, cliente: Cliente): Promise<Gerente> {
        const gerente = await this.findOne(codigoPessoa);
        gerente.adicionarCliente(cliente);
        await this.gerenteRepository.save(gerente);
        return gerente;
    }

    async abrirConta(codigoPessoa: number, tipo: TipoConta, saldoInicial: number): Promise<Gerente> {
        const gerente = await this.findOne(codigoPessoa);
        gerenteInvalidoException(gerente);
    
        const cliente = gerente.clientes.find(cliente => cliente.codigoPessoa === codigoPessoa);
        if (!cliente) {
            throw new NotFoundException(`Pessoa cliente de código ${codigoPessoa} não encontrada.`);
        }
    
        const numeroConta = gerarNumeroConta();
        const novaConta = new ContaBancaria(cliente, numeroConta, saldoInicial, tipo);
        cliente.contas.push(novaConta);
        await this.gerenteRepository.save(gerente);
        return gerente;
    }

    async fecharConta(codigoPessoa: number, contaNumero: string): Promise<Gerente> {
        const gerente = await this.findOne(codigoPessoa);
        gerenteInvalidoException(gerente);
    
        const cliente = gerente.clientes.find(cliente => cliente.contas.some(conta => conta.numeroConta === contaNumero));
        if (!cliente) {
            throw new NotFoundException(`Conta de número ${contaNumero} não encontrada para o gerente de código ${codigoPessoa}.`);
        }
    
        cliente.contas = cliente.contas.filter(conta => conta.numeroConta !== contaNumero);
        await this.gerenteRepository.save(gerente);
        return gerente;
    }

    async modificarConta(codigoPessoa: number, clienteId: string, contaNumero: string, novoTipo: TipoConta): Promise<Gerente> {
        const gerente = await this.findOne(codigoPessoa);
        gerenteInvalidoException(gerente);
    
        const cliente = gerente.clientes.find(cliente => cliente.id === clienteId);
        if (!cliente) {
            throw new NotFoundException(`Cliente com ID ${clienteId} não encontrado.`);
        }
    
        const conta = cliente.contas.find(conta => conta.numeroConta === contaNumero);
        if (!conta) {
            throw new NotFoundException(`Conta com número ${contaNumero} não encontrada.`);
        }
    
        conta.tipo = novoTipo;
        await this.gerenteRepository.save(gerente);
        return gerente;
    }

}
