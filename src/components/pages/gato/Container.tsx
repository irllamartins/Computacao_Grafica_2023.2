import { Alert, Button,  Grid, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import GeraMatriz from "./GeraMatriz"
import GeraImagem from "./GeraImagem"
import { AddAPhoto, AutoFixHigh } from "@mui/icons-material"
import { arnoldCat, arraysAreEqual } from "./Operacao"

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

const Gato = () => {
    const classes = useStyles()
    const [imagem, setImagem] = useState<number[][]>([])
    const [imagemTransfomada, setImagemTransfomada] = useState<number[][]>([])
    const [success, setSuccess] = useState(false)
    const [quantidade, setQuantidade] = useState(0)

    return <Grid container direction="row" alignContent="center" alignItems="center">
        <Grid item sm={12} xl={12} p={2}>
            <Typography variant="h5" align="center">Gato de Arnold</Typography>
        </Grid>
        <Grid item sm={12} xl={12} p={2}>
            <Alert severity="info">Funciona para imagem de escala de cinza e com a altura e largura do mesmo tamanho.
             <strong>Teoria do caos</strong></Alert>
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
                            setImagemTransfomada(matriz.matriz)
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
                    startIcon={<AutoFixHigh />}
                    sx={{ margin: "2%" }}
                    onClick={() => {
                        setQuantidade(0)
                        let intervalId = setInterval(() => {
                            setSuccess(false)
                            setImagemTransfomada((imagemTransfomadaAnterior: number[][]) => {
                                const resultado = arnoldCat(imagemTransfomadaAnterior)
                                if (arraysAreEqual(resultado.flat(), imagem.flat())) {
                                    setSuccess(true)
                                    clearInterval(intervalId)
                                }
                               
                                setQuantidade(
                                    (anterior) =>{ 
                                        console.log(anterior)
                                        return anterior+1
                                    })
                                return resultado
                            });

                        }, 800)
                       
                    }}>Executar</Button>
            </Grid>
            <Grid item >
                <GeraImagem matriz={imagemTransfomada} altura={imagemTransfomada[0]?.length || 1} largura={imagemTransfomada?.length || 1} />
            </Grid>

        </Grid>
        <Grid item sm={12} md={12} xs={12}>
            {/*<Typography align="center">Quantidade de execução: {quantidade}</Typography>*/}
        </Grid>
    </Grid>
}
export default Gato