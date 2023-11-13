import { Alert, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { AddAPhoto, AutoFixHigh } from "@mui/icons-material"
import Painel from "./Painel"


const useStyles = makeStyles((theme: Theme) => ({

}))


const Equalizacao = () => {
    const classes = useStyles()
    const [matriz, setMatriz] = useState<number[][]>([])
    const [success, setSuccess] = useState(false)

    return <Grid container direction="row" alignContent="center" alignItems="center">
        <Grid item sm={12} xl={12} p={2}>
            <Typography variant="h5" align="center">Perspectiva</Typography>
        </Grid>
        <Grid item sm={6}>
            <Painel />
        </Grid>
        <Grid item sm={6}>

        </Grid>
    </Grid>
}
export default Equalizacao      