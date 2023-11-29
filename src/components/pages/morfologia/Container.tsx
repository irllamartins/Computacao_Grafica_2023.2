import { Button, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState, useEffect } from "react"
import { AddAPhoto, Balance } from "@mui/icons-material"
import GeraImagem from "./GeraImagem"
import GeraMatriz from "./GeraMatriz"
import Operacao, { transfomarBinario } from "./Operacao"

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
export const Formato = {
    CINZA: "Tons de cinza",
    BINARIA: "Binaria",
}
const Transformacoes: { [key: string]: any[][] } = {
    "Media": [[0.111, 0.111, 0.111], [0.111, 0.111, 0.111], [0.111, 0.111, 0.111]],
}
enum TiposTransformacao {
    MEDIA = "Media",

}



const Morfologia = () => {
    const classes = useStyles()
    const [imagem, setImagem] = useState<number[][]>([])
    const [imagemBinaria, setImagemBinaria] = useState<number[][]>([])
    const [imagemTransfomada, setImagemTransformada] = useState<number[][]>([])
    const [success, setSuccess] = useState(false)
    const [forma, setForma] = useState("Tons de cinza")
    const [opcao, setOpcao] = useState<string>(TiposTransformacao.MEDIA)
    const [elementoEstruturante, setElementoEstruturante] = useState(Array(3).fill(Array(3).fill(0)));
    /*useEffect(() => {
        if (forma === Formato.CINZA) {
            setImagem(imagemCinza);
        } else {
            setImagem(imagemBinaria);
        }
    }, [forma, imagemCinza, imagemBinaria]);*/
    const handleInputChange = (e: any, i: number, j: number) => {
        const novoElementoEstruturante = [...elementoEstruturante];
        novoElementoEstruturante[i][j] = Number(e.target.value);
        setElementoEstruturante(novoElementoEstruturante);
    };
    const calcular = (label: any) => {
        switch (label) {
            case TiposTransformacao.MEDIA:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.MEDIA]))
                break
            default:
                return "Operação não selecionada"
        }
    }
    return <Grid container direction="row" alignContent="center" alignItems="center">
        <Grid item sm={12} xl={12} p={2}>
            <Typography variant="h5" align="center">Equalização de imagem</Typography>
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
                            setImagem(matriz.matriz)
                            setImagemBinaria(transfomarBinario(matriz.matriz, matriz.maximoCor))
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
            <Grid item >
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
            </Grid>
            <Grid  item className={classes.imagemGrupo}>
                <Grid container item spacing={1}>
                    {elementoEstruturante.map((linha, i) => (
                        <Grid container item key={i} spacing={1}>
                            {linha.map((elemento: number, j: number) => (
                                <Grid item key={j}>
                                    <TextField
                                        variant="outlined"
                                        size="small" // para tornar o campo de texto menor
                                        style={{ width: '50px' }} // para ajustar a largura do campo de texto
                                        value={elemento}
                                        onChange={(e) => handleInputChange(e, i, j)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            </Grid> 
        </Grid>
        <Grid item container sm={4} direction="column" className={classes.imagemGrupo}>

            <Grid item>
                <Button
                    variant="contained"
                    fullWidth
                    disabled={!success}
                    size="small"
                    startIcon={<Balance />}
                    sx={{ margin: "2%" }}
                    onClick={() => {
                    }}>Operar</Button>
            </Grid>
            <Grid item>
                <GeraImagem matriz={imagemTransfomada} altura={imagemTransfomada[0]?.length || 1} largura={imagemTransfomada?.length || 1} />
            </Grid>
        </Grid>

    </Grid >
}
export default Morfologia      