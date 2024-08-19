import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TipoConta } from './conta.entity';


@Entity()
export class Pagamento {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    tipo: string;

    @Column('decimal')
    valor: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data: Date;

    constructor(id: string, tipo: TipoConta, valor: number, data: Date){
        this.id = uuidv4();
        this.tipo = tipo;
        this.valor = valor;
        this.data = data;
    }

}
