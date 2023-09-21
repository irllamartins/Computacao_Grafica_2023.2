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
    ToggleButtonGroup
} from '@mui/material'
import { makeStyles } from '@mui/styles';
import Painel from './painel'
import { useState } from 'react';

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
                    <Typography>{children}</Typography>
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




enum TipoTransfomacoes {
    TRANSLACAO = "Translação",
    ROTACAO = "Rotação",
    ESCALA = "Escala",
    CISALHAMENTO = "Cisalhamento",
    REFLEXAO = "Reflexão"
}
const Operacoes = {
    // metrica do mundo para normalização
    WD_NDC: "W.D para N.D.C",
    // normalização para o metrica do mundo
    NDC_WD: "N.D.C para W.D",
    // normalização para o dispositivo de exibição 
    NDC_DC: "N.D.C para D.C",
    // dispositivo de exibição para a normalização
    DC_NDC: "D.C para N.D.C",
    // metrica do mundo para diretamente o dispositivo de exibição
    WD_DC: "W.D para D.C",
    // dispositivo de exibição para a metrica do mundo
    DC_WD: "D.C para W.D",
}
const Conteiner = () => {
    const classes = useStyles()

    const [value, setValue] = useState(0)
    const [opcao, setOpcao] = useState("")
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [grau, setGrau] = useState(0)
    const [alignment, setAlignment] = useState<string | null>('left');

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }


    const calcular = (label: any) => {
        switch (label) {
            case TipoTransfomacoes.CISALHAMENTO:
                break
            case TipoTransfomacoes.ESCALA:
                break
            case TipoTransfomacoes.REFLEXAO:
                break
            case TipoTransfomacoes.ROTACAO:
                break
            case TipoTransfomacoes.TRANSLACAO:
                break
            default:
                return "Operação não encontrada"
        }
    }

    const entradas = (opcao: string) => {
        switch (opcao) {
            case TipoTransfomacoes.CISALHAMENTO:
                return <Grid item container sm={12} direction="row">
                    <Grid item sm={6}>
                        <TextField
                            id="x"
                            value={x}
                            label="Ponto X"
                            variant="standard"
                            fullWidth
                            type="number"
                            onChange={e =>
                                setX(Number(e.target.value))
                            }
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            id="y"
                            value={y}
                            label="Ponto Y"
                            variant="standard"
                            fullWidth
                            type="number"
                            onChange={e =>
                                setY(Number(e.target.value))
                            }
                        />
                    </Grid>
                </Grid>
            case TipoTransfomacoes.ESCALA:
                return <Grid item sm={12}>
                    <TextField
                        id="grau"
                        value={grau}
                        variant="standard"
                        label="Escala"
                        fullWidth
                        type="number"
                        onChange={e =>
                            setGrau(Number(e.target.value))
                        }
                    />
                </Grid>
            case TipoTransfomacoes.REFLEXAO:

                const handleAlignment = (
                    event: React.MouseEvent<HTMLElement>,
                    newAlignment: string | null,
                ) => {
                    setAlignment(newAlignment);
                };
                return <Grid item sm={12}>
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        size='small'
                        fullWidth
                        color='primary'
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="x" aria-label="left aligned">
                            Eixo X
                        </ToggleButton>
                        <ToggleButton value="y" aria-label="centered">
                            Eixo Y
                        </ToggleButton>
                        <ToggleButton value="origem" aria-label="right aligned">
                            Na origem
                        </ToggleButton>
                        <ToggleButton value="funcao" aria-label="justified" >
                            y = mx+b
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {
                        alignment === "funcao" && <Grid item container sm={12} direction="row">
                            <Grid item sm={6}>
                                <TextField
                                    id="x"
                                    value={x}
                                    label="Ponto X"
                                    variant="standard"
                                    fullWidth
                                    type="number"
                                    onChange={e =>
                                        setX(Number(e.target.value))
                                    }
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    id="y"
                                    value={y}
                                    label="Ponto Y"
                                    variant="standard"
                                    fullWidth
                                    type="number"
                                    onChange={e =>
                                        setY(Number(e.target.value))
                                    }
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
                        type="number"
                        onChange={e =>
                            setGrau(Number(e.target.value))
                        }
                    />
                </Grid>
            case TipoTransfomacoes.TRANSLACAO:
                return <Grid item container sm={12} direction="row">
                    <Grid item sm={6}>
                        <TextField
                            id="x"
                            value={x}
                            label="Ponto X"
                            variant="standard"
                            fullWidth
                            type="number"
                            onChange={e =>
                                setX(Number(e.target.value))
                            }
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            id="y"
                            value={y}
                            label="Ponto Y"
                            variant="standard"
                            fullWidth
                            type="number"
                            onChange={e =>
                                setY(Number(e.target.value))
                            }
                        />
                    </Grid>
                </Grid>
            default:
                return "Operação não encontrada"
        }
    }
    return (
        <Grid container direction="row" >
            <Grid item sm={6} xl={12} marginTop={5} >
                <Painel tamanhoX={TAMANHO_CANVAS} tamanhoY={TAMANHO_CANVAS} x={0} y={0} propocao={1} />
            </Grid>
            <Grid item sm={6} xl={12}>
                <Grid item sm={12} xl={12} p={2}>
                    <Typography variant="h5" align='center'>Transformações</Typography>
                </Grid>
                <Grid item sm={12} xl={12} p={2}>
                    <Grid sm={12} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            variant="fullWidth"
                            centered>
                            <Tab label="Desenhar figura" {...a11yProps(0)} />
                            <Tab label="Adicionar modificação" {...a11yProps(1)} />
                            <Tab label="Historico" {...a11yProps(2)} />
                        </Tabs>
                    </Grid>
                    <CustomTabPanel value={value} index={0}>
                        Desenhar figura
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="space-around"
                            sm={12}

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
                            <Button variant="contained" fullWidth onClick={calcular}>Adicionar transformação</Button>
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