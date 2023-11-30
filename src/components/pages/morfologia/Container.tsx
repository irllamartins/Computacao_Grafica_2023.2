import { Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState, useEffect } from "react"
import { AddAPhoto, Balance, ContactSupportOutlined } from "@mui/icons-material"
import GeraImagem from "./GeraImagem"
import GeraMatriz from "./GeraMatriz"
import { Operacao, aberturaImagem, aplicacaoMascaraBinaria, dilatarImagem, erodirImagem, transfomarBinario } from "./Operacao"

const useStyles = makeStyles((theme: Theme) => ({
    imagemGrupo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "2%",
    },
    campos: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2px"
    }
}))

export interface ObjetoImagem {
    matriz: number[][],
    maximoCor: number
}
export const Formato = {
    CINZA: "Tons de cinza",
    BINARIA: "Binaria",
}
enum TiposTransformacaoBinaria {
    DILATACAO = "Dilatação",
    EROSAO = "Erosão",
    ABERTURA = "Abertura",
    FECHAMENTO = "Fechamento",
    HITMISS = "Hit-Or-Miss",
    CONTORNOEXTERNO = "Contorno externo",
    CONTORNOINTERNO = "Contorno interno",
    GRADIENTE = "Gradiente"
}
enum TiposTransformacaoCinza {
    DILATACAO = "Dilatação",
    EROSAO = "Erosão",
    ABERTURA = "Abertura",
    FECHAMENTO = "Fechamento",
    CONTORNOEXTERNO = "Contorno externo",
    CONTORNOINTERNO = "Contorno interno",
    GRADIENTE = "Gradiente",
    TOPHAT = "Top-Hat",
    BOTTOMHAT = "Bottom-Hat"
}




const Morfologia = () => {
    const classes = useStyles()
    const [imagem, setImagem] = useState<number[][]>([])
    const [imagemBinaria, setImagemBinaria] = useState<number[][]>([])
    const [imagemTransfomada, setImagemTransformada] = useState<number[][]>([])
    const [success, setSuccess] = useState(false)
    const [forma, setForma] = useState("Tons de cinza")
    const [opcao, setOpcao] = useState<string>("")
    const [elementoEstruturante, setElementoEstruturante] = useState(Array(3).fill(null).map(() => Array(3).fill(0)))
    const [pixelAtivo, setPixelAtivo] = useState(Array(2).fill(0));

    const atuallizarElementoEstruturante = (e: any, i: number, j: number) => {
        const novoElementoEstruturante = [...elementoEstruturante];
        novoElementoEstruturante[i][j] = Number(e.target.value);
        setElementoEstruturante(novoElementoEstruturante);
        console.log("elementoEstruturante", elementoEstruturante)
    }
    const atualizarPixelAtivo = (e: any, i: number) => {
        const novoPixelAtivo = [...pixelAtivo];
        novoPixelAtivo[i] = Number(e.target.value);
        setPixelAtivo(novoPixelAtivo);
        console.log("novopixelAtivo", novoPixelAtivo)
    }
    const calcular = (label: any) => {

        switch (label) {
            case TiposTransformacaoBinaria.DILATACAO:
                console.log("imagem", imagemBinaria)
                const t = dilatarImagem(/*Operacao(*/imagemBinaria/*)*/, elementoEstruturante)
                console.log("t", t)
                setImagemTransformada(t)
                break
            case TiposTransformacaoBinaria.EROSAO:
             //   console.log("imagem", imagemBinaria)
                const erodida = erodirImagem(/*Operacao(*/imagemBinaria/*)*/, elementoEstruturante)
                console.log("t", erodida )
                setImagemTransformada(erodida )
                break
            case TiposTransformacaoBinaria.ABERTURA:
                const abertura = aberturaImagem(/*Operacao(*/imagemBinaria/*)*/, elementoEstruturante)
                console.log("t", abertura )
                setImagemTransformada(abertura )
                break
            case TiposTransformacaoBinaria.FECHAMENTO:
                break
            case TiposTransformacaoBinaria.CONTORNOEXTERNO:
                break
            case TiposTransformacaoBinaria.CONTORNOINTERNO:
                break
            case TiposTransformacaoBinaria.GRADIENTE:
                break
            case TiposTransformacaoBinaria.HITMISS:
                break
            case TiposTransformacaoBinaria.DILATACAO:
                break
            case TiposTransformacaoCinza.EROSAO:
                break
            case TiposTransformacaoCinza.ABERTURA:
                break
            case TiposTransformacaoCinza.FECHAMENTO:
                break
            case TiposTransformacaoCinza.CONTORNOEXTERNO:
                break
            case TiposTransformacaoCinza.CONTORNOINTERNO:
                break
            case TiposTransformacaoCinza.GRADIENTE:
                break
            case TiposTransformacaoCinza.TOPHAT:
                break;
            case TiposTransformacaoCinza.BOTTOMHAT:
                break
            default:
                return "Operação não selecionada"
        }
    }

    return <Grid container direction="row" alignContent="center" alignItems="center">
        <Grid item sm={12} xl={12} p={2}>
            <Typography variant="h5" align="center">Morfologia</Typography>
        </Grid>
        <Grid item container sm={4} direction="column" className={classes.imagemGrupo}>
            <Grid item >
                <input
                    accept=".pgm"
                    style={{ display: 'none' }}
                    id="imagem_1"
                    type="file"
                    onChange={e => {
                        GeraMatriz(e).then((matriz: ObjetoImagem) => {
                            console.log("upload!", matriz)
                            setImagem(matriz.matriz)
                            setImagemBinaria(transfomarBinario(matriz.matriz, matriz.maximoCor))

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
                        Selecionar imagem
                    </Button>
                </label>
            </Grid>

            <Grid item>
                <GeraImagem matriz={imagem} altura={imagem[0]?.length || 1} largura={imagem?.length || 1} />
            </Grid>
            <Grid item>
                <GeraImagem matriz={imagemBinaria} altura={imagemBinaria[0]?.length || 1} largura={imagemBinaria?.length || 1} />
            </Grid>
        </Grid>
        <Grid item container sm={4} direction="column" className={classes.imagemGrupo}>
            <Grid item>
                <FormControl >
                    <FormLabel >Operação em:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="Forma-label"
                        name="Forma-group"
                        value={forma}
                        onChange={e => setForma(e.target.value)}
                    >
                        {
                            Object.values(Formato).map((item, index) =>
                                <FormControlLabel key={index} value={item} control={<Radio />} label={item} />
                            )
                        }
                    </RadioGroup>
                </FormControl>

            </Grid>
            <Grid container item direction="row">
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
                        Object.values(forma === Formato.CINZA ? TiposTransformacaoCinza : TiposTransformacaoBinaria).map(tipo => {
                            return <MenuItem
                                key={`menu_item_${tipo}`}
                                value={tipo}
                                onClick={() => setOpcao(tipo)}>
                                {tipo}
                            </MenuItem>
                        })
                    }
                </TextField>
            </Grid>
            <Grid container item direction="row" className={classes.campos}>
                <Typography variant="body2" align="center">Elemento Estruturante</Typography>
                {elementoEstruturante.map((linha, i) => (
                    <Grid container item key={i} className={classes.campos}>
                        {linha.map((elemento: number, j: number) => (
                            <Grid item key={j} className={classes.campos}>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    style={{ width: '50px', backgroundColor: (pixelAtivo[0] === i && pixelAtivo[1] === j) ? 'red' : 'white' }}
                                    value={elemento}
                                    onChange={(e) => atuallizarElementoEstruturante(e, i, j)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
            <Grid container item direction="row" className={classes.campos}>
                <Typography variant="body2" align="center">Pixel ativo(lxc)</Typography>
                {pixelAtivo.map((linha, i) => (
                    <Grid item key={i} className={classes.campos}>
                        <TextField
                            variant="outlined"
                            size="small"
                            style={{ width: '50px' }}
                            value={linha}
                            onChange={(e) => atualizarPixelAtivo(e, i)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>

        <Grid item container sm={4} direction="column" className={classes.imagemGrupo}>

            <Grid item>
                <Button
                    variant="contained"
                    fullWidth
                    disabled={ imagem.length === 0}
                    size="small"
                    startIcon={<Balance />}
                    sx={{ margin: "2%" }}
                    onClick={() => {
                        if (opcao!=="") {
                            setSuccess(true)
                       //     console.log("loading",success)
                            calcular(opcao)
                            setSuccess(false)
                        //    console.log("loadingF",success)
                        }
                    }}
                >Operar
                    {success && (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute',
                                left: '45%',
                            }}
                        />
                    )}</Button>
            </Grid>
            <Grid item>
                <GeraImagem matriz={imagemTransfomada} altura={imagemTransfomada[0]?.length || 1} largura={imagemTransfomada?.length || 1} />
            </Grid>
        </Grid>

    </Grid >
}
export default Morfologia