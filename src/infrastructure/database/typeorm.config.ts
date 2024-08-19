import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cliente } from '../../domain/entities/cliente.entity';
import { ContaBancaria } from '../../domain/entities/conta.entity';
import { Gerente } from '../../domain/entities/gerente.entity';
import { Pagamento } from '../../domain/entities/pagamento.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
type: 'postgres',
host: '127.0.0.1',
port: 5432,
username: 'thais',
password: '00O3.GvDk',
database: 'macibank',
entities: [Cliente, ContaBancaria, Gerente, Pagamento],
synchronize: true,
logging: true
};
