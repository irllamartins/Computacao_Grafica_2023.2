import { Grid, TextField, Typography } from "@mui/material"
import Painel from "./Painel"
import { useState } from "react"

const TAMANHO_CANVAS = 500
const AUMENTO_LAGURA = 1.5
const Batimentos = () => {
    const [tempo, setTempo] = useState(10)
    return <Grid container direction="row" >
        <Grid item sm={12}>
            <Typography variant="h6" align="center">Batimentos Cardiacos</Typography>
        </Grid>
        <Grid item sm={8} xl={12} marginTop={5} >
            <Painel
                tamanho={TAMANHO_CANVAS}
                aumentoLagura = {AUMENTO_LAGURA}
                pontoInicialX={0}
                pontoInicialY={TAMANHO_CANVAS/2}
                pontoFinalX={TAMANHO_CANVAS*AUMENTO_LAGURA}
                pontoFinalY={TAMANHO_CANVAS/2}
                 />
        </Grid>
        <Grid item sm={4} xl={12} justifySelf="center" alignSelf="center">
            <TextField
                id="tempo"
                label="Tempo"
                value={tempo}
                variant="standard"
                onChange={e => setTempo(Number(e.target.value))}
            />
        </Grid >
    </Grid >
}
export default Batimentos