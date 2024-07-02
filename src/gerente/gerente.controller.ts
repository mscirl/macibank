import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Gerente } from './gerente.model';
import { GerenteService } from './gerente.service';

@Controller('gerente')
export class GerenteController {
    constructor(private readonly gerenteService: GerenteService) {}

    @Get(':id')
    findOne(@Param('id') id: string): Gerente | undefined {
        return this.gerenteService.findOne(id);
    }

    @Post()
    create(@Body() gerente: Gerente): Gerente {
        return this.gerenteService.create(gerente);
    }
}
