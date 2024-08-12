import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GerenteDto } from '../../aplication/dtos/gerente.dto';
import { Cliente } from '../../domain/entities/cliente.entity';
import { Gerente } from '../../domain/entities/gerente.entity';
import { TipoConta } from '../../domain/enums/conta.enum';
import { GerenteService } from '../../domain/services/gerente.service';

@Controller('gerente')
export class GerenteController {
    constructor(private readonly gerenteService: GerenteService) {}

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Gerente> {
        return this.gerenteService.findOne(id);
    }

    @Post('criar')
    async create(@Body() gerenteDto: GerenteDto): Promise<Gerente> {
        const novoGerenteDto = new GerenteDto(gerenteDto.nomeCompleto, gerenteDto.clientes);
    
        return this.gerenteService.criarGerente(novoGerenteDto);
    }

    @Put(':id/adicionar-cliente')
    async adicionarCliente(@Param('id') id: string, @Body() cliente: Cliente): Promise<Gerente> {
        return this.gerenteService.adicionarCliente(id, cliente);
    }

    @Put(':id/abrir-conta')
    async abrirConta(@Param('id') id: string, @Body() dados: { clienteId: string; tipo: TipoConta; saldoInicial: number }): Promise<Gerente> {
        return this.gerenteService.abrirConta(id, dados.clienteId, dados.tipo, dados.saldoInicial);
    }

    @Put(':id/fechar-conta')
    async fecharConta(@Param('id') id: string, @Body() dados: { id: string; contaNumero: string }): Promise<Gerente> {
        return this.gerenteService.fecharConta(dados.id, dados.contaNumero);
    }

    @Put(':id/modificar-tipo-conta')
    async modificarTipoConta(@Param('id') id: string, @Body() dados: { clienteId: string; contaNumero: string; novoTipo: TipoConta }): Promise<Gerente> {
        return this.gerenteService.modificarConta(id, dados.clienteId, dados.contaNumero, dados.novoTipo);
    }

    @Get()
    async findAll(): Promise<Gerente[]> {
        return this.gerenteService.findAll();
    }
}
