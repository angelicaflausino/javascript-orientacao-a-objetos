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