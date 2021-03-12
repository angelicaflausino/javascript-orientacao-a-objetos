import { Conta } from "./Conta.js";

export class ContaCorrente extends Conta {
    static numeroDeContas = 0;
    
    constructor(cliente, agencia) {
        super(0, cliente, agencia);
        ContaCorrente.numeroDeContas += 1;
    }

    //Primeiro irá chamar o método na classe pai e depois executar o método na classe filho
    teste() {
        super.teste();
        console.log("Teste na classe ContaCorrente");
    }

    //Protegido e Privado
    sacar(valor) {
        let taxa = 1.1;
        return this._sacar(valor, taxa);
        //ou
        //return super._sacar(valor, taxa);
    }
}
