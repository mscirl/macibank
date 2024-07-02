import { Module } from '@nestjs/common';
import { GerenteModule } from './gerente/gerente.module';
import { ClienteModule } from './cliente/cliente.module';
import { ContaModule } from './conta/conta.module';

@Module({
    imports: [GerenteModule, ClienteModule, ContaModule],
})
export class AppModule {}
