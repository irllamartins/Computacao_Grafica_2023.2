import { Grid, TextField, Typography } from "@mui/material"
import Painel from "./Painel"
import { useState } from "react"
//import GerarBatimentos from "./GerarBatimentos"

const TAMANHO_CANVAS = 500
const AUMENTO_LAGURA = 2
const Batimentos = () => {
    return <Grid container direction="row" >
        <Grid item sm={12}>
            <Typography variant="h6" align="center" >Batimentos Cardiacos</Typography>
        </Grid>
        <Grid item sm={12} xl={12} marginTop={5} sx={{backgroundColor:"black"}}>
            {<Painel
                tamanho={TAMANHO_CANVAS}
                aumentoLagura={AUMENTO_LAGURA}
                pontoInicialX={0}
                pontoInicialY={TAMANHO_CANVAS / 2}
                pontoFinalX={TAMANHO_CANVAS * AUMENTO_LAGURA}
                pontoFinalY={TAMANHO_CANVAS / 2}
            />
            }

        </Grid>
    </Grid >
}
export default Batimentos