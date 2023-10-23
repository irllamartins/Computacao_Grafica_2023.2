import { useRef, useEffect, useState } from "react"

import readline from 'readline'
import { AddAPhoto, Cached, CloudUpload, ContactlessOutlined } from "@mui/icons-material"
import { Box, Button, CircularProgress, Grid, IconButton, Input, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import sharp from "sharp"
import GeraImagem from "./GeraImagem"
import _, { forEach } from 'lodash';
import GeraMatriz from "./GeraMatriz"
import Operacao, { aplicacaoMascaraMediana } from "./Operacao"
import { green } from "@mui/material/colors"

const Transformacoes: { [key: string]: any[][] } = {
    "Media": [[0.111, 0.111, 0.111], [0.111, 0.111, 0.111], [0.111, 0.111, 0.111]],
    "Mediana": [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]],
    "Alto Reforco": [[-1, -1, -1], [-1,"x", -1], [-1, -1, -1]],
    "Passa Alta Basica": [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]],
    "Robert X": [[0, 0, 0], [0, 1, 0], [0, -1, 0]],
    "Robert Y": [[0, 0, 0], [0, 1, -1], [0, 0, 0]],
    "Robert Cruzado x": [[0, 0, 0], [0, 1, 0], [0, 0, -1]],
    "Robert Cruzado Y": [[0, 0, 0], [0, 0, 1], [0, -1, 0]],
    "Prewitt X": [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
    "Prewitt Y": [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]],
    "Sobel X": [[-1, -2, -1], [0, 0, 0], [1, 2, 1]],
    "Sobel Y": [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]],
}
enum TiposTransformacao {
    MEDIA = "Media",
    MEDIANA = "Mediana",
    ALTO_REFORCO = "Alto Reforco",
    PASSA_ALTA_BASICA = "Passa Alta Basica",
    ROBERT_X = "Robert X",
    ROBERT_Y = "Robert Y",
    ROBERT_CRUZADO_X = "Robert Cruzado X",
    ROBERT_CRUZADO_Y = "Robert Cruzado Y",
    PREWITT_X = "Prewitt X",
    PREWITT_Y = "Prewitt Y",
    SOBEL_X = "Sobel X",
    SOBEL_Y = "Sobel Y",

}


const Container = () => {
    const [imagem, setImagem] = useState<number[][]>([])
    const [imagemTransformada, setImagemTransformada] = useState<number[][]>([])
    const [opcao, setOpcao] = useState<string>(TiposTransformacao.MEDIA)
    const [reforco, setReforco] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const timer = useRef<number>();

    const calcular = (label: any) => {
        switch (label) {
            case TiposTransformacao.MEDIA:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.MEDIA]))
                break
            case TiposTransformacao.MEDIANA:
                setImagemTransformada(aplicacaoMascaraMediana(imagem))
                break
            case TiposTransformacao.PASSA_ALTA_BASICA:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.PASSA_ALTA_BASICA]))
                break
            case TiposTransformacao.ROBERT_X:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.ROBERT_X]))
                break
            case TiposTransformacao.ROBERT_Y:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.ROBERT_Y]))
                break
            case TiposTransformacao.ROBERT_CRUZADO_X:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.ROBERT_CRUZADO_X]))
                break
            case TiposTransformacao.ROBERT_CRUZADO_Y:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.ROBERT_CRUZADO_Y]))
                break
            case TiposTransformacao.PREWITT_X:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.PREWITT_X]))
                break
            case TiposTransformacao.PREWITT_Y:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.PREWITT_Y]))
                break
            case TiposTransformacao.SOBEL_X:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.SOBEL_X]))
                break
            case TiposTransformacao.SOBEL_Y:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.SOBEL_Y]))
                break
            case TiposTransformacao.ALTO_REFORCO:
                const novaMatriz = Transformacoes[TiposTransformacao.ALTO_REFORCO]
                novaMatriz[1][1] = Math.round((reforco * 9) - 1)
                console.log(novaMatriz)
                setImagemTransformada(Operacao(imagem, novaMatriz))
                break
            default:
                return "Operação não selecionada"
        }
    }


    /* const processarArquivo = (event: any) => {
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
             setLargura(parseInt(largura, 10))
             setAltura(parseInt(altura, 10))
 
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
             setImagem(imagem)
             adicionarBorda(imagem)
         }
         reader.readAsText(arquivo)
 
     }
     const adicionarBorda = (matriz: number[][]) => {
         const cloneMatriz =_.cloneDeep(matriz)
         // Adiciona zeros no início e no final de cada linha
         for (let i = 0; i < cloneMatriz?.length; i++) {
             cloneMatriz[i].unshift(0);
             cloneMatriz[i].push(0);
         }
 
         // Cria uma linha de zeros
         let linhaZeros = Array(cloneMatriz[0]?.length).fill(0);
 
         // Adiciona a linha de zeros no início e no final da matriz
         cloneMatriz.unshift(linhaZeros);
         cloneMatriz.push([...linhaZeros]);
         console.log(matriz)
         setImagemTransformada(cloneMatriz)
     }
 */
    return <Grid container>
        <Grid item container sm={5} sx={{ direction: "row", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Grid item sm={6}>
                <input
                    accept=".pgm"
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    type="file"
                    onChange={e => {
                        GeraMatriz(e).then(matriz => {
                            setImagem(matriz as number[][])
                        }).catch(error => {
                            console.error(error)
                        })
                    }
                    }
                />
                <label htmlFor="contained-button-file">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        fullWidth
                        size="small"
                        startIcon={<AddAPhoto />}
                        sx={{ margin: "1%" }}>
                        Adicionar imagem
                    </Button>
                </label>

                <GeraImagem matriz={imagem} altura={imagem[0]?.length || 1} largura={imagem?.length || 1} />
            </Grid>
        </Grid>
        <Grid item sm={2}>
            <TextField
                inputProps={{ style: { textAlign: 'center' } }}
                select
                size="small"
                fullWidth
                label="Tipo de transformações"
                variant="standard"
                value={opcao}
            >
                {
                    Object.values(TiposTransformacao).map(tipo => {
                        return <MenuItem
                            key={`menu_item_${tipo}`}
                            value={tipo}
                            onClick={() => setOpcao(tipo)}>
                            {tipo}
                        </MenuItem>
                    })
                }
            </TextField>
            <TableContainer >
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={3}>
                                Matriz Transformadora
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {opcao && Transformacoes[opcao].map((linha: number[], index: number) => (
                            <TableRow key={index}>
                                <TableCell>{linha[0]}</TableCell>
                                <TableCell>{linha[1]}</TableCell>
                                <TableCell>{linha[2]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                opcao === TiposTransformacao.ALTO_REFORCO ?
                    <TextField id="reforco"
                        label="Grau do reforco"
                        value={reforco}
                        type="number"
                        size="small"
                        variant="standard"
                        onChange={e => setReforco(parseInt(e.target.value, 10))}
                    /> : undefined
            }
            <Button
                id="transformar"
                variant="contained"
                size="small"
                fullWidth
                disabled={loading}
                onClick={() => {
                    calcular(opcao)
                    if (!loading) {
                        setSuccess(false);
                        setLoading(true);
                        timer.current = window.setTimeout(() => {
                            setSuccess(true);
                            setLoading(false);
                        }, 2000);
                    }
                }}
                startIcon={<Cached />}>
                Transformar

                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            position: 'absolute',
                            left: '45%',
                        }}
                    />
                )}
            </Button>
        </Grid>
        <Grid item sm={5} sx={{ direction: "row", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GeraImagem matriz={imagemTransformada} altura={imagemTransformada[0]?.length || 1} largura={imagemTransformada?.length || 1} />
        </Grid>
    </Grid>


}
export default Container