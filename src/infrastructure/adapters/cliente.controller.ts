import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ClienteDto } from '../../aplication/dtos/cliente.dto';
import { Cliente } from '../../domain/entities/cliente.entity';
import { ClienteService } from '../../domain/services/cliente.service';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) {}

    @Post('criar')
    async createCliente(@Body() clienteDto: ClienteDto): Promise<Cliente> {
        try {
            return await this.clienteService.createCliente(clienteDto);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
        }

    @Get('consultar')
    async findAll(): Promise<Cliente[]> {
        return this.clienteService.findAll();
    }

    @Delete('excluir/:id')
    async deleteCliente(@Param('id') id: string): Promise <void> {
        try {
            await this.clienteService.deleteCliente(id);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}

