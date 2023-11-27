import {
    TextField,
    Grid,
    Typography,
    MenuItem,
    Button,
    Box,
    Tabs,
    Tab,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputAdornment,
    ButtonGroup,
    ToggleButton,
    ToggleButtonGroup,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton
} from '@mui/material'
import { makeStyles } from '@mui/styles';
import Painel from './Painel'
import React, { useEffect, useState } from 'react';
import { Add, Delete } from '@mui/icons-material';
import { cisalhamento, escala, reflexaoXY, reflexaoXZ, reflexaoYZ, rotacaoX, rotacaoY, rotacaoZ, translacao } from './Operacoes';

const useStyles = makeStyles({
    espacamento: {
        padding: "5px"
    },
    header: {
        // backgroundColor: "green",
        paddingTop: "1%",
        paddingBottom: "1%",
        paddingInline: "1%",
    },
    teste2: {
        backgroundColor: "gray"
    },
})

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


const TAMANHO_CANVAS = 500

interface Transformacao {
    nome: string
    x: any
    y: any
    z: any
    // matriz: Array<number[]>
}
const matriz: number[][] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]


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
    X = "x",
    Y = "y",
    Z = "z"
}

const Conteiner = () => {
    const classes = useStyles()

    const [value, setValue] = React.useState<number>(0)
    const [opcao, setOpcao] = React.useState("")
    const [x, setX] = React.useState<number>(0)
    const [y, setY] = React.useState<number>(0)
    const [z, setZ] = React.useState<number>(0)
    const [ponto_x, setPonto_x] = React.useState<number>(1)
    const [ponto_y, setPonto_y] = React.useState<number>(1)
    const [ponto_z, setPonto_z] = React.useState<number>(1)
    const [angulo, setAngulo] = React.useState(5)
    const [tipoReflexao, setTipoReflexao] = React.useState<string | null>()
    const [tipoRotacao, setTipoRotacao] = React.useState<string | null>()
    const [operarMatriz, setOperarMatriz] = React.useState<Transformacao[]>([])

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

    const calcular = (label: any, ponto_x: number, ponto_y: number, ponto_z: number) => {
        switch (label) {
            case TipoTransfomacoes.CISALHAMENTO:
                operarMatriz.push({
                    nome: TipoTransfomacoes.CISALHAMENTO,
                    x: ponto_x,
                    y: ponto_y,
                    z: ponto_z,
                })
                break
            case TipoTransfomacoes.ESCALA:
                operarMatriz.push({
                    nome: TipoTransfomacoes.ESCALA,
                    x: ponto_x,
                    y: ponto_y,
                    z: ponto_z,
                })
                break
            case TipoTransfomacoes.REFLEXAO:
                if (tipoReflexao === TipoReflexao.XY) {
                    operarMatriz.push({
                        nome: TipoTransfomacoes.REFLEXAO,
                        x: 1,
                        y: 1,
                        z: -1,
                    })
                }
                if (tipoReflexao === TipoReflexao.YZ) {
                    operarMatriz.push({
                        nome: TipoTransfomacoes.REFLEXAO,
                        x: -1,
                        y: 1,
                        z: 1,
                    })
                } if (tipoReflexao === TipoReflexao.XZ) {
                    operarMatriz.push({
                        nome: TipoTransfomacoes.REFLEXAO,
                        x: 1,
                        y: -1,
                        z: 1,

                    })
                }
                if (tipoReflexao === TipoReflexao.ORIGEM) {
                    operarMatriz.push({
                        nome: "Reflexão na origem",
                        x: -1,
                        y: -1,
                        z: 1,
                    })
                }
                if (tipoReflexao === TipoReflexao.FUNCAO) {
                    /* const sen = (ponto_x) / Math.sqrt((Math.pow(ponto_x, 2) + 1))
                     const cos = 1 / Math.sqrt((Math.pow(ponto_x, 2) + 1))
                     operarMatriz.push({
                         nome: TipoTransfomacoes.TRANSLACAO + "(Reflexão em função)",
                         x: 0,
                         y: 0,
                         z: 1,
                         matriz: [[x, 0, 0], [0, y, 0], [0, 0, z]]
                     })
                     operarMatriz.push({
                         nome: TipoTransfomacoes.ROTACAO + "(Reflexão em função)",
                         x: 0,
                         y: 0,
                         z: 1,
                         matriz: [[cos, sen * -1, 0], [sen, cos, 0], [0, 0, z]]
                     })
 
                     operarMatriz.push({
                         nome: TipoTransfomacoes.REFLEXAO + "(Reflexão em função)",
                         x: 0,
                         y: 0,
                         z: 1,
                         matriz: [[cos, sen * -1, 0], [sen, cos, 0], [0, 0, z]]
                     })
                     operarMatriz.push({
                         nome: TipoTransfomacoes.ROTACAO + "(Reflexão em função)",
                         x: 0,
                         y: 0,
                         z: 1,
                         matriz: [[cos, sen,0, 0], [sen * -1, cos, 0], [0, 0,0, z],[0,0,0,1]]
                     })
                     operarMatriz.push({
                         nome: TipoTransfomacoes.TRANSLACAO + "(Reflexão em função)",
                         x: 0,
                         y: 0,
                         z: 1,
                         matriz: [[1, 0, 0,0], [0, 1, 0,0], [0, 0,0, z],[0,0,0,1]]
                     })*/
                }
                break
            case TipoTransfomacoes.ROTACAO:

                if (tipoRotacao === TipoRotacao.X) {
                    operarMatriz.push({
                        nome: TipoTransfomacoes.ROTACAO,
                        x: angulo,
                        y: 0,
                        z: 0,
                    })
                }
                if (tipoRotacao === TipoRotacao.Y) {
                    operarMatriz.push({
                        nome: TipoTransfomacoes.ROTACAO,
                        x: 0,
                        y: angulo,
                        z: 0,
                    })
                } if (tipoRotacao === TipoRotacao.Z) {
                    operarMatriz.push({
                        nome: TipoTransfomacoes.ROTACAO,
                        x: 0,
                        y: 0,
                        z: angulo,
                    })
                }
                break
            case TipoTransfomacoes.TRANSLACAO:
                operarMatriz.push({
                    nome: TipoTransfomacoes.TRANSLACAO,
                    x: ponto_x,
                    y: ponto_y,
                    z: ponto_z,
                })
                break
            default:
                return "Operação não selecionada"
        }
    }

    // transforma linha para coluna e coluna para linha
    /*  const formataMatriz = (array: any) => {
          let lista = []
  
          for (let i = 0; i < array[0].length; i++) {
              const ponto = []
              for (let j = 0; j < array.length; j++) {
                  ponto.push(array[j][i])
              }
              lista.push(ponto)
  
          }
          // console.log("listasPontos", lista)
          return lista
      }*/

    /*const calculaOperacao = (pontos: Array<number>, operarMatriz: Transformacao[]) => {
        const operacoes: Transformacao[] = [...operarMatriz]
        let resultado: number[][] | undefined = [
            [pontos[0], pontos[1], pontos[2], pontos[3]],
            [pontos[4], pontos[5], pontos[6], pontos[7]],
            [pontos[8], pontos[9], pontos[10], pontos[11]],
            [pontos[12], pontos[13], pontos[14], pontos[15]]
        ];

        while (operacoes.length > 0) {
            let operacaoAtual = operacoes.shift()
            console.log("matriz cap:", operacaoAtual)
            resultado = (operacaoAtual?.matriz && resultado) ? multiplicacaoOperacoes(resultado, operacaoAtual?.matriz) : undefined
        }
        const resultadoArray = resultado ? resultado.flat() : []

        for (let i = 0; i < resultadoArray.length; i++) {
            pontos[i] = resultadoArray[i];
        }
        console.log("matriz", resultado,"|",pontos)
        setMov_matriz(pontos)
    }*/

    const calculaOperacao = (pontos: Array<number>, operarMatriz: Transformacao[]) => {
        const operacoes: Transformacao[] = [...operarMatriz]
        let resultado: number[][] | undefined = [
            [pontos[0], pontos[1], pontos[2], pontos[3]],
            [pontos[4], pontos[5], pontos[6], pontos[7]],
            [pontos[8], pontos[9], pontos[10], pontos[11]],
            [pontos[12], pontos[13], pontos[14], pontos[15]]
        ]

        while (operacoes.length > 0) {
            let operacaoAtual = operacoes.shift()

            switch (operacaoAtual?.nome) {
                case TipoTransfomacoes.TRANSLACAO:
                    resultado = (operacaoAtual && resultado) && translacao(resultado, operacaoAtual.x, operacaoAtual.y, operacaoAtual.z)
                    break
                case TipoTransfomacoes.ESCALA:
                    resultado = (operacaoAtual && resultado) && escala(resultado, operacaoAtual.x, operacaoAtual.y, operacaoAtual.z)
                    break
                case TipoTransfomacoes.CISALHAMENTO:
                    resultado = (operacaoAtual && resultado) && cisalhamento(resultado, operacaoAtual.x, operacaoAtual.y)
                    break
                case TipoTransfomacoes.ROTACAO:
                    if (operacaoAtual.x !== 0) {
                        resultado = (operacaoAtual && resultado) && rotacaoX(resultado, operacaoAtual.x)
                    }
                    else if (operacaoAtual.y !== 0) {
                        resultado = (operacaoAtual && resultado) && rotacaoY(resultado, operacaoAtual.y)
                    }
                    else if (operacaoAtual.z !== 0) {
                        resultado = (operacaoAtual && resultado) && rotacaoZ(resultado, operacaoAtual.z)
                    }
                    break
                case TipoTransfomacoes.REFLEXAO:

                    // plano yz
                    if (operacaoAtual.x === -1) {
                        resultado = (operacaoAtual && resultado) && reflexaoYZ(resultado)
                    }
                    // plano xz
                    else if (operacaoAtual.y === -1) {
                        resultado = (operacaoAtual && resultado) && reflexaoXZ(resultado)
                    }
                    // plano xy
                    else if (operacaoAtual.z === -1) {
                        resultado = (operacaoAtual && resultado) && reflexaoXY(resultado)
                    }
                    break
                default:
                    return "Operação não selecionada"
            }
        }
        const resultadoArray = resultado ? resultado.flat() : []

        for (let i = 0; i < resultadoArray.length; i++) {
            pontos[i] = resultadoArray[i];
        }
        setMov_matriz(pontos)
    }
    const entradas = (opcao: string) => {
        switch (opcao) {
            case TipoTransfomacoes.CISALHAMENTO:
                return <Grid item container sm={12} direction="row">
                    <Grid item sm={6} className={classes.espacamento}>
                        <TextField
                            id="ponto_x"
                            value={ponto_x}
                            label="Ponto X"
                            variant="standard"
                            fullWidth
                            onChange={e => tratamentoEntrada(e.target.value, setPonto_x)}
                        />
                    </Grid>
                    <Grid item sm={6} className={classes.espacamento}>
                        <TextField
                            id="ponto_y"
                            value={ponto_y}
                            label="Ponto Y"
                            variant="standard"
                            fullWidth
                            onChange={e => tratamentoEntrada(e.target.value, setPonto_y)}

                        />
                    </Grid>
                </Grid>
            case TipoTransfomacoes.ESCALA:
                return <Grid item container sm={12} direction="row">
                    <Grid item sm={4} className={classes.espacamento}>
                        <TextField
                            id="ponto_x"
                            value={ponto_x}
                            label="Ponto X"
                            variant="standard"
                            fullWidth
                            onChange={e => tratamentoEntrada(e.target.value, setPonto_x)}

                        />
                    </Grid>
                    <Grid item sm={4} className={classes.espacamento}>
                        <TextField
                            id="ponto_y"
                            value={ponto_y}
                            label="Ponto Y"
                            variant="standard"
                            fullWidth
                            onChange={e => tratamentoEntrada(e.target.value, setPonto_y)}

                        />
                    </Grid>
                    <Grid item sm={4} className={classes.espacamento}>
                        <TextField
                            id="ponto_z"
                            value={ponto_z}
                            label="Ponto Z"
                            variant="standard"
                            fullWidth
                            onChange={e => tratamentoEntrada(e.target.value, setPonto_z)}

                        />
                    </Grid>
                </Grid>
            case TipoTransfomacoes.REFLEXAO:

                const handleTipoReflexao = (
                    event: React.MouseEvent<HTMLElement>,
                    newtipoReflexao: string | null,
                ) => {
                    setTipoReflexao(newtipoReflexao)
                }
                return <Grid item container sm={12}>
                    <Grid item sm={12} >
                        <ToggleButtonGroup
                            value={tipoReflexao}
                            exclusive
                            size='small'
                            fullWidth
                            color='primary'
                            onChange={handleTipoReflexao}
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
                        tipoReflexao === TipoReflexao.FUNCAO && <Grid item sm={12} container direction="row">
                            <Grid item sm={6} className={classes.espacamento}>
                                <TextField
                                    id="x"
                                    value={ponto_x}
                                    label="Variavel M"
                                    variant="standard"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">X</InputAdornment>
                                    }}
                                    fullWidth
                                    onChange={e => tratamentoEntrada(e.target.value, setPonto_x)}
                                />
                            </Grid>
                            <Grid item sm={6} className={classes.espacamento}>
                                <TextField
                                    id="y"
                                    value={ponto_y}
                                    label="Variavel B"
                                    variant="standard"
                                    fullWidth
                                    onChange={e => tratamentoEntrada(e.target.value, setPonto_y)}
                                />
                            </Grid>
                        </Grid>
                    }

                </Grid>
            //rotacionar em x, y, ou z
            case TipoTransfomacoes.ROTACAO:
                const handleTipoRotacao = (
                    event: React.MouseEvent<HTMLElement>,
                    novoTipoRotacao: string | null,
                ) => {
                    setTipoRotacao(novoTipoRotacao)
                }
                return <Grid item sm={12}>
                    <ToggleButtonGroup
                        value={tipoRotacao}
                        exclusive
                        size='small'
                        fullWidth
                        color='primary'
                        onChange={handleTipoRotacao}
                        aria-label="tipos de reflexão"
                    >
                        <ToggleButton value={TipoRotacao.X} aria-label={TipoRotacao.X}>
                            Eixo X
                        </ToggleButton>
                        <ToggleButton value={TipoRotacao.Y} aria-label={TipoRotacao.Y}>
                            Eixo Y
                        </ToggleButton>
                        <ToggleButton value={TipoRotacao.Z} aria-label={TipoRotacao.Z}>
                            Eixo Z
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <TextField
                        id="Angulo"
                        value={angulo}
                        variant="standard"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">graus</InputAdornment>,
                        }}
                        fullWidth
                        onChange={e => tratamentoEntrada(e.target.value, setAngulo)}
                    />

                </Grid>
            case TipoTransfomacoes.TRANSLACAO:
                return <Grid item container sm={12} direction="row">
                    <Grid item sm={4} className={classes.espacamento}>
                        <TextField
                            id="x"
                            value={ponto_x}
                            label="Ponto X"
                            variant="standard"
                            fullWidth
                            onChange={e => tratamentoEntrada(e.target.value, setPonto_x)}

                        />
                    </Grid>
                    <Grid item sm={4} className={classes.espacamento}>
                        <TextField
                            id="y"
                            value={ponto_y}
                            label="Ponto Y"
                            variant="standard"
                            fullWidth
                            type="number"
                            onChange={e => tratamentoEntrada(e.target.value, setPonto_y)}

                        />
                    </Grid>
                    <Grid item sm={4} className={classes.espacamento}>
                        <TextField
                            id="z"
                            value={ponto_z}
                            label="Ponto Z"
                            variant="standard"
                            fullWidth
                            type="number"
                            onChange={e => tratamentoEntrada(e.target.value, setPonto_z)}

                        />
                    </Grid>
                </Grid>
            default:
                return "Opção não selecionada"
        }
    }

    return (
        <Grid container direction="row" >
            <Grid item sm={6} xl={12} marginTop={5} >
                <Painel
                    tamanho={TAMANHO_CANVAS}
                    cores={cores}
                    indices={indices}
                    mov_matrix={mov_matrix}
                    view_matrix={view_matrix}
                    vertices={vertices} />
            </Grid>
            <Grid item sm={6} xl={12}>
                <Grid item sm={12} xl={12} p={2}>
                    <Typography variant="h5" align='center'>Transformações</Typography>
                </Grid>
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
                                <Button variant="contained" fullWidth onClick={() => calcular(opcao, ponto_x, ponto_y, ponto_z)}>Adicionar transformação</Button>
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
                                        <TableHead >
                                            <TableRow >
                                                <TableCell align="center" colSpan={2} sx={{ color: "white" }}>
                                                    Transformação
                                                </TableCell>
                                                <TableCell align="center" colSpan={3} sx={{ color: "white" }}>
                                                    Pontos
                                                </TableCell>
                                                <TableCell align="center" colSpan={5} sx={{ color: "white" }}>
                                                    Ação
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center" colSpan={2} />
                                                <TableCell align="center" sx={{ color: "white" }}>X</TableCell>
                                                <TableCell align="center" sx={{ color: "white" }}>Y</TableCell>
                                                <TableCell align="center" sx={{ color: "white" }}>Z</TableCell>
                                                <TableCell align="center" />

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {operarMatriz.map((matriz: Transformacao, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="center" colSpan={2} >{matriz.nome}</TableCell>
                                                    <TableCell align="center">{matriz.x}</TableCell>
                                                    <TableCell align="center">{matriz.y}</TableCell>
                                                    <TableCell align="center">{matriz.z}</TableCell>
                                                    <TableCell align="center">
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
                                <Button variant="contained" fullWidth onClick={() => calculaOperacao(mov_matrix, operarMatriz)}>Fazer transformação</Button>
                            </Grid>
                        </Grid>
                    </CustomTabPanel>
                </Grid>
            </Grid>
        </Grid >
    )
}
export default Conteiner