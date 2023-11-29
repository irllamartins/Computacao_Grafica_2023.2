import {  useState } from "react"
import { AddAPhoto, Cached } from "@mui/icons-material"
import {
    Button,
    CircularProgress,
    Grid,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Theme,
    Typography
} from "@mui/material"
import GeraImagem from "./GeraImagem"
import GeraMatriz from "./GeraMatriz"
import Operacao, { aplicacaoMascaraMediana, magnetude } from "./Operacao"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme: Theme) => ({
    imagemGrupo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "2%",
    }
}))

const Transformacoes: { [key: string]: any[][] } = {
    "Media": [[0.111, 0.111, 0.111], [0.111, 0.111, 0.111], [0.111, 0.111, 0.111]],
    "Mediana": [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]],
    "Alto Reforco": [[-1, -1, -1], [-1, "x", -1], [-1, -1, -1]],
    "Passa Alta Basica": [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]],
    "Robert X": [[0, 0, 0], [0, 1, 0], [0, -1, 0]],
    "Robert Y": [[0, 0, 0], [0, 1, -1], [0, 0, 0]],
    "Robert Magnetude": [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]],
    "Robert Cruzado x": [[0, 0, 0], [0, 1, 0], [0, 0, -1]],
    "Robert Cruzado Y": [[0, 0, 0], [0, 0, 1], [0, -1, 0]],
    "Robert Cruzado Magnetude": [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]],
    "Prewitt X": [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
    "Prewitt Y": [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]],
    "Prewitt Magnetude": [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]],
    "Sobel X": [[-1, -2, -1], [0, 0, 0], [1, 2, 1]],
    "Sobel Y": [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]],
    "Sobel Magnetude": [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]],
}
enum TiposTransformacao {
    MEDIA = "Media",
    MEDIANA = "Mediana",
    ALTO_REFORCO = "Alto Reforco",
    PASSA_ALTA_BASICA = "Passa Alta Basica",
    ROBERT_X = "Robert X",
    ROBERT_Y = "Robert Y",
    ROBERT_MAGNETUDE = "Robert Magnetude",
    ROBERT_CRUZADO_X =  "Robert Cruzado x",
    ROBERT_CRUZADO_Y = "Robert Cruzado Y",
    ROBERT_CRUZADO_MAGNETUDE = "Robert Cruzado Magnetude",
    PREWITT_X = "Prewitt X",
    PREWITT_Y = "Prewitt Y",
    PREWITT_MAGNETUDE = "Prewitt Magnetude",
    SOBEL_X = "Sobel X",
    SOBEL_Y = "Sobel Y",
    SOBEL_MAGNETUDE = "Sobel Magnetude",

}


const Container = () => {
    const classes = useStyles()
    const [imagem, setImagem] = useState<number[][]>([])
    const [imagemTransformada, setImagemTransformada] = useState<number[][]>([])
    const [opcao, setOpcao] = useState<string>(TiposTransformacao.MEDIA)
    const [reforco, setReforco] = useState<number>(0)
    const [success] = useState(false)

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
            case TiposTransformacao.ROBERT_MAGNETUDE:
                const robert_x = Operacao(imagem, Transformacoes[TiposTransformacao.ROBERT_X])
                const robert_y = Operacao(imagem, Transformacoes[TiposTransformacao.ROBERT_Y])
                setImagemTransformada(magnetude(robert_x,robert_y))
                break
            case TiposTransformacao.ROBERT_CRUZADO_X:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.ROBERT_CRUZADO_X]))
                break
            case TiposTransformacao.ROBERT_CRUZADO_Y:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.ROBERT_CRUZADO_Y]))
                break
            case TiposTransformacao.ROBERT_CRUZADO_MAGNETUDE:
                const robert_cruzado_x=Operacao(imagem, Transformacoes[TiposTransformacao.ROBERT_CRUZADO_X])
                const robert_cruzado_y=Operacao(imagem, Transformacoes[TiposTransformacao.ROBERT_CRUZADO_Y])
                setImagemTransformada(magnetude(robert_cruzado_x,robert_cruzado_y))
                break
            case TiposTransformacao.PREWITT_X:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.PREWITT_X]))
                break
            case TiposTransformacao.PREWITT_Y:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.PREWITT_Y]))
                break
            case TiposTransformacao.PREWITT_MAGNETUDE:
                const prewitt_x = Operacao(imagem, Transformacoes[TiposTransformacao.PREWITT_X])
                const prewitt_y = Operacao(imagem, Transformacoes[TiposTransformacao.PREWITT_Y])
                setImagemTransformada(magnetude( prewitt_x, prewitt_y))
                break
            case TiposTransformacao.SOBEL_X:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.SOBEL_X]))
                break
            case TiposTransformacao.SOBEL_Y:
                setImagemTransformada(Operacao(imagem, Transformacoes[TiposTransformacao.SOBEL_Y]))
                break
            case TiposTransformacao.SOBEL_MAGNETUDE:
                const sobel_x = Operacao(imagem, Transformacoes[TiposTransformacao.SOBEL_Y])
                const sobel_y = Operacao(imagem, Transformacoes[TiposTransformacao.SOBEL_Y])
                setImagemTransformada(magnetude( sobel_x, sobel_y))
                break
            case TiposTransformacao.ALTO_REFORCO:
                const novaMatriz = Transformacoes[TiposTransformacao.ALTO_REFORCO]
                novaMatriz[1][1] = (reforco * 9) - 1
                console.log(novaMatriz)
                setImagemTransformada(Operacao(imagem, novaMatriz))
                break
            default:
                return "Operação não selecionada"
        }
    }


    return <Grid container>
        <Grid item sm={12} xl={12} p={2}>
            <Typography variant="h5" align="center">Aplicação de filtros em imagem</Typography>
        </Grid>
        <Grid item container sm={4} className={classes.imagemGrupo}>
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
        <Grid item sm={4} sx={{ alignSelf: "center", justifySelf: "center" }}>
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
                disabled={!(imagem.length > 0 ? true : false)}
                onClick={() => {
                    calcular(opcao)
                }}
                startIcon={<Cached />}>
                Transformar

                {success && (imagem.length=== 0 ? true : false) && (
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
        <Grid item sm={4} className={classes.imagemGrupo}>
            <GeraImagem matriz={imagemTransformada} altura={imagemTransformada[0]?.length || 1} largura={imagemTransformada?.length || 1} />
        </Grid>
    </Grid>


}
export default Container