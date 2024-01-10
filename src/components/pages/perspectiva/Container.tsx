import { Box, Button, Grid, Tab,  Tabs, Typography } from "@mui/material"
import { useState } from "react"
import Painel from "./Painel"
import { isometrico, ortografica, pontoFuga, rotacaoY } from "./Operacao"


// Fonte base: https://webglfundamentals.org/webgl/lessons/webgl-3d-orthographic.html

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const LARGURA = 1000
const ALTURA = 500
const Trasformacao3D = () => {
  const [value, setValue] = useState<number>(0)


  const [vertices] = useState<number[]>([
    -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
    -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
    -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1,
    1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1,
    -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1,
    -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,
  ])
  const [cores] = useState<number[]>([
    5, 3, 7, 5, 3, 7, 5, 3, 7, 5, 3, 7,
    1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3,
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0
  ])
  const [indices] = useState<number[]>([
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23
  ])
  const [mov_matrix] = useState<number[]>([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  const [mov_matrixTransfomada, setMov_matrizTransfomada] = useState<number[]>([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])

  const [view_matrix] = useState<number[]>([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    setMov_matrizTransfomada(mov_matrix)
  }      



  return <Grid container direction="row" alignContent="center" alignItems="center">
    <Grid item sm={12} xl={12} p={2}>
      <Typography variant="h5" align="center">Perspectiva</Typography>
    </Grid>

    <Grid item sm={12}>
      <Grid item sm={12} xl={12} p={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
            centered>
            <Tab label="perspectiva com um ponto de fuga" {...a11yProps(0)} />
            <Tab label="projeção paralela isométrica" {...a11yProps(1)} />
            <Tab label="projeção paralela ortográfica" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0} >
          <Button onClick={() => { setMov_matrizTransfomada(rotacaoY(mov_matrix, 5)) }}>Rotacionar no Y</Button>
          <Button onClick={() => setMov_matrizTransfomada(pontoFuga(mov_matrix, 4, -8))}>Transformar</Button>
          <Painel altura={ALTURA} largura={LARGURA} vertices={vertices} cores={cores} indices={indices} mov_matrix={mov_matrixTransfomada} view_matrix={view_matrix} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Button onClick={() => { setMov_matrizTransfomada(rotacaoY(mov_matrix, 5)) }}>Rotacionar no Y</Button>
          <Button onClick={() => setMov_matrizTransfomada(isometrico(mov_matrix))}>Transformar</Button>
          <Painel altura={ALTURA} largura={LARGURA} vertices={vertices} cores={cores} indices={indices} mov_matrix={mov_matrixTransfomada} view_matrix={view_matrix} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2} >
          <Button onClick={() => { setMov_matrizTransfomada(rotacaoY(mov_matrix, 5)) }}>Rotacionar no Y</Button>
          <Button onClick={() => setMov_matrizTransfomada(ortografica(mov_matrix, ALTURA, LARGURA))}>Transformar</Button>
          <Painel altura={ALTURA} largura={LARGURA} vertices={vertices} cores={cores} indices={indices} mov_matrix={mov_matrixTransfomada} view_matrix={view_matrix} />
        </CustomTabPanel>
      </Grid>
    </Grid>
  </Grid>
}
export default Trasformacao3D    