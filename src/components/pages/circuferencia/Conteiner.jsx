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
import { useState, useEffect } from 'react';
import Circuferencia from './Circuferencia';

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
    EXPLICITA: "Forma explicita",
    TRIGONOMETRICA: "Forma trigonometrica",
    MEDIO: "Ponto médio",
    ELIPSE: "Elipse"
}
const Conteiner = () => {
    const classes = useStyles()
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [raio, setRaio] = useState(0)
    const [algoritmo, setAlgoritmo] = useState("Forma explicita")

    const altura = (TAMANHO_CANVAS / 2) - y
    const largura = (TAMANHO_CANVAS / 2) + x

    return (
        <Grid container direction="row" >
            <Grid container item sm={6} xl={12} align="center" marginTop={5}>
                <Grid item sm={12}   >
                    { /* tamanho,raio, x,y, opcao*/}
                    <Circuferencia
                        tamanho={TAMANHO_CANVAS}
                        altura={altura}
                        largura={largura}
                        raio={raio}
                        opcao={algoritmo} />
                </Grid>

            </Grid>
            <Grid container item sm={6} xl={12} align="center" >
                <Grid item sm={12} xl={12} p={2}>
                    <Typography variant="h5">Circuferencia</Typography>
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
                {(Math.abs(x) + raio > TAMANHO_CANVAS / 2 || Math.abs(y) + raio > TAMANHO_CANVAS / 2) && <Grid item sm={12} className={classes.espacamento}>
                    <Alert variant="outlined" severity="warning">
                        Pontos fora da area do plano cartesiano estabelecido. Valor maximo suportado <b>{TAMANHO_CANVAS / 2}</b>
                    </Alert>
                </Grid>}
                <Grid item container sm={12} >
                    <Grid item className={classes.espacamento} sm={4} >
                        <TextField
                            id="raio"
                            value={raio}
                            label="Raio"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setRaio(Number(e.target.value))
                            }
                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={4} >
                        <TextField
                            id="x"
                            value={x}
                            label="Ponto X"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setX(Number(e.target.value))
                            }
                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={4}>
                        <TextField
                            id="y"
                            value={y}
                            label="Ponto Y"
                            variant="standard"
                            fullWidth type="number"
                            onChange={e =>
                                setY(Number(e.target.value))
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Conteiner