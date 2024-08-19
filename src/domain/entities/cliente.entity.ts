import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
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

    @OneToMany(() => ContaBancaria, (conta) => conta.cliente)
    contas: ContaBancaria[];

    @Column({ unique: true})
    codigoPessoa: number;

    @ManyToOne(() => Gerente, (gerente) => gerente.clientes, { nullable: true }) //aqui estou permitindo que gerente seja null
    gerente: Gerente | null;                                                     //pois o cliente pode ser criado inicialmente sem um gerente

    constructor(nomeCompleto: string, endereco: string, telefone: string, contas: ContaBancaria[], codigoPessoa: number, gerente: Gerente | null = null) {
        this.id = uuidv4();
        this.nomeCompleto = nomeCompleto;
        this.endereco = endereco;
        this.telefone = telefone;
        this.contas = contas;
        this.codigoPessoa = codigoPessoa;
        this.gerente = gerente;
    }
    
}
