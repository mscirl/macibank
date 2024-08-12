import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { nomeInvalidoException } from '../exceptions/exceptions';
import { ContaBancaria } from './conta.entity';
import { Gerente } from './gerente.entity';


@Entity()
export class Cliente {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nomeCompleto: string;

    @Column()
    endereco: string;

    @Column()
    telefone: string;

    @OneToMany(() => ContaBancaria, conta => conta.cliente)
    contas: ContaBancaria[];

    @ManyToOne(() => Gerente, gerente => gerente.clientes, { nullable: true })
    gerente?: Gerente;

    constructor(nomeCompleto: string, endereco: string, telefone: string, contas: ContaBancaria[], gerente?: Gerente) {
        this.id = uuidv4();
        this.nomeCompleto = nomeCompleto;
        this.endereco = endereco;
        this.telefone = telefone;
        this.contas = contas;
        this.gerente = gerente;
    
        nomeInvalidoException(nomeCompleto);
    }
    
}
