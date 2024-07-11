import { Module } from '@nestjs/common';
import { ClienteModule } from './modules/cliente.module';
import { ContaModule } from './modules/conta.module';
import { GerenteModule } from './modules/gerente.module';

@Module({
    imports: [GerenteModule, ClienteModule, ContaModule],
})
export class AppModule {}
