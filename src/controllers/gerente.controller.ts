import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Gerente } from '../models/gerente.model';
import { GerenteService } from '../services/gerente.service';
import { CreateGerenteDto } from '../dtos/gerente.dto';
import { Cliente } from '../models/cliente.model';
import { TipoConta } from '../models/conta.model';

@Controller('gerente')
export class GerenteController {
    constructor(private readonly gerenteService: GerenteService) {}

    @Get(':id')
    findOne(@Param('id') id: string): Gerente | undefined {
        return this.gerenteService.findOne(id);
    }

    @Post('criar')
    create(@Body() createGerenteDto: CreateGerenteDto): Gerente {
        const { nomeCompleto, clientes } = createGerenteDto;
        const gerente = new Gerente(nomeCompleto, clientes);
        return this.gerenteService.create(gerente);
    }

    @Put(':id/adicionar-cliente')
    adicionarCliente(@Param('id') id: string, @Body() cliente: Cliente): Gerente | undefined {
        return this.gerenteService.adicionarCliente(id, cliente);
    }

    @Put(':id/abrir-conta')
    abrirConta(@Param('id') id: string, @Body() dados: { clienteId: string; tipo: TipoConta; saldoInicial: number }): Gerente | undefined {
        return this.gerenteService.abrirConta(id, dados.clienteId, dados.tipo, dados.saldoInicial);
    }

    @Put(':id/fechar-conta')
    fecharConta(@Param('id') id: string, @Body() dados: { clienteId: string; contaNumero: string }): Gerente | undefined {
        return this.gerenteService.fecharConta(id, dados.clienteId, dados.contaNumero);
    }

    @Put(':id/modificar-tipo-conta')
    modificarTipoConta(@Param('id') id: string, @Body() dados: { clienteId: string; contaNumero: string; novoTipo: TipoConta }): Gerente | undefined {
        return this.gerenteService.modificarConta(id, dados.clienteId, dados.contaNumero, dados.novoTipo);
    }

    @Get()
    findAll(): Gerente[] {
        return this.gerenteService.findAll();
    }
}
