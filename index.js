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

const cliente = new Cliente("Lais", 14785236911, "741852");
const clienteEstaLogado = SistemaAutenticacao.login(cliente, "741852");
console.log("Cliente está logado: " + clienteEstaLogado);