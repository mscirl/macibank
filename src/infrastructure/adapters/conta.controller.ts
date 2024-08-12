import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post } from '@nestjs/common';
import { PagamentoDto } from '../../aplication/dtos/pagamento.dto';
import { PagamentoBoleto, PagamentoPix, metodoDePagamento } from '../../domain/entities/pagamento.entity';
import { TipoPagamentos } from '../../domain/enums/pagamento.enum';
import { ContaService } from '../../domain/services/conta.service';
import { ExtratoFactory } from '../../factories/extrato.factory';
import { SMSObserver } from '../../observers/observer.sms';
import { Subject } from '../../subjects/subject';

@Controller('conta')
export class ContaController {
    constructor(private readonly contaService: ContaService) {}

    @Post('/pagar')
    async pagar(@Body() pagamentoDto: PagamentoDto): Promise<string> {
        const conta = await this.contaService.encontrarContaPorNumero(pagamentoDto.numeroConta);
        if (!conta) {
            throw new NotFoundException(`Conta ${pagamentoDto.numeroConta} não encontrada`);
        }

        let metodoPagamento: metodoDePagamento;
        let subject = new Subject();

        if (pagamentoDto.metodo === TipoPagamentos.PIX) {
            metodoPagamento = new PagamentoPix();
            const smsObserver = new SMSObserver();
            subject.addObserver(smsObserver);
        } else if (pagamentoDto.metodo === TipoPagamentos.BOLETO) {
            metodoPagamento = new PagamentoBoleto();
        } else {
            throw new HttpException(`Método de pagamento inválido: ${pagamentoDto.metodo}`, HttpStatus.BAD_REQUEST);
        }

        try {
            conta.pagar(pagamentoDto.valor, metodoPagamento);
            return `Pagamento de R$${pagamentoDto.valor} realizado com sucesso via ${pagamentoDto.metodo}`;
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id/extrato')
    obterExtrato(@Param('id') id: string) {
        const conta = this.contaService.getContaById(id);
        if (!conta) {
            throw new NotFoundException('Conta não encontrada.');
        }

        const extrato = ExtratoFactory.criarExtrato(conta);
        return {
            statusCode: 200,
            message: 'Extrato gerado com sucesso.',
            data: extrato,
        };
    }
}