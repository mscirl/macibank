import { Controller, Post, Body, Get } from '@nestjs/common';
import { Cliente } from '../services/cliente.service';
import { ClienteService } from '../services/cliente.service';
import { ContaBancaria } from '../models/conta.model';
import { Gerente } from '../models/gerente.model';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) {}

    @Post('criar')
    createCliente(@Body() body: { nomeCompleto: string, endereco: string, telefone: string, contas: ContaBancaria[], gerente: Gerente }): Cliente {
        return this.clienteService.createCliente(body.nomeCompleto, body.endereco, body.telefone, body.contas, body.gerente);
    }

    @Get('consultar')
    findAll(): Promise<Cliente[]> {
        return this.clienteService.findAll();
    }
}
