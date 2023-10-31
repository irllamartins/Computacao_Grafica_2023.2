import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import Grafico from "./Grafico"
import { AddAPhoto, Balance } from "@mui/icons-material"
import GeraImagem from "./GeraImagem"
import GeraMatriz from "./GeraMatriz"
import equalizacao, { frequencia } from "./Equalizacao"

const useStyles = makeStyles((theme: Theme) => ({
    imagemGrupo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "2%",
    }
}))

export interface ObjetoImagem {
    matriz: number[][],
    maximoCor: number
}

const Equalizacao = () => {
    const classes = useStyles()
    const [imagem, setImagem] = useState<number[][]>([])
    const [imagemTransfomada, setImagemTransfomada] = useState<number[][]>([])
    const [maximoCor, setMaximoCor] = useState<number>(0)
    const [success, setSuccess] = useState(false)


    return <Grid container direction="row" alignContent="center" alignItems="center">
        <Grid item sm={12} xl={12} p={2}>
            <Typography variant="h5" align="center">Equalização de imagem</Typography>
        </Grid>
        <Grid item container sm={6} direction="column" className={classes.imagemGrupo}>
            <Grid item >
                <input
                    accept=".pgm"
                    style={{ display: 'none' }}
                    id="imagem_1"
                    type="file"
                    onChange={e => {
                        GeraMatriz(e).then((matriz: ObjetoImagem) => {
                            setImagem(matriz.matriz)
                            setMaximoCor(matriz.maximoCor)
                            setSuccess(true)
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
                        sx={{ margin: "2%" }}>
                        Adicionar imagem
                    </Button>
                </label>
            </Grid>
            
            <Grid item>
                <GeraImagem matriz={imagem} altura={imagem[0]?.length || 1} largura={imagem?.length || 1} />
            </Grid>
        </Grid>
        <Grid item container sm={6} direction="column" className={classes.imagemGrupo}>
            <Grid item>
                <Button
                    variant="contained"
                    fullWidth
                    disabled={!success}
                    size="small"
                    startIcon={<Balance />}
                    sx={{ margin: "2%" }}
                    onClick={() => {
                        const resultado = equalizacao(imagem, maximoCor)
                        setImagemTransfomada(resultado.matriz)
                    }}>Equalizar</Button>
            </Grid>
            <Grid item>
                <GeraImagem matriz={imagemTransfomada} altura={imagemTransfomada[0]?.length || 1} largura={imagemTransfomada?.length || 1} />
            </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Grafico titulo={"Histograma imagem original"} dados={frequencia(imagem, maximoCor)} maximoCor={maximoCor} />
        </Grid>
        <Grid item xs={12} sm={6}>
            <Grafico titulo={"Histograma imagem tratada"} dados={frequencia(imagemTransfomada, maximoCor)} maximoCor={maximoCor} />
        </Grid>
    </Grid>
}
export default Equalizacao      