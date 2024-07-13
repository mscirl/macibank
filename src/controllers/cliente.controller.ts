import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ContaBancaria } from '../models/conta.model';
import { Cliente, ClienteService } from '../services/cliente.service';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) {}

    @Post('criar')
    createCliente(@Body() body: { nomeCompleto: string, endereco: string, telefone: string, contas: ContaBancaria[], gerenteId: string }): Cliente {
        return this.clienteService.createCliente(body.nomeCompleto, body.endereco, body.telefone, body.contas, body.gerenteId);
    }

    @Get('consultar')
    findAll(): Promise<Cliente[]> {
        return this.clienteService.findAll();
    }

    @Delete('excluir/:id')
    deleteCliente(@Param('id') id: string): Cliente {
        return this.clienteService.deleteCliente(id);
    }

}

