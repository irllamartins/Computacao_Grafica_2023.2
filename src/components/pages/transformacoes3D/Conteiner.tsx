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
    matriz: Array<number[]>
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
    X = "x",
    Y = "y",
    Z = "z",
    ORIGEM = "origem",
    FUNCAO = "funcao"
}

const Conteiner = () => {
    const classes = useStyles()

    const [value, setValue] = React.useState<number>(0)
    const [opcao, setOpcao] = React.useState("")
    const [x, setX] = React.useState<number>(0)
    const [y, setY] = React.useState<number>(0)
    const [z, setZ] = React.useState<number>(0)
    const [ponto_x, setPonto_x] = React.useState<number>(10)
    const [ponto_y, setPonto_y] = React.useState<number>(10)
    const [ponto_z, setPonto_z] = React.useState<number>(10)
    const [grau, setGrau] = React.useState(5)
    const [alignment, setAlignment] = React.useState<string | null>()
    const [figura, setFigura] = React.useState<number[][]>([[0, 0, 1], [0, 100, 1], [100, 0, 1], [0, 0, 1]])
    const [operarMatriz, setOperarMatriz] = React.useState<Transformacao[]>([])

    const altura = (TAMANHO_CANVAS / 2) - y
    const largura = (TAMANHO_CANVAS / 2) + x

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const tratamentoEntrada = (texto: any, setEntrada: any) => {

        if (texto === "") {
            setEntrada(0);
        } else {
            setEntrada(texto.replace(/[a-zA-Z]/g, '').replace(/^0+(?=[\d-])/, '').replace(/,/g, '.'))
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
                    matriz: [[1, ponto_x, 0], [ponto_y, 1, 0], [0, 0, ponto_z]]
                })
                break
            case TipoTransfomacoes.ESCALA:
                operarMatriz.push({
                    nome: TipoTransfomacoes.ESCALA,
                    x: ponto_x,
                    y: ponto_y,
                    z: ponto_z,
                    matriz: [[ponto_x, 0, 0], [0, ponto_y, 0], [0, 0,  ponto_z]]
                })
                break
            case TipoTransfomacoes.REFLEXAO:
                if (alignment === TipoReflexao.X) {
                    operarMatriz.push({
                        nome: "Reflexão em X",
                        x: 1,
                        y: -1,
                        z: 1,
                        matriz: [[x, 0, 0], [0, y, 0], [0, 0, z]]
                    })
                }
                if (alignment === TipoReflexao.Y) {
                    operarMatriz.push({
                        nome: "Reflexão em Y",
                        x: -1,
                        y: 1,
                        z: 1,
                        matriz: [[x, 0, 0], [0, y, 0], [0, 0, z]],
                    })
                }if (alignment === TipoReflexao.Z) {
                    operarMatriz.push({
                        nome: "Reflexão em Y",
                        x: -1,
                        y: 1,
                        z: -1,
                        matriz: [[x, 0, 0], [0, y, 0], [0, 0, z]],
                    })
                }
                if (alignment === TipoReflexao.ORIGEM) {
                    operarMatriz.push({
                        nome: "Reflexão na origem",
                        x: -1,
                        y: -1,
                        z: 1,
                        matriz: [[x, 0, 0], [0, y, 0], [0, 0, z]]
                    })
                }
                if (alignment === TipoReflexao.FUNCAO) {
                    const sen = (ponto_x) / Math.sqrt((Math.pow(ponto_x, 2) + 1))
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
                        matriz: [[cos, sen, 0], [sen * -1, cos, 0], [0, 0, z]]
                    })
                    operarMatriz.push({
                        nome: TipoTransfomacoes.TRANSLACAO + "(Reflexão em função)",
                        x: 0,
                        y: 0,
                        z: 1,
                        matriz: [[1, 0, 0], [0, 1, 0], [0, 0, z]]
                    })
                }
                break
            case TipoTransfomacoes.ROTACAO:
                operarMatriz.push({
                    nome: TipoTransfomacoes.ROTACAO,
                    x: grau,
                    y: "",
                    z: 1,
                    matriz: [[Math.cos(grau), Math.sin(grau) * -1, 0], [Math.sin(grau), Math.cos(grau), 0], [0, 0, z]]
                })
                break
            case TipoTransfomacoes.TRANSLACAO:
                operarMatriz.push({
                    nome: TipoTransfomacoes.TRANSLACAO,
                    x: ponto_x,
                    y: ponto_y,
                    z: ponto_z,
                    matriz: [[1, 0, ponto_x], [0, 1, ponto_y], [0, 0,  ponto_z]]
                })
                break
            default:
                return "Operação não selecionada"
        }
    }

    const addPonto = (x: number, y: number, z: number, figura: any) => {
        const newArray = [x, y, z];
        setFigura(prevArrays => [...prevArrays, newArray]);
        console.log("figura",figura)
    }

    // transforma linha para coluna e coluna para linha
    const formataMatriz = (array: any) => {
        let lista = []

        for (let i = 0; i < array[0].length; i++) {
            const ponto = []
            for (let j = 0; j < array.length; j++) {
                ponto.push(array[j][i])
            }
            lista.push(ponto)

        }
        console.log("listasPontos", lista)
        return lista
    }

    const calculaOperacao = (pontos: Array<number[]>, operarMatriz: Transformacao[]) => {
        const operacoes: Transformacao[] = [...operarMatriz]
        let resultado: number[][] | undefined = [...pontos]

        while (operacoes.length > 0) {
            let operacaoAtual = operacoes.shift()
            console.log("matriz cap:", operacaoAtual)
            resultado = (operacaoAtual?.matriz && resultado) ? multiplicacaoOperacoes(operacaoAtual?.matriz, resultado) : undefined
        }

        console.log("matriz", resultado)
        setFigura(resultado ? resultado : [])
    }

    const multiplicacaoOperacoes = (operacao: number[][], resultado: number[][]): number[][] => {
        const novoResultado: number[][] = []

        console.log("operacao", operacao, "|resultado|", resultado)
        for (let i = 0; i < operacao.length; i++) {
            novoResultado[i] = [];

            for (let j = 0; j < resultado.length; j++) {
                let soma = 0;

                for (let k = 0; k < operacao[0].length; k++) {
                    // console.log("mult", resultado, "|", operacao)
                    console.log("|", operacao[i][k], "|", resultado[j][k])
                    soma += operacao[i][k] * resultado[j][k];
                }
                // console.log("soma", soma)
                novoResultado[i][j] = soma;
                //  console.log("matriz soma", novoResultado[i][j])
            }

        }
        return formataMatriz(novoResultado)
    }

    const entradas = (opcao: string) => {
        switch (opcao) {
            case TipoTransfomacoes.CISALHAMENTO:
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
                            <ToggleButton value={TipoReflexao.X} aria-label={TipoReflexao.X}>
                                Eixo X
                            </ToggleButton>
                            <ToggleButton value={TipoReflexao.Y} aria-label={TipoReflexao.Y}>
                                Eixo Y
                            </ToggleButton>
                            <ToggleButton value={TipoReflexao.Y} aria-label={TipoReflexao.Z}>
                                Eixo Z
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
                return <Grid item sm={12}>
                    <TextField
                        id="grau"
                        value={grau}
                        variant="standard"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">graus</InputAdornment>,
                        }}
                        fullWidth
                        onChange={e => tratamentoEntrada(e.target.value, setGrau)}
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
                    altura={altura}
                    largura={largura}
                    x={0} y={0}
                    figura={figura} />
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
                            <Tab label="Desenhar figura" {...a11yProps(0)} />
                            <Tab label="Adicionar modificação" {...a11yProps(1)} />
                            <Tab label="Historico" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Grid container direction="row" >
                            <Grid item sm={4} className={classes.espacamento}>
                                <TextField
                                    id="x"
                                    value={x}
                                    label="Ponto X"
                                    variant="standard"
                                    fullWidth
                                    onChange={e => tratamentoEntrada(e.target.value, setX)}

                                />
                            </Grid>
                            <Grid item sm={4} className={classes.espacamento}>
                                <TextField
                                    id="y"
                                    value={y}
                                    label="Ponto Y"
                                    variant="standard"
                                    fullWidth
                                    onChange={e => tratamentoEntrada(e.target.value, setY)}

                                />
                            </Grid>
                            <Grid item sm={3} className={classes.espacamento}>
                                <TextField
                                    id="z"
                                    value={z}
                                    label="Ponto Z"
                                    variant="standard"
                                    fullWidth
                                    onChange={e => tratamentoEntrada(e.target.value, setZ)}

                                />
                            </Grid>
                            <Grid item sm={1} className={classes.espacamento}>
                                <IconButton onClick={() => addPonto(x, y, z, figura)}>
                                    <Add />
                                </IconButton>
                            </Grid>
                            <Grid item sm={12} marginY={2}>
                                <TableContainer sx={{ maxHeight: 250 }}>
                                    <Table stickyHeader size="small" aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" colSpan={3}>
                                                    Pontos
                                                </TableCell>
                                                <TableCell align="center" colSpan={4}>
                                                    Ação
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center">X</TableCell>
                                                <TableCell align="center">Y</TableCell>
                                                <TableCell align="center">Z</TableCell>
                                                <TableCell align="center"/>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {figura.map((ponto, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="center">{ponto[0]}</TableCell>
                                                    <TableCell align="center">{ponto[1]}</TableCell>
                                                    <TableCell align="center">{ponto[2]}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            aria-label="delete"
                                                            size="small"

                                                            onClick={() => {
                                                                const newFigura = [...figura]
                                                                newFigura.splice(index, 1)
                                                                setFigura(newFigura)
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
                        </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
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
                    <CustomTabPanel value={value} index={2}>
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
                                                <TableCell align="center" colSpan={2}>
                                                    Transformação
                                                </TableCell>
                                                <TableCell align="center" colSpan={3}>
                                                    Pontos
                                                </TableCell>
                                                <TableCell align="center" colSpan={5}>
                                                    Ação
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center" colSpan={2} />
                                                <TableCell align="center">X</TableCell>
                                                <TableCell align="center">Y</TableCell>
                                                <TableCell align="center">Z</TableCell>
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
                                <Button variant="contained" fullWidth onClick={() => calculaOperacao(figura, operarMatriz)}>Fazer transformação</Button>
                            </Grid>
                        </Grid>
                    </CustomTabPanel>
                </Grid>
            </Grid>
        </Grid >
    )
}
export default Conteiner