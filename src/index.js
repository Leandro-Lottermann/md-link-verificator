import fs from "fs";
import chalk from "chalk";


function extraiLinks(texto) {
    const regex = /\[([^\[]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

    const capturas = [...texto.matchAll(regex)];
    
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))

    return resultados.length !== 0 ? resultados : "Não há links no arquivo"
}

function trtaErro(erro) {
    throw new Error(chalk.bgRed(erro.code, "Arquivo nao encontrado"))
}

//async/await
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = "utf-8";
    
        const texto = await fs.readFileSync(caminhoDoArquivo, encoding)
    
        return extraiLinks(texto)
    } catch (erro) {
        trtaErro(erro)
    } finally {
        console.log(chalk.bgGreen("Caminho encontrado..."))
    }
    

    
}




export default pegaArquivo;

// \[[^\[]*?\]
// \(https?:\/\/[^\s?#.].[^\s]*\)
// \[([^\[]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)