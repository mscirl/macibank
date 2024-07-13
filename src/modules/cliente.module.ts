import { Module } from '@nestjs/common';
import { ClienteController } from '../controllers/cliente.controller';
import { ClienteService } from '../services/cliente.service';
import { GerenteModule } from './gerente.module';

@Module({
imports: [GerenteModule],
controllers: [ClienteController],
providers: [ClienteService],
})
export class ClienteModule {}
