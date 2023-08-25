import {
    TextField,
    Grid,
    Typography,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    Alert,
} from '@mui/material'
import { makeStyles } from '@mui/styles';
import Reta from './Reta';
import { useState,useEffect } from 'react';

const useStyles = makeStyles({
    espacamento: {
        padding: "5px"
    },
    teste1: {
        backgroundColor: "green"
    },
    teste2: {
        backgroundColor: "gray"
    },
})
const TAMANHO_CANVAS = 500

export const AlgoritimosTipos = {
    DDA: "DDA",
    BRESENHAM: "Bresenham"
}
const Conteiner = () => {
    const classes = useStyles()
    const [inicio_x, setInicio_x] = useState(0)
    const [inicio_y, setInicio_y] = useState(0)
    const [fim_x, setFim_x] = useState(0)
    const [fim_y, setFim_y] = useState(0)
    const [algoritmo, setAlgoritmo] = useState("Bresenham")
    const [vazio, setVazio] = useState(true)

    /*useEffect(() => {
        const validacao =(inicio_x || inicio_y || fim_x || fim_y) === undefined?true:false
        console.log("t",validacao)
        setVazio(validacao)
    }),[inicio_x,inicio_y,fim_x,fim_y]*/

    return (
        <Grid container direction="row" >

            <Grid container item sm={6} xl={12} align="center" marginTop={5}>
                <Grid item sm={12}   >
                    { /* tamanhoX,tamanhoY,pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY, opcao*/}
                    <Reta
                        tamanhoX={TAMANHO_CANVAS}
                        tamanhoY={TAMANHO_CANVAS}
                        pontoInicialX={inicio_x}
                        pontoInicialY={inicio_y}
                        pontoFinalX={fim_x}
                        pontoFinalY={fim_y}
                        opcao={algoritmo}
                    />
                </Grid>

            </Grid>
            <Grid container item sm={6} xl={12} align="center" >
                <Grid item sm={12} xl={12} p={2}>
                    <Typography variant="h5">Retas</Typography>
                </Grid>
                <Grid item sm={12}>
                    <FormControl >
                        <FormLabel >Algoritmos</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="algoritmo-label"
                            name="algoritmo-group"
                            value={algoritmo}
                            onChange={e => setAlgoritmo(e.target.value)}
                        >
                            {
                                Object.values(AlgoritimosTipos).map((item, index) =>
                                    <FormControlLabel key={index} value={item} control={<Radio />} label={item} />
                                )
                            }
                        </RadioGroup>
                    </FormControl>

                </Grid>

                {Math.abs(inicio_x || inicio_y || fim_x || fim_y) > TAMANHO_CANVAS / 2 ? <Grid item sm={12} className={classes.espacamento}>
                    <Alert variant="outlined" severity="warning">
                        Pontos fora da area do plano cartesiano estabelecido. Valor maximo suportado <b>{TAMANHO_CANVAS / 2}</b>
                    </Alert>
                </Grid> : undefined}
                {/*vazio? <Grid item sm={12} className={classes.espacamento}>
                    <Alert variant="outlined" severity="warning">
                        Contem valores inexistente 
                    </Alert>
                        </Grid> : undefined*/}
                <Grid item container sm={12} >
                    <Grid item className={classes.espacamento} sm={6} >
                        <TextField
                            id="inicio_x"
                            value={inicio_x}
                            label="Ponto inicial X"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setInicio_x(Number(e.target.value))
                            }
                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={6}>
                        <TextField
                            id="inicio_y"
                            value={inicio_y}
                            label="Ponto Inicial Y"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setInicio_y(Number(e.target.value))
                            }
                        />
                    </Grid>
                </Grid>
                <Grid item container sm={12} >

                    <Grid item className={classes.espacamento} sm={6} >
                        <TextField
                            id="fim_x"
                            value={fim_x}
                            label="Ponto final X"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setFim_x(Number(e.target.value))
                            }
                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={6}>
                        <TextField
                            id="fim_y"
                            value={fim_y}
                            label="Ponto final Y"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setFim_y(Number(e.target.value))
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Conteiner