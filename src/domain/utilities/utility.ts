export function gerarNumeroConta(): string {
    const numeroConta = Math.floor(10000000 + Math.random() * 90000000).toString();
    console.log('Número da conta gerado:', numeroConta);
    return numeroConta;
}