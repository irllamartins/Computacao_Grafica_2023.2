import {
    TextField,
    Grid,
    Typography,
    MenuItem,
    Button
} from '@mui/material'
import { makeStyles } from '@mui/styles';
import Painel from './painel'
import { useState } from 'react';

const useStyles = makeStyles({
    espacamento: {
        padding: "5px"
    },
    header: {
        // backgroundColor: "green",
        paddingInline: "5%",
        paddingTop: "1%",
        paddingBottom: "1%"
    },
    header: {
        // backgroundColor: "green",
        paddingInline: "1%",
    },
    teste2: {
        backgroundColor: "gray"
    },
})
const TAMANHO_CANVAS = 500
const Operacoes = {
    // metrica do mundo para normalização
    WD_NDC: "W.D para N.D.C",
    // normalização para o metrica do mundo
    NDC_WD: "N.D.C para W.D",
    // normalização para o dispositivo de exibição 
    NDC_DC: "N.D.C para D.C",
    // dispositivo de exibição para a normalização
    DC_NDC: "D.C para N.D.C",
    // metrica do mundo para diretamente o dispositivo de exibição
    WD_DC: "W.D para D.C",
    // dispositivo de exibição para a metrica do mundo
    DC_WD: "D.C para W.D",
}
const Conteiner = () => {
    const classes = useStyles()
    const [tamanho_min_x, setTamanho_min_x] = useState(10.3)
    const [tamanho_max_x, setTamanho_max_x] = useState(20.3)
    const [tamanho_min_y, setTamanho_min_y] = useState(10.3)
    const [tamanho_max_y, setTamanho_max_y] = useState(20.3)
    const [tamanho_min_x_res, setTamanho_min_x_res] = useState(0)
    const [tamanho_max_x_res, setTamanho_max_x_res] = useState(1)
    const [tamanho_min_y_res, setTamanho_min_y_res] = useState(0)
    const [tamanho_max_y_res, setTamanho_max_y_res] = useState(1)
    const [valor_x, setValor_x] = useState(15.5)
    const [valor_y, setValor_y] = useState(15.5)
    const [valor_x_res, setValor_x_res] = useState(0)
    const [valor_y_res, setValor_y_res] = useState(0)
    const [selection, setSelection] = useState()
    const [TAMANHO_CANVAS_A, setTAMANHO_CANVAS_A] = useState(1)
    const [TAMANHO_CANVAS_B, setTAMANHO_CANVAS_B] = useState(1)

    const WD_para_NDC = (valor_x, valor_y, tamanho_min_x_res, tamanho_max_x_res, tamanho_min_y_res, tamanho_max_y_res) => {
        const resultadoX = (tamanho_max_x_res - tamanho_min_x_res) * ((valor_x - tamanho_min_x) / (tamanho_max_x - tamanho_min_x)) + tamanho_min_x_res
        const resultadoY = (tamanho_max_y_res - tamanho_min_y_res) * ((valor_y - tamanho_min_y) / (tamanho_max_y - tamanho_min_y)) + tamanho_min_y_res

        setValor_x_res(Math.round(resultadoX * 100) / 100)
        setValor_y_res(Math.round(resultadoY * 100) / 100)
        console.log("x", resultadoX, "y", resultadoY, "teste", valor_x, "|", valor_y)
    }
    const NDC_para_WD = (valor_x, valor_y, tamanho_min_x_res, tamanho_max_x_res, tamanho_min_y_res, tamanho_max_y_res) => {
        const resultadoX = (tamanho_max_x_res - tamanho_min_x_res) * ((valor_x - tamanho_min_x) / (tamanho_max_x - tamanho_min_x)) + tamanho_min_x_res
        const resultadoY = (tamanho_max_y_res - tamanho_min_y_res) * ((valor_y - tamanho_min_y) / (tamanho_max_y - tamanho_min_y)) + tamanho_min_y_res

        setValor_x_res(Math.round(resultadoX * 100) / 100)
        setValor_y_res(Math.round(resultadoY * 100) / 100)
        console.log("x", resultadoX, "y", resultadoY, "teste", valor_x, "|", valor_y)
    }
    const NDC_para_DC = (valor_x, valor_y, tamanho_min_x_res, tamanho_max_x_res, tamanho_min_y_res, tamanho_max_y_res) => {
        const resultadoX = (tamanho_max_x_res - tamanho_min_x_res - 1) * ((valor_x - tamanho_min_x) / (tamanho_max_x - tamanho_min_x)) + tamanho_min_x_res
        const resultadoY = (tamanho_max_y_res - tamanho_min_y_res - 1) * ((valor_y - tamanho_min_y) / (tamanho_max_y - tamanho_min_y)) + tamanho_min_y_res

        setValor_x_res(Math.round(resultadoX))
        setValor_y_res(Math.round(resultadoY))
        console.log("x", resultadoX, "y", resultadoY, "teste", valor_x, "|", valor_y)
    }
    const DC_para_NDC = (valor_x, valor_y, tamanho_min_x_res, tamanho_max_x_res, tamanho_min_y_res, tamanho_max_y_res) => {
        const resultadoX = (tamanho_max_x_res - tamanho_min_x_res) * ((valor_x - tamanho_min_x) / (tamanho_max_x - tamanho_min_x - 1)) + tamanho_min_x_res
        const resultadoY = (tamanho_max_y_res - tamanho_min_y_res) * ((valor_y - tamanho_min_y) / (tamanho_max_y - tamanho_min_y - 1)) + tamanho_min_y_res

        setValor_x_res(Math.round(resultadoX * 100) / 100)
        setValor_y_res(Math.round(resultadoY * 100) / 100)
        console.log("x", resultadoX, "y", resultadoY, "teste", valor_x, "|", valor_y)
    }
    const WD_para_DC = (valor_x, valor_y, tamanho_min_x_res, tamanho_max_x_res, tamanho_min_y_res, tamanho_max_y_res) => {
        const resultadoX = (tamanho_max_x_res - tamanho_min_x_res - 1) * ((valor_x - tamanho_min_x) / (tamanho_max_x - tamanho_min_x)) + tamanho_min_x_res
        const resultadoY = (tamanho_max_y_res - tamanho_min_y_res - 1) * ((valor_y - tamanho_min_y) / (tamanho_max_y - tamanho_min_y)) + tamanho_min_y_res

        setValor_x_res(Math.round(resultadoX))
        setValor_y_res(Math.round(resultadoY))
        console.log("x", resultadoX, "y", resultadoY, "teste", valor_x, "|", valor_y)
    }
    const DC_para_WD = (valor_x, valor_y, tamanho_min_x_res, tamanho_max_x_res, tamanho_min_y_res, tamanho_max_y_res) => {
        const resultadoX = (tamanho_max_x_res - tamanho_min_x_res) * ((valor_x - tamanho_min_x) / (tamanho_max_x - tamanho_min_x - 1)) + tamanho_min_x_res
        const resultadoY = (tamanho_max_y_res - tamanho_min_y_res) * ((valor_y - tamanho_min_y) / (tamanho_max_y - tamanho_min_y - 1)) + tamanho_min_y_res

        setValor_x_res(Math.round(resultadoX * 100) / 100)
        setValor_y_res(Math.round(resultadoY * 100) / 100)
        console.log("x", resultadoX, "y", resultadoY, "teste", valor_x, "|", valor_y)
    }
    //Calcular a conversao caso o numero for maior
    const conversao = (tamanho_painel,variacaoX,variacaoY) => {
        if(variacaoX>variacaoY){
            return (tamanho_painel/variacaoX)
        }
        else{
            return (tamanho_painel/variacaoY)
        }
    }


    const conversoes = [
        // metrica do mundo para normalização
        Operacoes.WD_NDC,
        // normalização para o metrica do mundo
        Operacoes.NDC_WD,
        // normalização para o dispositivo de exibição
        Operacoes.NDC_DC,
        // dispositivo de exibição para a normalização
        Operacoes.DC_NDC,
        // metrica do mundo para diretamente o dispositivo de exibição
        Operacoes.WD_DC,
        // dispositivo de exibição para a metrica do mundo
        Operacoes.DC_WD,
    ]
    const calcular = (label) => {
        switch (label) {
            // metrica do mundo para normalização
            case Operacoes.WD_NDC:
                WD_para_NDC(valor_x, valor_y, tamanho_min_x_res, tamanho_max_x_res, tamanho_min_y_res, tamanho_max_y_res)
                break
            // normalização para o metrica do mundo
            case Operacoes.NDC_WD:
                NDC_para_WD(valor_x, valor_y, tamanho_min_x_res, tamanho_max_x_res, tamanho_min_y_res, tamanho_max_y_res)
                break
            // normalização para o dispositivo de exibição
            case Operacoes.NDC_DC:
                NDC_para_DC(valor_x, valor_y, tamanho_min_x_res, tamanho_max_x_res, tamanho_min_y_res, tamanho_max_y_res)
                break
            // dispositivo de exibição para a normalização
            case Operacoes.DC_NDC:
                DC_para_NDC(valor_x, valor_y, tamanho_min_x_res, tamanho_max_x_res, tamanho_min_y_res, tamanho_max_y_res)
                break
            // metrica do mundo para diretamente o dispositivo de exibição
            case Operacoes.WD_DC:
                WD_para_DC(valor_x, valor_y, tamanho_min_x_res, tamanho_max_x_res, tamanho_min_y_res, tamanho_max_y_res)
                break
            // dispositivo de exibição para a metrica do mundo
            case Operacoes.DC_WD:
                DC_para_WD(valor_x, valor_y, tamanho_min_x_res, tamanho_max_x_res, tamanho_min_y_res, tamanho_max_y_res)
                break
            default:
                return "Operação não encontrada"
        }
    }

   // const razaoPainelB = razao((tamanho_max_x_res - tamanho_min_x_res), (tamanho_max_y_res - tamanho_min_y_res))
    //const propocaoPainelA = propocao(razaoPainelA)
   // const propocaoPainelB = propocao(razaoPainelB)
    const conversaoPainelA = conversao(TAMANHO_CANVAS,(tamanho_max_x - tamanho_min_x),(tamanho_max_y - tamanho_min_y))

    const conversaoPainelB = conversao(TAMANHO_CANVAS,(tamanho_max_x_res - tamanho_min_x_res),(tamanho_max_y_res - tamanho_min_y_res))

   
    return (
        <Grid container direction="row" >
            <Grid container item
                align="center"
                sm={12}
                xl={12}
                className={classes.header}
            >
                <Grid item sm={12} xl={12} p={2}>
                    <Typography variant="h5">Transformações</Typography>
                </Grid>
                <Grid item sm={10} xl={10}
                    className={classes.header}>
                    <TextField
                        id="standard-select"
                        select
                        fullWidth
                        value={selection || ""}
                        variant="standard"
                    >
                        {conversoes.map((option, index) => (
                            <MenuItem key={index} value={option} onClick={() => setSelection(option)}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Button
                    variant="contained"
                    size='small'
                    onClick={() => calcular(selection)} >
                    Calcular
                </Button>

            </Grid>
            <Grid container item sm={6} xl={12} align="center">
                <Grid item sm={12}   >
                    <Painel
                       // tamanhoX={Math.abs((tamanho_max_x - tamanho_min_x))*propocaoPainelA}
                        //tamanhoY={Math.abs((tamanho_max_y - tamanho_min_y))*propocaoPainelA}
                         tamanhoX={(tamanho_max_x - tamanho_min_x)}
                        tamanhoY={(tamanho_max_y - tamanho_min_y)}
                        x={valor_x} y={valor_y} propocao={conversaoPainelA} />
                        {console.log((tamanho_max_x - tamanho_min_x)*conversaoPainelA,"|",conversaoPainelA,"|cod",valor_x*conversaoPainelA,"| painel",(tamanho_max_y - tamanho_min_y)*conversaoPainelA,"|",conversaoPainelA,"|cod",valor_y*conversaoPainelA)}
                
                </Grid>
                <Grid item container direction="row" sm={12}>
                    <Grid item className={classes.espacamento} sm={3} >
                        <TextField
                            id="x"
                            value={tamanho_min_x}
                            label="Minimo X"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setTamanho_min_x(e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={3}>
                        <TextField
                            id="y"
                            value={tamanho_max_x}
                            label="Maximo X"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setTamanho_max_x(e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={3} >
                        <TextField
                            id="x"
                            value={tamanho_min_y}
                            label="Minimo Y"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setTamanho_min_y(e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={3}>
                        <TextField
                            id="y"
                            value={tamanho_max_y}
                            label="Maximo Y"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setTamanho_max_y(e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={6} >
                        <TextField
                            id="x"
                            value={valor_x}
                            label="Digite o X"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setValor_x(e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={6}>
                        <TextField
                            id="y"
                            value={valor_y}
                            label="Digite o Y"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setValor_y(e.target.value)
                            }
                        />
                    </Grid>

                </Grid>
            </Grid>
            <Grid container item sm={6} xl={12} align="center" >
                <Grid item sm={12}  >
                    <Painel
                        tamanhoX={Math.abs(tamanho_max_x_res - tamanho_min_x_res)}
                        tamanhoY={Math.abs(tamanho_max_y_res - tamanho_min_y_res)}
                        x={valor_x_res} y={valor_y_res} propocao={conversaoPainelB}/>
                {console.log((tamanho_max_x_res - tamanho_min_x_res)*conversaoPainelB,"|",conversaoPainelB,"|cod",valor_x_res*conversaoPainelB,"|painel",(tamanho_max_y_res - tamanho_min_y_res)*conversaoPainelB,"|",conversaoPainelB,"|cod",valor_y_res*conversaoPainelB)}
                </Grid>
                <Grid item container direction="row" sm={12} >
                    <Grid item className={classes.espacamento} sm={3} >
                        <TextField
                            id="x"
                            value={tamanho_min_x_res}
                            label="Minimo X"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setTamanho_min_x_res(e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={3}>
                        <TextField
                            id="y"
                            value={tamanho_max_x_res}
                            label="Maximo X"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setTamanho_max_x_res(e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={3} >
                        <TextField
                            id="x"
                            value={tamanho_min_y_res}
                            label="Minimo Y"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setTamanho_min_y_res(e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={3}>
                        <TextField
                            id="y"
                            value={tamanho_max_y_res}
                            label="Maximo Y"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setTamanho_max_y_res(e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={6} >
                        <TextField
                            id="x"
                            value={valor_x_res}
                            label="O resultado X"
                            variant="standard"
                            fullWidth type="number"

                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={6}>
                        <TextField
                            id="y"
                            value={valor_y_res}
                            label="O resultado Y"
                            variant="standard"
                            fullWidth type="number"

                        />
                    </Grid>

                </Grid>
            </Grid>
        </Grid >
    )
}
export default Conteiner