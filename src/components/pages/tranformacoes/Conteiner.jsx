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
    teste2: {
        backgroundColor: "gray"
    },
})
const TAMANHO_CANVAS = 500






const Conteiner = () => {
    const classes = useStyles()
    const [tamanho_min_x, setTamanho_min_x] = useState(0)
    const [tamanho_max_x, setTamanho_max_x] = useState(500)
    const [tamanho_min_y, setTamanho_min_y] = useState(0)
    const [tamanho_max_y, setTamanho_max_y] = useState(500)
    const [tamanho_min_x_res, setTamanho_min_x_res] = useState(0)
    const [tamanho_max_x_res, setTamanho_max_x_res] = useState(500)
    const [tamanho_min_y_res, setTamanho_min_y_res] = useState(0)
    const [tamanho_max_y_res, setTamanho_max_y_res] = useState(500)
    const [valor_x, setValor_x] = useState(0)
    const [valor_y, setValor_y] = useState(0)
    const [valor_x_res, setValor_x_res] = useState(0)
    const [valor_y_res, setValor_y_res] = useState(0)


    const WD_para_NDC = () => {
        // ((ndc_max- ndc_min) * ((ponto.getX()-x_min) / (x_max-x_min))) + ndc_min
        const resultadoX = (tamanho_max_x_res - tamanho_min_x_res) * ((valor_x - tamanho_min_x) / (tamanho_max_x - tamanho_min_x)) + tamanho_min_x_res
        const resultadoY = (tamanho_max_y_res - tamanho_min_y_res) * ((valor_y - tamanho_min_y) / (tamanho_max_y - tamanho_min_y)) + tamanho_min_y_res

        setValor_x_res(resultadoX)
        setValor_y_res(resultadoY)
        return true
    }





    const conversoes = [
        { label: "W.D para N.D.C", value: WD_para_NDC() },
        { label: "N.D.C para W.D", value: 2 },
        { label: "N.D.C para D.C", value: 3 },
        { label: "D.C para N.D.C", value: 4 },
        { label: "W.D para D.C", value: 5 },
        { label: "D.C para W.D", value: 6 }
    ]
    return (
        <Grid container direction="row" >
            <Grid container item
                align="center"
                direction="column"
                sm={12}
                className={classes.header}
            >
                <Grid item sm={6}>
                    <Typography>Transformações</Typography>
                    <TextField
                        id="standard-select"
                        select
                        fullWidth
                        variant="standard"
                    >
                        {conversoes.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                                {option.label}
                             
                            </MenuItem>
                        ))}
                    </TextField>   
{/*   <Button onClick={option.value}>
                                    Calcular
                                </Button>*/}
                </Grid>
            </Grid>
            <Grid container item sm={6} align="center">
                <Grid item sm={12}  >
                    <Painel
                        tamanhoX={Math.abs(tamanho_max_x - tamanho_min_x)}
                        tamanhoY={Math.abs(tamanho_max_y - tamanho_min_y)}
                        x={valor_x} y={valor_y} />
                </Grid>
                <Grid item container direction="row" sm={12} >
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
            <Grid container item sm={6} align="center" >
                <Grid item sm={12}  >
                    <Painel
                        tamanhoX={Math.abs(tamanho_max_x_res - tamanho_min_x_res)}
                        tamanhoY={Math.abs(tamanho_max_y_res - tamanho_min_y_res)}
                        x={valor_x_res} y={valor_y_res} />
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
        </Grid>
    )
}
export default Conteiner