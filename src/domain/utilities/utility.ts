export function gerarNumeroConta(): string {
    const numeroConta = Math.floor(10000000 + Math.random() * 90000000).toString();
    console.log('Número da conta gerado:', numeroConta);
    return numeroConta;
}

export function gerarCodigoSequencial(): number {
    const codigo = Math.floor(Math.random() * 10000);
    console.log('Pessoa cadastrada com o código:', codigo);
    return codigo;
}