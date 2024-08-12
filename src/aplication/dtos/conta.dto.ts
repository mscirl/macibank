import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { TipoConta } from '../../domain/enums/conta.enum';

export class ContaBancariaDto {
    @IsString()
    @IsNotEmpty({ message: 'Por favor, digite o número da conta para prosseguir.' })
    @Length(8)
    numero: string;

    @IsNumber()
    saldo: number;

    @IsString()
    @IsNotEmpty({ message: `Por gentileza, informe o tipo de sua conta bancária. Opções possíveis: ${TipoConta.CORRENTE}, ${TipoConta.POUPANCA}.` })
    tipo: TipoConta;

    constructor(numero: string, saldo: number, tipo: TipoConta) {
        this.numero = numero;
        this.saldo = saldo;
        this.tipo = tipo;
    }
}
