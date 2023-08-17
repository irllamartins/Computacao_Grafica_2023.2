import {
    TextField,
    Grid
} from '@mui/material'
import { makeStyles } from '@mui/styles';
import { Reta } from '../circuferencia/Reta';
import { useState } from 'react';

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
const TAMANHO_CANVAS= 500

const Conteiner = () => {
    const classes = useStyles()
    const ponto = []
    for(int i=0;i<2;i++){
        const [valor_x, setValor_x] = useState(0)
        const [valor_y, setValor_y] = useState(0)
    }
    
    

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item sm={10}  >
                <Reta tamanho={TAMANHO_CANVAS} x={valor_x} y={valor_y}/>
            </Grid>
            <Grid item container direction="column" sm={2} >
                <Grid item className={classes.espacamento}>
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
                <Grid item className={classes.espacamento}>
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
    )
}
export default Conteiner