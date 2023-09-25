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
import Painel from './painel'
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


const matriz: number[][] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
const operarMatriz: number[][][] = []

enum TipoTransfomacoes {
    TRANSLACAO = "Translação",
    ROTACAO = "Rotação",
    ESCALA = "Escala",
    CISALHAMENTO = "Cisalhamento",
    REFLEXAO = "Reflexão"
}
enum TipoReflexao{
    X = "x",
    Y = "y",
    ORIGEM = "origem",
    FUNCAO = "funcao"
}

const Conteiner = () => {
    const classes = useStyles()

    const [value, setValue] = React.useState<number>(0)
    const [opcao, setOpcao] = React.useState("")
    const [x, setX] = React.useState<number>(0)
    const [y, setY] = React.useState<number>(0)
    const [ponto_x, setPonto_x] = React.useState<number>(10)
    const [ponto_y, setPonto_y] = React.useState<number>(10)
    const [grau, setGrau] = React.useState(5)
    const [alignment, setAlignment] = React.useState<string | null>()
    const [figura, setFigura] = React.useState<number[][]>([[0, 0], [0, 100], [100, 0], [0, 0]])

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

    const Operacoes = {
        TRANSLACAO: [],
        ESCALA: [[ponto_x, 0], [0, ponto_y]],
        ROTACAO: [[Math.cos(grau), Math.sin(grau) * -1], [Math.sin(grau), Math.cos(grau)]],
        CISALHAMENTO: [[1, ponto_x], [ponto_y, 1]],
        REFLEXAO_X: [[1, 0], [0, -1]],
        REFLEXAO_Y: [[-1, 0], [0, 1]],
        REFLEXAO_ORIGEM: [[-1, 0], [0, -1]],
        REFLEXAO_FUNCAO: [[0, 1], [1, 0]]
    }

    const calcular = (label: any) => {
        switch (label) {
            case TipoTransfomacoes.CISALHAMENTO:
                addCizalhamneto(ponto_x, ponto_y)
                break
            case TipoTransfomacoes.ESCALA:
                addEscala(figura)
                break
            case TipoTransfomacoes.REFLEXAO:
                    addReflexao(grau)
                break
            case TipoTransfomacoes.ROTACAO:
                addRotacao(figura)
                break
            case TipoTransfomacoes.TRANSLACAO:
                addTranslacao(ponto_x, ponto_y)
                break
            default:
                return "Operação não selecionada"
        }
    }

    const addPonto = (x: number, y: number, figura: any) => {
        const newArray = [x, y];
        setFigura(prevArrays => [...prevArrays, newArray]);
        console.log(figura)
    }
    const addTranslacao = (x: number, y: number) => {
        let operacao = [...figura]

        for (let i = 0; i < operacao.length; i++) {
            operacao[i][0] = operacao[i][0] + x
            operacao[i][1] = operacao[i][1] + y
        }
        setFigura(operacao)
    }

    const addCizalhamneto = (x: number, y: number) => {
        let operacao = [...matriz]
        operacao[0][1] = x
        operacao[0][0] = y
        operarMatriz.push(operacao)
        console.log("matriz", operacao)
    }

    const addEscala = (figura: number[][]) => {
        let operacao = [...figura]
        setFigura(multiplicacaoOperacoes(Operacoes.ESCALA, operacao))

    }
    const addRotacao = (figura: number[][]) => {
        let operacao = [...figura]
        setFigura(multiplicacaoOperacoes(Operacoes.ROTACAO, operacao))
    }

    const addReflexao = (escala: number) => {
        let operacao = [...matriz]
        if(alignment===TipoReflexao.X){
            setFigura(multiplicacaoOperacoes(Operacoes.REFLEXAO_X, operacao))
        }
        if(alignment===TipoReflexao.Y){
            setFigura(multiplicacaoOperacoes(Operacoes.REFLEXAO_Y, operacao))
        }
        if(alignment===TipoReflexao.ORIGEM){
            setFigura(multiplicacaoOperacoes(Operacoes.REFLEXAO_ORIGEM, operacao))
        }
        if(alignment===TipoReflexao.FUNCAO){
            setFigura(multiplicacaoOperacoes(Operacoes.REFLEXAO_FUNCAO, operacao))
        }
        console.log("matriz", operacao)
    }

    /*const calculaOperacao = () => {
         let operacoes = [...operarMatriz];
         let resultado: number[][] = [...figura];
 
 
         while (operacoes.length > 0) {
             let operacaoAtual = operacoes.shift();
 
             if (operacaoAtual && operacaoAtual.length === resultado[0].length) {
                 resultado = multiplicacaoOperacoes(operacaoAtual, resultado);
             }
             else {
                 console.log("Não é possível operar matriz");
                 operacoes = [];
             }
         }
 
         console.log("matriz", resultado);
     }*/

    const multiplicacaoOperacoes = (operacao: number[][], resultado: number[][]): number[][] => {
        const novoResultado: number[][] = []
        for (let i = 0; i < resultado.length; i++) {
            novoResultado[i] = [];

            for (let j = 0; j < operacao[0].length; j++) {
                let soma = 0;
                // console.log("entrei")
                for (let k = 0; k < operacao.length; k++) {
                    // console.log("mult", resultado, "|", operacao)
                    console.log("soma", soma, "|", resultado[i][k], "|", operacao[k][j])
                    soma += resultado[i][k] * operacao[k][j];
                }

                novoResultado[i][j] = soma;
                //  console.log("matriz soma", novoResultado[i][j])
            }
        }

        return novoResultado;
    }

    /*const produtoMatrizes = (matriz1: number[][], matriz2: number[][]) => {

        let resultado: number[][] = []

        for (let i = 0; i < matriz1[0].length; i++) {
            for (let j = 0; j < matriz2.length; j++) {
                let somatoria = 0

                for (let k = 0; k < matriz1.length; k++) {

                    let produto = matriz1[i][k] * matriz2[k][j];
                    somatoria += produto
                }
                resultado[i][j] = somatoria
            }

        }
    }*/

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
                            <ToggleButton value={TipoReflexao.ORIGEM} aria-label={TipoReflexao.ORIGEM} >
                                Na origem
                            </ToggleButton>
                            <ToggleButton value={TipoReflexao.FUNCAO}  aria-label={TipoReflexao.FUNCAO} >
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
                                    label="Ponto X"
                                    variant="standard"
                                    fullWidth
                                    onChange={e => tratamentoEntrada(e.target.value, setPonto_x)}
                                />
                            </Grid>
                            <Grid item sm={6} className={classes.espacamento}>
                                <TextField
                                    id="y"
                                    value={ponto_y}
                                    label="Ponto Y"
                                    variant="standard"
                                    fullWidth
                                    onChange={e => tratamentoEntrada(e.target.value, setPonto_y)}
                                />
                            </Grid>
                        </Grid>
                    }

                </Grid>
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
                    <Grid item sm={6} className={classes.espacamento}>
                        <TextField
                            id="x"
                            value={ponto_x}
                            label="Ponto X"
                            variant="standard"
                            fullWidth
                            onChange={e => tratamentoEntrada(e.target.value, setPonto_x)}

                        />
                    </Grid>
                    <Grid item sm={6} className={classes.espacamento}>
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
                            <Grid item sm={5} className={classes.espacamento}>
                                <TextField
                                    id="x"
                                    value={x}
                                    label="Ponto X"
                                    variant="standard"
                                    fullWidth
                                    onChange={e => tratamentoEntrada(e.target.value, setX)}

                                />
                            </Grid>
                            <Grid item sm={5} className={classes.espacamento}>
                                <TextField
                                    id="y"
                                    value={y}
                                    label="Ponto Y"
                                    variant="standard"
                                    fullWidth
                                    onChange={e => tratamentoEntrada(e.target.value, setY)}

                                />
                            </Grid>
                            <Grid item sm={2} className={classes.espacamento}>
                                <IconButton onClick={() => addPonto(x, y, figura)}>
                                    <Add />
                                </IconButton>
                            </Grid>
                            <Grid item sm={12} marginY={2}>
                                <TableContainer sx={{ maxHeight: 250 }}>
                                    <Table stickyHeader size="small" aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" colSpan={2}>
                                                    Pontos
                                                </TableCell>
                                                <TableCell align="center" colSpan={3}>
                                                    Ação
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center">X</TableCell>
                                                <TableCell align="center">Y</TableCell>
                                                <TableCell align="center" />

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {figura.map((ponto, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="center">{ponto[0]}</TableCell>
                                                    <TableCell align="center">{ponto[1]}</TableCell>
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
                                <Button variant="contained" fullWidth onClick={() => calcular(opcao)}>Adicionar transformação</Button>
                            </Grid>
                        </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        Item Two
                    </CustomTabPanel>
                </Grid>
            </Grid>
        </Grid >
    )
}
export default Conteiner