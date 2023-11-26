import { Alert, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { AddAPhoto, AutoFixHigh } from "@mui/icons-material"
import Painel from "./Painel"
import { cizalhamento, escala, rotacaoX, rotacaoY, rotacaoZ, translacao } from "./Operacoes"

// Fonte base: https://webglfundamentals.org/webgl/lessons/webgl-3d-orthographic.html

const useStyles = makeStyles((theme: Theme) => ({

}))


const Equalizacao = () => {
  const classes = useStyles()
  const [success, setSuccess] = useState(false)
  const [vertices, setVertices] = useState<number[]>([
    -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
    -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
    -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1,
    1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1,
    -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1,
    -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,
  ])
  const [cores, setCores] = useState<number[]>([
    5, 3, 7, 5, 3, 7, 5, 3, 7, 5, 3, 7,
    1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3,
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0
  ])
  const [indices, setIndices] = useState<number[]>([
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23
  ])
  const [mov_matrix, setMov_matriz] = useState<number[]>([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  const [view_matrix, setView_matrix] = useState<number[]>([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
   
  return <Grid container direction="row" alignContent="center" alignItems="center">
    <Grid item sm={12} xl={12} p={2}>
      <Typography variant="h5" align="center">Perspectiva</Typography>
    </Grid>
    <Grid item sm={6}>
      <Painel vertices={vertices} cores={cores} indices={indices} mov_matrix={mov_matrix} view_matrix={view_matrix} />
    </Grid>
    <Grid item sm={6}>   
      <Button onClick={()=>{setMov_matriz(rotacaoX(mov_matrix,1))}}>Rotacionar no X</Button>
      <Button onClick={()=>{setMov_matriz(rotacaoY(mov_matrix,1))}}>Rotacionar no Y</Button>
      <Button onClick={()=>{setMov_matriz(rotacaoZ(mov_matrix,1))}}>Rotacionar no Z</Button>
      <Button onClick={()=>{setMov_matriz(translacao(mov_matrix,1,1,0))}}>Translação</Button>
      <Button onClick={()=>{setMov_matriz(escala(mov_matrix,1.2,1.2,1.2))}}>Escala</Button>
      <Button onClick={()=>{setMov_matriz(cizalhamento(mov_matrix,1.2,1.2))}}>Escala</Button>

    </Grid>  
  </Grid>
}
export default Equalizacao      