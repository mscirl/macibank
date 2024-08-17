import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { TipoConta } from '../../domain/enums/conta.enum';
import { contaBancariaInvalidaException } from '../../domain/utilities/exceptions';

export class ContaBancariaDto {
    @IsString()
    @IsNotEmpty({ message: 'Por favor, digite o número da conta para prosseguir.' })
    @Length(8)
    numeroConta: string;

    @IsNumber()
    saldo: number;

    @IsString()
    @IsNotEmpty({ message: `Por gentileza, informe o tipo de sua conta bancária. Opções possíveis: ${TipoConta.CORRENTE}, ${TipoConta.POUPANCA}.` })
    tipo: TipoConta;

    constructor(numeroConta: string, saldo: number, tipo: TipoConta) {
        this.numeroConta = numeroConta;
        this.saldo = saldo;
        this.tipo = tipo;
        contaBancariaInvalidaException(this.numeroConta);

    }
}
