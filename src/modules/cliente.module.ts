import { Module } from '@nestjs/common';
import { ClienteService } from '../domain/services/cliente.service';
import { ClienteController } from '../infrastructure/adapters/cliente.controller';
import { GerenteModule } from './gerente.module';

@Module({
imports: [GerenteModule],
controllers: [ClienteController],
providers: [ClienteService],
})
export class ClienteModule {}
