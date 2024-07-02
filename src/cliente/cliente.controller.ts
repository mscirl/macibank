import { Controller, Post, Body, Get } from '@nestjs/common';
import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';
import { ContaBancaria } from '../conta/conta.model';
import { Gerente } from '../gerente/gerente.model';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) {}

    @Post('criar')
    createCliente(@Body() body: { nomeCompleto: string, endereco: string, telefone: string, contas: ContaBancaria[], gerente: Gerente }): Cliente {
        return this.clienteService.createCliente(body.nomeCompleto, body.endereco, body.telefone, body.contas, body.gerente);
    }

    @Get('consultar')
    async findAll(): Promise<Cliente[]> {
        return this.clienteService.findAll();
    }

}
