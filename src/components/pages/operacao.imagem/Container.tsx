import { useRef, useState } from "react"

import { AddAPhoto, Cached } from "@mui/icons-material"
import {
    Button,
    CircularProgress,
    Grid, MenuItem,
    TextField,
    Theme,
    Typography
} from "@mui/material"
import GeraImagem from "./GeraImagem"
import _, { forEach } from 'lodash';
import GeraMatriz from "./GeraMatriz"
import { adicao, and, divisao, multiplicacao, or, subtracao, xor } from "./Operacao"
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme: Theme) => ({
    imagemGrupo: {       
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin:"2%",   
    }
}))

enum TiposTransformacao {
    ADICAO = "Adição",
    SUBTRACAO = "Subtração",
    MULTIPLICACAO = "Multiplicação",
    DIVISAO = "Divisão",
    XOR = "Xor",
    AND = "And",
    OR = "Or",

}
export interface ObjetoImagem {
    matriz: number[][],
    maximoCor: number
}

const Container = () => {
    const classes = useStyles()

    const [imagem1, setImagem1] = useState<number[][]>([])
    const [imagem2, setImagem2] = useState<number[][]>([])
    const [maximoCor, setMaximoCor] = useState<number>(0)
    const [imagemTransformada, setImagemTransformada] = useState<number[][]>([])
    const [opcao, setOpcao] = useState<string>(TiposTransformacao.ADICAO)
    const [success, setSuccess] = useState({ imagem1: false, imagem2: false })
    const timer = useRef<number>();

    const calcular = (label: any) => {
        switch (label) {
            case TiposTransformacao.ADICAO:
                setImagemTransformada(adicao(imagem1, imagem2, maximoCor))
                break
            case TiposTransformacao.SUBTRACAO:
                setImagemTransformada(subtracao(imagem1, imagem2, maximoCor))
                break
            case TiposTransformacao.MULTIPLICACAO:
                setImagemTransformada(multiplicacao(imagem1, imagem2, maximoCor))
                break
            case TiposTransformacao.DIVISAO:
                setImagemTransformada(divisao(imagem1, imagem2, maximoCor))
                break
            case TiposTransformacao.AND:
                setImagemTransformada(and(imagem1, imagem2, maximoCor))
                break
            case TiposTransformacao.OR:
                setImagemTransformada(or(imagem1, imagem2, maximoCor))
                break
            case TiposTransformacao.XOR:
                setImagemTransformada(xor(imagem1, imagem2, maximoCor))
                break
            default:
                return "Operação não selecionada"
        }
    }
    return <Grid container>
        <Grid item sm={12} xl={12} p={2}>
            <Typography variant="h5" align="center">Operações com imagem</Typography>
        </Grid>
        <Grid item container sm={3} className={classes.imagemGrupo}>
            <Grid item >
                <input
                    accept=".pgm"
                    style={{ display: 'none' }}
                    id="imagem_1"
                    type="file"
                    onChange={e => {
                        GeraMatriz(e).then((matriz: ObjetoImagem) => {
                            setImagem1(matriz.matriz)
                            setMaximoCor(matriz.maximoCor)
                            setSuccess({ ...success, imagem1: true })
                        }).catch(error => {
                            console.error(error)
                        })
                    }
                    }
                />
                <label htmlFor="imagem_1">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        fullWidth
                        size="small"
                        startIcon={<AddAPhoto />}
                        sx={{ margin: "1%" }}>
                        Adicionar imagem 1
                    </Button>
                </label>
            </Grid>
            <Grid item>
                <GeraImagem matriz={imagem1} altura={imagem1[0]?.length || 1} largura={imagem1?.length || 1} />
            </Grid>
        </Grid>
        <Grid item container sm={3} className={classes.imagemGrupo}>
            <Grid item>
                <input
                    accept=".pgm"
                    style={{ display: 'none' }}
                    id="imagem_2"
                    type="file"
                    onChange={e => {
                        GeraMatriz(e).then(matriz => {
                            setImagem2(matriz.matriz as number[][])
                            setSuccess({ ...success, imagem2: true })
                        }).catch(error => {
                            console.error(error)
                        })
                    }
                    }
                />
                <label htmlFor="imagem_2">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        fullWidth
                        size="small"
                        startIcon={<AddAPhoto />}
                        sx={{ margin: "1%" }}>
                        Adicionar imagem 2
                    </Button>
                </label>
            </Grid>
            <Grid item>
                <GeraImagem matriz={imagem2} altura={imagem2[0]?.length || 1} largura={imagem2?.length || 1} />
            </Grid>
        </Grid>
        <Grid item sm={2} sx={{ alignSelf: "center", justifySelf: "center" }}>
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

            <Button
                id="transformar"
                variant="contained"
                size="small"
                fullWidth
                disabled={!(success.imagem1 && success.imagem2)}
                onClick={() => {
                    calcular(opcao)
                }}
                startIcon={<Cached />}>
                Transformar

                {!(success.imagem1 === success.imagem2) && (
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
        <Grid item sm={3} sx={{ direction: "row", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GeraImagem matriz={imagemTransformada} altura={imagemTransformada[0]?.length || 1} largura={imagemTransformada?.length || 1} />
        </Grid>
    </Grid>


}
export default Container