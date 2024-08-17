import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { gerarCodigoSequencial } from '../utilities/utility';
import { ContaBancaria } from './conta.entity';


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

    @Column({ unique: true })
    codigoPessoaGerente: number;

    constructor(nomeCompleto: string, endereco: string, telefone: string, contas: ContaBancaria[], codigoPessoaGerente: number) {
        this.id = uuidv4();
        this.nomeCompleto = nomeCompleto;
        this.endereco = endereco;
        this.telefone = telefone;
        this.contas = contas;
        this.codigoPessoaGerente = codigoPessoaGerente ?? gerarCodigoSequencial(); //aqui eu verifico se o código da pessoa gerente já existe,
                                                                                   //caso não exista, vai utilizar da function gerarCodigoSequencial para tal

    }

    
}
