import { useRef, useEffect, useState } from "react"

import readline from 'readline'
import { AddAPhoto, Cached, CloudUpload, ContactlessOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, Input, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import sharp from "sharp"
import { ObjetoImagem } from "../operacao.imagem/Container"




const GeraMatriz = (event: any): Promise<ObjetoImagem> => {
    // const [imagemTransformada, setImagemTransformada] = useState<number[][]>([])
    return new Promise((resolve, reject) => {
        let matriz: number[][] = []
        // capturar o arquivo
        const arquivo = event.target.files[0]

        // cria um arquivo
        const reader = new FileReader()

        reader.onload = (event: any) => {

            // capturou o arquivo como string
            const data = event.target.result

            // separou o tipo do arquivo, medições e o resto por quebra de linha
            const linhas = data.split('\n')

            // tipo da imagem P2(preto e branco)
            const tipo = linhas[0]

            // capturou medições
            const [largura, altura] = linhas[1].split(' ').map(Number)

            // o maximo da cor
            const valorMaximoCor = Number(linhas[2])

            // Com slice ler o quarto elemento ate o final e transforma para um array
            const dadosImagem = linhas.slice(3).join(' ').split(' ').map(Number)

            // cria a matriz
            let imagem = [];
            for (let i = 0; i < altura; i++) {
                let linhaImagem = [];
                for (let j = 0; j < largura; j++) {
                    linhaImagem.push(dadosImagem[i * largura + j])
                }
                imagem.push(linhaImagem)
            }

            //  matriz = adicionarBorda(imagem)
            // console.log( matriz )
            resolve({ matriz: imagem, maximoCor: valorMaximoCor })

        }

        reader.onerror = (error) => {
            reject(error);  // Rejeita a promise com o erro
        }

        reader.readAsText(arquivo)
    })
}
export default GeraMatriz