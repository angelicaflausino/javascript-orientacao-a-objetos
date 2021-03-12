export class Conta {
    constructor(saldoInicial, cliente, agencia) {
        this._saldo = saldoInicial;
        this._cliente = cliente;
        this._agencia = agencia;

        console.log(this.constructor);
        if(this.constructor == Conta) {
            throw new Error("Você não deveria instanciar um objeto do tipo Conta, pois o objeto é somente uma Classe Base");
        }
    }

    set cliente(novoValor) {
        if(novoValor instanceof Cliente) {
            this._cliente = novoValor;
        }
    }

    get cliente() {
        return this._cliente;
    }

    get saldo() {
        return this._saldo;
    }

    //método abstrato
    sacar(valor) {
        //let taxa = 1;
        //return this._sacar(valor, taxa);
        
        //sera especilizado por cada classe que herda a classe Conta
        throw new Error("O método sacar é abstrato");
    }

    _sacar(valor, taxa) {
        const valorSacado = taxa * valor;

        if(this._saldo >= valorSacado) {
            this._saldo -= valorSacado;
            return valorSacado;
        }

        return 0;
    }

    depositar(valor){
        if(valor <= 0)
        {
            return;
        } 
        this._saldo += valor;           
    }

    tranferir(valor, conta){
        const valorSacado = this.sacar(valor);
        conta.depositar(valorSacado);
    }

    teste() {
        console.log("Teste na classe Conta");
    }
}