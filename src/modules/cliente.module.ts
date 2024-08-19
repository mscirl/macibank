import { Module } from '@nestjs/common';
import { ClienteRepository } from '../domain/repositories/cliente.repository';
import { ClienteService } from '../domain/services/cliente.service';
import { ClienteController } from '../infrastructure/adapters/cliente.controller';
import { GerenteModule } from './gerente.module';

@Module({
imports: [GerenteModule],
controllers: [ClienteController],
providers: [ClienteService, ClienteRepository],
})
export class ClienteModule {}
