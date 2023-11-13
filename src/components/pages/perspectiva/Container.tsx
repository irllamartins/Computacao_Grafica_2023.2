import { Alert, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { AddAPhoto, AutoFixHigh } from "@mui/icons-material"
import Painel from "./Painel"


const useStyles = makeStyles((theme: Theme) => ({

}))


const Equalizacao = () => {
    const classes = useStyles()
    const [success, setSuccess] = useState(false)
    const [vertices,setVertices] = useState<number[]>([
        -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
        -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
        -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1,
        1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1,
        -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1,
        -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,
      ])
      const [cores,setCores] = useState<number[]>([
        5, 3, 7, 5, 3, 7, 5, 3, 7, 5, 3, 7,
        1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3,
        0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
        1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
        0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0
      ])
      const [indices,setIndices] = useState<number[]>([
        0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23
      ])
    return <Grid container direction="row" alignContent="center" alignItems="center">
        <Grid item sm={12} xl={12} p={2}>
            <Typography variant="h5" align="center">Perspectiva</Typography>
        </Grid>
        <Grid item sm={6}>
            <Painel vertices={vertices} cores={cores} indices={indices} />
        </Grid>
        <Grid item sm={6}>

        </Grid>
    </Grid>
}
export default Equalizacao      