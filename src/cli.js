import listaValidada from "./http-validacao.js";
import pegaArquivo from "./index.js";
import fs from "fs";
import chalk from "chalk";

const caminho = process.argv;



async function imprimeLista(valida, resultado, identificador = '') {
    if (valida) {
        console.log(
            chalk.yellow('lista validada'),
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado));
    } else {
        console.log(chalk.yellow("Lista de Links;"), chalk.bgWhiteBright(nomeArquivo), resultado)
    }
}

async function processatexto (argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === "--valida"
    
    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if(erro.code === "ENOENT") {
            console.log("Arquivo ou diretório nao existe")
            return //cancelo a exebicao do erro completo
        }
    }
    if(fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(caminho)
        imprimeLista(valida, resultado)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (arquivo) => {
            const lista = await pegaArquivo(`${caminho}/${arquivo}`)
            imprimeLista(valida, lista, arquivo)
        })
    }


}

processatexto(caminho)