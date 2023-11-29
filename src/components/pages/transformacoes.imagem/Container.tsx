import { Alert, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useEffect, useState } from "react"
import Grafico from "./Grafico"
import { AddAPhoto,  FlipCameraAndroidOutlined } from "@mui/icons-material"
import GeraImagem from "./GeraImagem"
import GeraMatriz from "./GeraMatriz"
import { dinamica, gamma, intencidadeGeral, linear, logaritmo, negativo } from "./Operacao"
import Frequencia from "./Frequencia"

const useStyles = makeStyles((theme: Theme) => ({
    imagemGrupo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "2%",
    },
    espacamento: {
        padding: "2%"
    }
}))
const Info: { [key: string]: string } = {
    "Linear": "y = ax + b: O 'a' ajusta o contraste e o 'b' o brilho",
    "Logaritma": "y = a*log(cinza + 1): Realça areas escuras da imagem",
    "Intecidade geral": "Realçar ou suavizar a imagem. F(r)=255 * (1 / (1 + e^(((r - w) / sigma) * -1)))).Por padrão o w = media e sigma = desvio padrão, mas é editável.",
    "Negativo": "O negativo da imagem. S = maximoCinza - cinza",
    "Gamma": "S= cr^y. O C=variavel que controla o brilho e o 0< Y <1",
    "Faixa dinamica": "Redistribui a nova faixa que a imagem vai ficar. F(cinza) = (cinza -minimoCinza)/(maximoCinza-minimoCinza). Escurece a imagem"
}
enum AlgoritimosTipos {
    LINEAR = "Linear",
    NEGATIVO = "Negativo",
    LOGARITMICA = "Logaritma",
    INTENCIDADE_GERAL = "Intecidade geral",
    GAMMA = "Gamma",
    FAIXA_DINAMICA = "Faixa dinamica"
}
export interface ObjetoImagem {
    matriz: number[][],
    maximoCor: number
}

const TransfomacaoImagem = () => {
    const classes = useStyles()
    const [tipoTransfomacao, setTipoTransfomacao] = useState<string>("")
    const [imagem, setImagem] = useState<number[][]>([])
    const [imagemTransfomada, setImagemTransfomada] = useState<number[][]>([])
    const [maximoCor, setMaximoCor] = useState<number>(0)
    const [success, setSuccess] = useState(false)
    const [entrada1, setEntrada1] = useState<number>(1)
    const [entrada2, setEntrada2] = useState<number>(0)

    const tratamentoEntrada = (texto: any, setEntrada: any) => {
        if (texto === "") {
            setEntrada(0);
        } else {
            setEntrada(parseFloat(texto.replace(/[a-zA-Z]/g, '').replace(/,/g, '.')))
        }
    }
   
    useEffect(() => {  
          
        if (tipoTransfomacao === AlgoritimosTipos.INTENCIDADE_GERAL) {
            const n = imagem.flat().length
            const media = imagem.length > 0 ? Math.round(imagem.flat().reduce((a, b) => a + b) / n ): 0
            const desvioPadrao = imagem.length > 0 ? Math.round(Math.sqrt(imagem.flat().map(x => Math.pow(x - media, 2)).reduce((a, b) => a + b) / n)) : 0
           
            setEntrada1(media)
            setEntrada2(desvioPadrao)
        }
    }, [tipoTransfomacao])   

    const entradas = (tipo: string) => {
        switch (tipo) {
            case AlgoritimosTipos.LOGARITMICA:
                return <>
                    <Grid item sm={12} className={classes.espacamento}>
                        <TextField
                            id=""
                            variant="standard"
                            label="O 'A' da equação"
                            size="small"
                            fullWidth
                            value={entrada1}
                            onChange={(e) => setEntrada1(Number(e.target.value))} />
                    </Grid>
                </>
            case AlgoritimosTipos.LINEAR:
                return <>
                    <Grid item sm={6} className={classes.espacamento}>
                        <TextField
                            id=""
                            variant="standard"
                            label="O 'A' da equação"
                            size="small"
                            fullWidth
                            value={entrada1}
                            onChange={(e) => tratamentoEntrada(e.target.value, setEntrada1)} />
                    </Grid>
                    <Grid item sm={6} className={classes.espacamento}>
                        <TextField
                            id=""
                            variant="standard"
                            label="O 'B' da equação"
                            size="small"
                            fullWidth
                            value={entrada2}
                            onChange={(e) => tratamentoEntrada(e.target.value, setEntrada2)} />
                    </Grid>
                </>
            case AlgoritimosTipos.INTENCIDADE_GERAL:
                // valorPadraoIntencidade()
                return <>
                    <Grid item sm={6} className={classes.espacamento}>
                        <TextField
                            id=""
                            variant="standard"
                            label="Largura dos valores cinza(W)"
                            size="small"
                            fullWidth
                            value={entrada1}
                            onChange={(e) => tratamentoEntrada(e.target.value, setEntrada1)} />
                    </Grid>
                    <Grid item sm={6} className={classes.espacamento}>
                        <TextField
                            id=""
                            variant="standard"
                            label="Largura dos valores cinza(sigma)"
                            size="small"
                            fullWidth
                            value={entrada2}
                            onChange={(e) => tratamentoEntrada(e.target.value, setEntrada2)} />
                    </Grid>
                </>
            case AlgoritimosTipos.GAMMA:
                return <>
                    <Grid item sm={12} className={classes.espacamento}>
                        <TextField
                            id=""
                            variant="standard"
                            label="O 'C' da equação"
                            size="small"
                            fullWidth
                            value={entrada1}
                            onChange={(e) => tratamentoEntrada(e.target.value, setEntrada1)} />
                    </Grid>
                    <Grid item sm={12} className={classes.espacamento}>
                        <TextField
                            id=""
                            variant="standard"
                            label="O 'Y' da equação"
                            size="small"
                            fullWidth
                            value={entrada2}
                            onChange={(e) => tratamentoEntrada(e.target.value, setEntrada2)} />
                    </Grid>
                </>
            case AlgoritimosTipos.FAIXA_DINAMICA:
                return <>
                    <Grid item sm={12} className={classes.espacamento}>
                        <TextField
                            id=""
                            variant="standard"
                            label="A faixa desejada"
                            size="small"
                            fullWidth
                            value={entrada1}
                            onChange={(e) => tratamentoEntrada(e.target.value, setEntrada1)} />
                    </Grid>
                </>
        }
    }
    const calcular = (tipo: string, matriz: number[][], variavel1: number, variavel2: number) => {
        switch (tipo) {
            case AlgoritimosTipos.LOGARITMICA:
                setImagemTransfomada(logaritmo(matriz, variavel1))
                break
            case AlgoritimosTipos.LINEAR:
                setImagemTransfomada(linear(matriz, variavel1, variavel2))
                break
            case AlgoritimosTipos.NEGATIVO:
                setImagemTransfomada(negativo(matriz))
                break
            case AlgoritimosTipos.INTENCIDADE_GERAL:
                setImagemTransfomada(intencidadeGeral(matriz, variavel1, variavel2))
                break
            case AlgoritimosTipos.GAMMA:
                setImagemTransfomada(gamma(matriz, variavel1, variavel2))
                break
            case AlgoritimosTipos.FAIXA_DINAMICA:
                setImagemTransfomada(dinamica(matriz, variavel1))
                break
        }
    }
    return <Grid container direction="row"  >
        <Grid item sm={12} xl={12} p={2}>
            <Typography variant="h5" align="center">Transformações de imagem</Typography>
        </Grid>

        <Grid item sm={8} container direction="row" >
            <Grid item sm={4} p={1}>
                <GeraImagem matriz={imagem} altura={imagem[0]?.length || 1} largura={imagem?.length || 1} />
            </Grid>
            <Grid item sm={8}>
                <Grafico titulo={"Histograma imagem original"} dados={Frequencia(imagem, maximoCor)} maximoCor={maximoCor} />
            </Grid>
            <Grid item container direction="row">
                <Grid item sm={4} p={1}>
                    <GeraImagem matriz={imagemTransfomada} altura={imagemTransfomada[0]?.length || 1} largura={imagemTransfomada?.length || 1} />
                </Grid>
                <Grid item sm={8}>
                    <Grafico titulo={"Histograma imagem tratada"} dados={Frequencia(imagemTransfomada, maximoCor)} maximoCor={maximoCor} />
                </Grid>
            </Grid>
        </Grid>
        <Grid item sm={4} xl={4} p={2}>
            <Grid item sm={12}>
                <FormControl >
                    <FormLabel >Tipo de Transformação</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="algoritmo-label"
                        name="algoritmo-group"
                        value={tipoTransfomacao}
                        onChange={e => setTipoTransfomacao(e.target.value)}
                    >
                        {
                            Object.values(AlgoritimosTipos).map((item, index) =>
                                <FormControlLabel key={index} value={item} control={<Radio />} label={item} />
                            )
                        }
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item sm={12} >
                {tipoTransfomacao && <Alert severity="info">{Info[tipoTransfomacao]}</Alert>}
            </Grid>
            <Grid item container sm={12} direction="row">
                {entradas(tipoTransfomacao)}
            </Grid>
            <Grid item container  >
                <Grid item sm={6} p={1}>
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
                            sx={{ padding: "4%" }}
                        >
                            Adicionar imagem
                        </Button>
                    </label>
                </Grid>
                <Grid item sm={6} p={1}>
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        fullWidth
                        size="small"
                        startIcon={<FlipCameraAndroidOutlined />}
                        sx={{ padding: "4%" }}
                        disabled={!success}
                        onClick={() => {
                            calcular(tipoTransfomacao, imagem, entrada1 || 0, entrada2 || 0)
                            setSuccess(true)
                        }}>
                        Transfomar img
                    </Button>
                </Grid>
            </Grid>

        </Grid>
    </Grid>
}
export default TransfomacaoImagem