import { Alert, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Theme, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { AddAPhoto, AutoFixHigh, Delete } from "@mui/icons-material"
import Painel from "./Painel"
import { cizalhamento, escala, rotacaoX, rotacaoY, rotacaoZ, translacao } from "./Operacoes"

// Fonte base: https://webglfundamentals.org/webgl/lessons/webgl-3d-orthographic.html

const useStyles = makeStyles((theme: Theme) => ({
  espacamento: {
    padding: "5px"
  }
}))
enum TipoTransfomacoes {
  TRANSLACAO = "Translação",
  ROTACAO = "Rotação",
  ESCALA = "Escala",
  CISALHAMENTO = "Cisalhamento",
  REFLEXAO = "Reflexão"
}
enum TipoReflexao {
  XY = "xy",
  YZ = "yz",
  XZ = "xz",
  ORIGEM = "origem",
  FUNCAO = "funcao"
}
enum TipoRotacao {
  XY = "xy",
  YZ = "yz",
  XZ = "xz"
}

interface Transformacao {
  nome: string
  x: any
  y: any
  z: any
  matriz: Array<number[]>
}

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
const Trasformacao3D = () => {
  const classes = useStyles()
  const [operarMatriz, setOperarMatriz] = useState<Transformacao[]>([])
  const [opcao, setOpcao] = useState("")
  const [value, setValue] = useState<number>(0)
  const [entrada1, setEntrada1] = useState<number>(1)
  const [entrada2, setEntrada2] = useState<number>(0)
  const [entrada3, setEntrada3] = useState<number>(0)
  const [alignment, setAlignment] = useState<string | null>()
  const [rotate, setRotate] = useState<string | null>()


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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const tratamentoEntrada = (texto: any, setEntrada: any) => {

    if (texto === "") {
      setEntrada(0);
    } else {
      setEntrada(Number(texto.replace(/[a-zA-Z]/g, '').replace(/^0+(?=[\d-])/, '').replace(/,/g, '.')))
    }
  }

  const entradas = (opcao: string) => {
    switch (opcao) {
      case TipoTransfomacoes.CISALHAMENTO:
        return <Grid item container sm={12} direction="row">
          <Grid item sm={6} className={classes.espacamento}>
            <TextField
              id="ponto_x"
              value={entrada1}
              label="Ponto X"
              variant="standard"
              fullWidth
              onChange={e => tratamentoEntrada(e.target.value, setEntrada1)}

            />
          </Grid>
          <Grid item sm={6} className={classes.espacamento}>
            <TextField
              id="ponto_y"
              value={entrada2}
              label="Ponto Y"
              variant="standard"
              fullWidth
              onChange={e => tratamentoEntrada(e.target.value, setEntrada2)}

            />
          </Grid>
        </Grid>
      case TipoTransfomacoes.ESCALA:
        return <Grid item container sm={12} direction="row">
          <Grid item sm={4} className={classes.espacamento}>
            <TextField
              id="ponto_x"
              value={entrada1}
              label="Ponto X"
              variant="standard"
              fullWidth
              onChange={e => tratamentoEntrada(e.target.value, setEntrada1)}

            />
          </Grid>
          <Grid item sm={4} className={classes.espacamento}>
            <TextField
              id="ponto_y"
              value={entrada2}
              label="Ponto Y"
              variant="standard"
              fullWidth
              onChange={e => tratamentoEntrada(e.target.value, setEntrada2)}

            />
          </Grid>
          <Grid item sm={4} className={classes.espacamento}>
            <TextField
              id="ponto_z"
              value={entrada3}
              label="Ponto Y"
              variant="standard"
              fullWidth
              onChange={e => tratamentoEntrada(e.target.value, setEntrada3)}
            />
          </Grid>
        </Grid>
      case TipoTransfomacoes.REFLEXAO:

        const handleAlignment = (
          event: React.MouseEvent<HTMLElement>,
          newAlignment: string | null,
        ) => {
          setAlignment(newAlignment)
        }
        return <Grid item container sm={12}>
          <Grid item sm={12} >
            <ToggleButtonGroup
              value={alignment}
              exclusive
              size='small'
              fullWidth
              color='primary'
              onChange={handleAlignment}
              aria-label="tipos de reflexão"
            >
              <ToggleButton value={TipoReflexao.XY} aria-label={TipoReflexao.XY}>
                Eixo XY
              </ToggleButton>
              <ToggleButton value={TipoReflexao.YZ} aria-label={TipoReflexao.YZ}>
                Eixo YZ
              </ToggleButton>
              <ToggleButton value={TipoReflexao.XZ} aria-label={TipoReflexao.XZ}>
                Eixo XZ
              </ToggleButton>
              <ToggleButton value={TipoReflexao.ORIGEM} aria-label={TipoReflexao.ORIGEM} >
                Na origem
              </ToggleButton>
              <ToggleButton value={TipoReflexao.FUNCAO} aria-label={TipoReflexao.FUNCAO} >
                y = mx+b
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {
            alignment === TipoReflexao.FUNCAO && <Grid item sm={12} container direction="row">
              <Grid item sm={6} className={classes.espacamento}>
                <TextField
                  id="x"
                  value={entrada1}
                  label="Variavel M"
                  variant="standard"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">X</InputAdornment>
                  }}
                  fullWidth
                  onChange={e => tratamentoEntrada(e.target.value, setEntrada1)}
                />
              </Grid>
              <Grid item sm={6} className={classes.espacamento}>
                <TextField
                  id="y"
                  value={entrada2}
                  label="Variavel B"
                  variant="standard"
                  fullWidth
                  onChange={e => tratamentoEntrada(e.target.value, setEntrada2)}
                />
              </Grid>

            </Grid>
          }

        </Grid>
      case TipoTransfomacoes.ROTACAO:
        const handleRotate = (
          event: React.MouseEvent<HTMLElement>,
          newRotate: string | null,
        ) => {
          setRotate(newRotate)
        }
        return <Grid item sm={12}>
          <Grid item sm={12} >
            <ToggleButtonGroup
              value={rotate}
              exclusive
              size='small'
              fullWidth
              color='primary'
              onChange={handleRotate}
              aria-label="tipos de reflexão"
            >
              <ToggleButton value={TipoRotacao.XY} aria-label={TipoRotacao.XY}>
                Eixo XY
              </ToggleButton>
              <ToggleButton value={TipoRotacao.XZ} aria-label={TipoRotacao.XZ}>
                Eixo YZ
              </ToggleButton>
              <ToggleButton value={TipoRotacao.XZ} aria-label={TipoRotacao.XZ} >
                Eixo XZ
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {
            alignment === TipoReflexao.FUNCAO && <Grid item sm={12} container direction="row">
              <Grid item sm={6} className={classes.espacamento}>
                <TextField
                  id="x"
                  value={entrada1}
                  label="Variavel M"
                  variant="standard"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">X</InputAdornment>
                  }}
                  fullWidth
                  onChange={e => tratamentoEntrada(e.target.value, setEntrada1)}
                />
              </Grid>
              <Grid item sm={6} className={classes.espacamento}>
                <TextField
                  id="y"
                  value={entrada2}
                  label="Variavel B"
                  variant="standard"
                  fullWidth
                  onChange={e => tratamentoEntrada(e.target.value, setEntrada2)}
                />
              </Grid>

            </Grid>
          }

        </Grid>
      case TipoTransfomacoes.TRANSLACAO:
        return <Grid item container sm={12} direction="row">
          <Grid item sm={4} className={classes.espacamento}>
            <TextField
              id="x"
              value={entrada1}
              label="Ponto X"
              variant="standard"
              fullWidth
              onChange={e => tratamentoEntrada(e.target.value, setEntrada1)}

            />
          </Grid>
          <Grid item sm={4} className={classes.espacamento}>
            <TextField
              id="y"
              value={entrada2}
              label="Ponto Y"
              variant="standard"
              fullWidth
              type="number"
              onChange={e => tratamentoEntrada(e.target.value, setEntrada2)}

            />
          </Grid>
          <Grid item sm={4} className={classes.espacamento}>
            <TextField
              id="z"
              value={entrada3}
              label="Ponto Z"
              variant="standard"
              fullWidth
              type="number"
              onChange={e => tratamentoEntrada(e.target.value, setEntrada3)}

            />
          </Grid>
        </Grid>
      default:
        return "Opção não selecionada"
    }
  }

  const calcular = (label: any, entrada1: number, entrada2: number, entrada3: number) => {
    switch (label) {
      case TipoTransfomacoes.CISALHAMENTO:
        operarMatriz.push({
          nome: TipoTransfomacoes.CISALHAMENTO,
          x: entrada1,
          y: entrada2,
          z: entrada3,
          matriz: [[1, 0, entrada1, 0,], [0, 1, entrada2, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
        })
        break
      case TipoTransfomacoes.ESCALA:
        operarMatriz.push({
          nome: TipoTransfomacoes.ESCALA,
          x: entrada1,
          y: entrada2,
          z: entrada3,
          matriz: [[entrada1, 0, 0, 0,], [0, entrada2, 0, 0], [0, 0, entrada3, 0], [0, 0, 0, 1]]
        })
        break
      case TipoTransfomacoes.REFLEXAO:
        if (alignment === TipoReflexao.XY) {
          operarMatriz.push({
            nome: "Reflexão em XY",
            x: 0,
            y: 0,
            z: 0,
            matriz: [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]]

          })
        }
        if (alignment === TipoReflexao.YZ) {
          operarMatriz.push({
            nome: "Reflexão em YZ",
            x: 0,
            y: 0,
            z: 0,
            matriz: [[-1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]

          })
        }
        if (alignment === TipoReflexao.ORIGEM) {
          operarMatriz.push({
            nome: "Reflexão na origem",
            x: 0,
            y: 0,
            z: 0,
            matriz: [[-1, 0, 0, 0], [0, -1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
          })
        }
      /*  if (alignment === TipoReflexao.FUNCAO) {
          //  const sen = (ponto_x) / Math.sqrt((Math.pow(ponto_x, 2) + 1))
          const sen = Math.sin(entrada1)
          const cos = Math.cos(entrada2)
          // const cos = 1 / Math.sqrt((Math.pow(ponto_x, 2) + 1))
          operarMatriz.push({
            nome: TipoTransfomacoes.TRANSLACAO + "(Reflexão em função)",
            x: 0,
            y: 0,
            matriz: [[1, 0, 0 * -1], [0, 1, 0 * -1], [0, 0, 1]]
          })
          operarMatriz.push({
            nome: TipoTransfomacoes.ROTACAO + "(Reflexão em função)",
            x: 0,
            y: 0,
            matriz: [[cos, sen * -1, 0], [sen, cos, 0], [0, 0, 1]]
          })

          operarMatriz.push({
            nome: TipoTransfomacoes.REFLEXAO + "(Reflexão em função)",
            x: 0,
            y: 0,
            matriz: [[cos, sen * -1, 0], [sen, cos, 0], [0, 0, 1]]
          })
          operarMatriz.push({
            nome: TipoTransfomacoes.ROTACAO + "(Reflexão em função)",
            x: 0,
            y: 0,
            matriz: [[cos, sen, 0], [sen * -1, cos, 0], [0, 0, 1]]
          })
          operarMatriz.push({
            nome: TipoTransfomacoes.TRANSLACAO + "(Reflexão em função)",
            x: 0,
            y: 0,
            matriz: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
          })
        }*/
        break
      case TipoTransfomacoes.ROTACAO:
        let cos = Math.cos(entrada1)
        let sen = Math.sin(entrada2)

        if (alignment === TipoRotacao.XY) {
          operarMatriz.push({
            nome: "Rotação em XY",
            x: 0,
            y: 0,
            z: 0,
            matriz: [[1, 0, 0, 0], [0, cos, -sen, 0], [0, sen, cos, 0], [0, 0, 0, 1]]
          })
        }
        if (alignment === TipoReflexao.YZ) {
          operarMatriz.push({
            nome: "Reflexão em YZ",
            x: 0,
            y: 0,
            z: 0,
            matriz: [[cos, 0, sen, 0], [0, 1, 0, 0], [sen * -1, 0, cos, 0], [0, 0, 0, 1]]
          })
        }
        break
      case TipoTransfomacoes.TRANSLACAO:
        operarMatriz.push({
          nome: TipoTransfomacoes.TRANSLACAO,
          x: entrada1,
          y: entrada2,
          z: entrada3,
          matriz: [[1, 0, 0, entrada1], [0, 1, 0, entrada2], [0, 0, 1, entrada3], [0, 0, 0, 1]]
        })
        break
      default:
        return "Operação não selecionada"
    }
  }
  return <Grid container direction="row" alignContent="center" alignItems="center">
    <Grid item sm={12} xl={12} p={2}>
      <Typography variant="h5" align="center">Perspectiva</Typography>
    </Grid>
    <Grid item sm={6}>
      <Painel vertices={vertices} cores={cores} indices={indices} mov_matrix={mov_matrix} view_matrix={view_matrix} />
    </Grid>
    <Grid item sm={6}>
      <Button onClick={() => { setMov_matriz(rotacaoX(mov_matrix, 1)) }}>Rotacionar no X</Button>
      <Button onClick={() => { setMov_matriz(rotacaoY(mov_matrix, 1)) }}>Rotacionar no Y</Button>
      <Button onClick={() => { setMov_matriz(rotacaoZ(mov_matrix, 1)) }}>Rotacionar no Z</Button>
      <Button onClick={() => { setMov_matriz(translacao(mov_matrix, 1, 1, 0)) }}>Translação</Button>
      <Button onClick={() => { setMov_matriz(escala(mov_matrix, 1.2, 1.2, 1.2)) }}>Escala</Button>
      <Button onClick={() => { setMov_matriz(cizalhamento(mov_matrix, 1.2, 1.2)) }}>Escala</Button>
      <Grid item sm={12} xl={12} p={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
            centered>
            <Tab label="Adicionar modificação" {...a11yProps(0)} />
            <Tab label="Historico" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-around"
          >
            <Grid item sm={12}>
              <FormControl >
                <FormLabel >Tipos</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="opcao-label"
                  name="opcao-group"
                  value={opcao}
                  onChange={e => setOpcao(e.target.value)}
                >
                  {
                    Object.values(TipoTransfomacoes).map((item, index) =>
                      <FormControlLabel key={index} value={item} control={<Radio />} label={item} />
                    )
                  }
                </RadioGroup>
              </FormControl>
            </Grid>
            {entradas(opcao)}
            <Grid item sm={12} bottom="5%" position="absolute" >
              <Button variant="contained" fullWidth
                onClick={() => calcular(opcao, entrada1, entrada2, entrada3)}
              >Adicionar transformação</Button>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-around"
          >
            <Grid item sm={12} marginY={2}>
              <TableContainer sx={{ maxHeight: 250 }}>
                <Table stickyHeader size="small" aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ color: "white" }} colSpan={4}>
                        Transformação
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        Ação
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center" sx={{ color: "white" }}>
                        Nome
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        X
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        Y
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        Z
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>

                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {operarMatriz.map((matriz: any, index) => (
                      <TableRow key={index}>
                        <TableCell align="center" sx={{ color: "white" }} >{matriz.nome}</TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>{matriz.x}</TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>{matriz.y}</TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>{matriz.z}</TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          <IconButton
                            aria-label="delete"
                            size="small"

                            onClick={() => {
                              const newMatriz = [...operarMatriz]
                              newMatriz.splice(index, 1)
                                 setOperarMatriz(newMatriz)
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item sm={12} bottom="5%" position="absolute" >
              <Button variant="contained" fullWidth>Fazer transformação</Button>
            </Grid>
          </Grid>
        </CustomTabPanel>
      </Grid>
    </Grid>
  </Grid>
}
export default Trasformacao3D    