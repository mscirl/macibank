import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ClienteDto } from '../../aplication/dtos/cliente.dto';
import { GerenteDto } from '../../aplication/dtos/gerente.dto';
import { Cliente } from '../../domain/entities/cliente.entity';
import { Gerente } from '../../domain/entities/gerente.entity';
import { TipoConta } from '../../domain/enums/conta.enum';
import { ClienteService } from '../../domain/services/cliente.service';
import { GerenteService } from '../../domain/services/gerente.service';

@Controller('gerente')
export class GerenteController {
    constructor(private readonly gerenteService: GerenteService, private readonly clienteService: ClienteService) {}

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Gerente> {
        const codigo = Number(id);
        return this.gerenteService.findOne(codigo);
    }

    @Post(':codigoPessoaGerente')
    async criarCliente(
        @Param('codigoPessoaGerente') codigoPessoaGerente: string,
        @Body() clienteDto: ClienteDto,
    ) {
        const codigo = Number(codigoPessoaGerente);
        return this.clienteService.criarCliente(clienteDto, codigo);
    }

    @Post('criar')
    async create(@Body() gerenteDto: GerenteDto): Promise<{ codigoPessoaGerente: number }> {
        const gerente = await this.gerenteService.criarGerente(gerenteDto);
        return { codigoPessoaGerente: gerente.codigoPessoaGerente };
    }

    @Put(':id/adicionar-cliente')
    async adicionarCliente(@Param('id') id: string, @Body() cliente: Cliente): Promise<Gerente> {
        const codigo = Number(id);
        return this.gerenteService.adicionarCliente(codigo, cliente);
    }

    @Put(':id/abrir-conta')
    async abrirConta(@Param('id') codigoPessoaGerente: number, @Body() dados: { codigoPessoaCliente:number, tipo: TipoConta; saldoInicial: number }): Promise<Gerente> {
        return this.gerenteService.abrirConta(codigoPessoaGerente, dados.codigoPessoaCliente, dados.tipo, dados.saldoInicial);
    }

    @Put(':id/fechar-conta')
    async fecharConta(@Param('id') id: string, @Body() dados: { contaNumero: string }): Promise<Gerente> {
        const codigo = Number(id);
        return this.gerenteService.fecharConta(codigo, dados.contaNumero);
    }

    @Put(':id/modificar-tipo-conta')
    async modificarTipoConta(@Param('id') id: string, @Body() dados: { clienteId: string; contaNumero: string; novoTipo: TipoConta }): Promise<Gerente> {
        const codigo = Number(id); // conversão pra number pra garantir consistência
        return this.gerenteService.modificarConta(codigo, dados.clienteId, dados.contaNumero, dados.novoTipo);
    }
}
