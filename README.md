# javascript-orientacao-a-objetos
Explorando a Orientação a Objetos no javascript

Porque utilizar interfaces e herança em javascript?


- Saber conceitos de Classes e Propriedades,
- Boas práticas na hora de declarar atributos
- Declarando sempre as propriedades como sendo privadas inicialmente
- Problemas de duplicação de código
- Problemas de código extremamente compartilhado

Extends e Super


Classe base

```
export class Conta { 
    constructor(saldoInicial, cliente, agencia) { 
        this._saldo = saldoInicial; 
        this._cliente = cliente; 
        this._agencia = agencia; 
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
    sacar(valor) { 
        if(this._saldo >= valor) { 
            this._saldo -= valor; 
            return valor; 
        } 
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
}
```

Classe ContaCorrente que herda de Conta

```
import { Conta } from "./Conta.js"; 
export class ContaCorrente extends Conta { 
    static numeroDeContas = 0; 
     
    constructor(cliente, agencia) { 
        super(0, cliente, agencia); 
        ContaCorrente.numeroDeContas += 1; 
    } 
}
```

Classe ContaPoupanca que herda de Conta

```
import { Conta } from "./Conta.js"; 
export class ContaPoupanca extends Conta  { 
    constructor(saldoInicial, cliente, agencia) { 
        super(saldoInicial, cliente, agencia); 
    } 
}
```

index.js

```
import { Cliente } from "./Cliente.js" 
import { ContaCorrente} from "./ContaCorrente.js" 
import { ContaPoupanca } from "./ContaPoupanca.js"; 
const cliente1 = new Cliente("Ricardo", 11122233309); 
const contaCorrenteRicardo = new ContaCorrente(cliente1, 1001); 
contaCorrenteRicardo.depositar(500); 
contaCorrenteRicardo.sacar(100); 
const contaPoupanca = new ContaPoupanca(50, cliente1, 1001); 
console.log(contaPoupanca); 
console.log(contaCorrenteRicardo);
```

- Para herdar o comportamento e propriedades de outra classe é necessário utilizar a palavra-chave extends
- A palavra-chave super é utilizada para inicializar o construtor da classe base.

Super e Sobrescrita


Classe base

```
export class Conta {
    ... 

    teste() {
        console.log("Teste na classe Conta");
    }
}
```

Classe filha

```
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
}
```

Privado e Protegido


Classe Pai

```
export class Conta {
    ... 

    sacar(valor) {
        let taxa = 1;
        return this._sacar(valor, taxa);
    }

    _sacar(valor, taxa) {
        const valorSacado = taxa * valor;

        if(this._saldo >= valorSacado) {
            this._saldo -= valorSacado;
            return valorSacado;
        }

        return 0;
    }


}
```

Classe Filha

```
import { Conta } from "./Conta.js";

export class ContaCorrente extends Conta {
    ... 

    //Protegido e Privado
    sacar(valor) {
        let taxa = 1.1;
        return this._sacar(valor, taxa);
        //ou
        //return super._sacar(valor, taxa);
    }
}
```

Propriedades do Construtor


Protegendo o construtor da classe base para que seja somente herdada e não instanciada

```
export class Conta {
    constructor(saldoInicial, cliente, agencia) {
        this._saldo = saldoInicial;
        this._cliente = cliente;
        this._agencia = agencia;

        console.log(this.constructor);
        if(this.constructor == Conta) {
            console.log("Você não deveria instanciar um objeto do tipo Conta, pois o objeto é somente uma Classe Base")
        }
    }

   ... 
}
```

Classes Abstratas


throw new Error

```
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

... 
}
```

- Não deve ser instância diretamente
- Deve ser utilizada somente para herança

Métodos das Classes Abstratas


Classe Base

```
export class Conta {
    ... 

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
    ... 


}
```

Classe Filha

```
import { Conta } from "./Conta.js";

export class ContaSalario extends Conta {
    constructor(cliente) {
        super(0, cliente, 100);
    }

    sacar(valor) {
        const taxa = 1.01;
        return this._sacar(valor, taxa);
    }
}
```

- Caso a classe filha não implemente o método abstrato será lançado erro.
- Como o javascript é uma linguagem interpretada portanto os erros só vai aparecer quando o programa está excutando, diferente das linguagens compiladas.
- Classes abstratas são pensadas de forma que elas apenas possam ser herdadas por outras, elas nos ajudam a criar abstrações no código e a compartilhar código entre outras classes
- Métodos abstratos devem ser sobrescritos pelas classes filhas. Dessa forma não faz sentido termos um método abstrato fora de uma classe abstrata. Tome esse cuidado quando for criar seu código.

Polimorfismo


O polimorfismo se aplica no conceito que diferentes classes sendo tratadas da mesma forma, possibilitando as classes de se transformar em várias formas.

Classe Base

```
export class Funcionario {
    constructor(nome, salario, cpf) {
        this._nome = nome;
        this._salario = salario;
        this._cpf = cpf;

        this._bonificacao = 1;
        this._senha;
    }

    get senha() {
        return this._senha;
    }

    cadastrarSenha(senha) {
        this._senha = senha;
    }
}
```

Classe especializada Diretor

```
import { Funcionario } from "./Funcionario.js";

export class Diretor extends Funcionario {
    constructor(nome, salario, cpf) {
        super(nome, salario, cpf);
        this._bonificacao = 2;
    }
}
```

Classe especialidade Gerente

```
import { Funcionario } from "./Funcionario.js";

export class Gerente extends Funcionario {
    constructor(nome, salario, cpf) {
        super(nome, salario, cpf);
        this._bonificacao = 1.1;
    }
}
```

Sistema de Autenticação

```
export class SistemaAutenticacao {
    static login(funcionario, senha) {
        return funcionario.senha == senha;
    }
}
```

index.js

```
import { Cliente } from "./Cliente.js"
import {Gerente} from "./Funcionarios/Gerente.js";
import {Diretor} from "./Funcionarios/Diretor.js";
import {SistemaAutenticacao} from './SistemaAutenticacao.js';

const diretor = new Diretor("Rodrigo", 10000, 12345678911);
diretor.cadastrarSenha("123456");

const gerente = new Gerente("Ricardo", 5000, 12345678912);
gerente.cadastrarSenha("654321");

const diretorLogado = SistemaAutenticacao.login(diretor, "123456");
console.log("Diretor está logado: " + diretorLogado);

const gerenteLogado = SistemaAutenticacao.login(gerente, "654321");
console.log("Gerente está logado: " + gerenteLogado);
```


Interfaces aplicando Polimorfismo


Aplicando o conceito do polimorfismo, toda classe que implementar o método autenticar poderá utilizar o sistema de autenticação, mesmo as classes não sendo da mesma classe base

```
export class SistemaAutenticacao {
    static login(autenticavel, senha) {
        return autenticavel.autenticar(senha);
    }
}
```

```
export class Cliente{
    nome;
    _cpf;

    get cpf(){
        return this._cpf;
    }

    constructor(nome, cpf, senha){
        this.nome = nome;
        this._cpf = cpf;
        this._senha = senha;
    }

    autenticar(senha) {
        return senha == this._senha;
    }
}
```

```
export class Funcionario {
    constructor(nome, salario, cpf) {
        this._nome = nome;
        this._salario = salario;
        this._cpf = cpf;

        this._bonificacao = 1;
        this._senha;
    }

    autenticar(senha) {
        return senha == this._senha;
    }

    cadastrarSenha(senha) {
        this._senha = senha;
    }
}
```

Verificando Propriedades e Tipos


Validar se chave e função existe dentro de um objeto

```
export class SistemaAutenticacao {
    static login(autenticavel, senha) {
        if(SistemaAutenticacao.isAutenticavel(autenticavel)) {
            return autenticavel.autenticar(senha);
        }

        return false;
    }

    //Valida se o objeto possui o método autenticar
    static isAutenticavel(autenticavel) {
       return "autenticar" in autenticavel 
       && autenticavel.autenticar instanceof Function;
    }
}
```

Como é possível que o Sistema de autenticação consiga receber diversos tipos de objetos por parâmetro e mesmo assim continuar funcionando?

- Isso é possível porque o JS não é uma linguagem fortemente tipada e por isso não depende apenas dos tipos pré-definidos mas sim se eles possuem ou não as propriedades que queremos utilizar,  assim não estamos limitados aos tipos e sim as interfaces que as classes expões.
- Através do polimorfismo o JS consegue tratar diferentes objetos de maneiras semelhantes e por isso conseguimos autenticar diferentes tipos de objetos em nosso sistema.  
- O Polimorfismo é uma ferramenta muito importante dentro das linguagens de programação, por isso é importante que você saiba como utilizá-lo

Ducky Type


É comum em linguagens interpretadas e fracamentes tipadas. 


