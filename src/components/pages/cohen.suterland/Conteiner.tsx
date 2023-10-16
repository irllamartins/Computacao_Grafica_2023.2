import {
    TextField,
    Grid,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material'
import { makeStyles } from '@mui/styles';
import Painel from './painelMundo'
import React, { useEffect, useState } from 'react';
import { Add, Delete, DesignServices } from '@mui/icons-material';
import PainelMundo from './painelMundo';
import PainelRecorte from './painelRecorte';

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


const TAMANHO_CANVAS = 500

export interface Reta {
    xInicial: number
    yInicial: number
    xFinal: number
    yFinal: number
    cor: string

}
export interface Tela {
    xInicial: number
    yInicial: number
    xFinal: number
    yFinal: number
}
const Conteiner = () => {
    const classes = useStyles()

    const [open, setOpen] = React.useState<boolean>(false)
    const [x, setX] = React.useState<number>(0)
    const [y, setY] = React.useState<number>(0)
    const [ponto_x_inicial, setPonto_x_inicial] = React.useState<number>(10)
    const [ponto_y_inicial, setPonto_y_inicial] = React.useState<number>(10)
    const [ponto_x_final, setPonto_x_final] = React.useState<number>(100)
    const [ponto_y_final, setPonto_y_final] = React.useState<number>(100)
    const [figura, setFigura] = React.useState<Reta[]>([{ xInicial: 120, yInicial: 200, xFinal: 350, yFinal: 360, cor: "orange" }])
    const [tamanho_min_x, setTamanho_min_x] = useState(100)
    const [tamanho_max_x, setTamanho_max_x] = useState(450)
    const [tamanho_min_y, setTamanho_min_y] = useState(150)
    const [tamanho_max_y, setTamanho_max_y] = useState(300)

    const altura = (TAMANHO_CANVAS / 2) - y
    const largura = (TAMANHO_CANVAS / 2) + x

    const tratamentoEntrada = (texto: any, setEntrada: any) => {

        if (texto === "") {
            setEntrada(0);
        } else {
            setEntrada(texto.replace(/[a-zA-Z]/g, '').replace(/^0+(?=[\d-])/, '').replace(/,/g, '.'))
        }
    }

    const addPonto = (ponto_x_inicial: number, ponto_y_inicial: number, ponto_x_final: number, ponto_y_final: number, figura: any) => {
        // Gerar uma cor aleatória
        let corAleatorio
        do {
            corAleatorio = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        } while (parseInt(corAleatorio.substring(1), 16) < 0x333333 || parseInt(corAleatorio.substring(1), 16) > 0xeeeeee)

        const novaReta = { xInicial: ponto_x_inicial, yInicial: ponto_y_inicial, xFinal: ponto_x_final, yFinal: ponto_y_final, cor: corAleatorio }
        setFigura([...figura, novaReta]);
    }
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Grid container direction="row" >
            <Grid container item sm={6} xl={6} justifyContent="center" alignContent="center" alignItems="center">
                <Grid item sm={12}  >
                    <PainelMundo
                        figura={figura}
                        tamanho={TAMANHO_CANVAS}
                        xInicial={tamanho_min_x}
                        yInicial={tamanho_min_y}
                        xFinal={tamanho_max_x}
                        yFinal={tamanho_max_y}
                    />

                </Grid>
                <Grid item container sm={12} direction="row" alignItems="center">
                    <Grid item className={classes.espacamento} sm={2} >
                        <TextField
                            id="min_x"
                            label="Minimo X"
                            variant="standard"
                            fullWidth
                            value={tamanho_min_x}
                            onChange={e => tratamentoEntrada(e.target.value, setTamanho_min_x)}

                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={2} >
                        <TextField
                            id="min_y"
                            label="Minimo Y"
                            variant="standard"
                            fullWidth
                            value={tamanho_min_y}
                            onChange={e => tratamentoEntrada(e.target.value, setTamanho_min_y)}
                        />
                    </Grid>
                    <Grid item className={classes.espacamento} sm={2}>
                        <TextField
                            id="max_x"
                            label="Maximo X"
                            variant="standard"
                            fullWidth
                            value={tamanho_max_x}
                            onChange={e => tratamentoEntrada(e.target.value, setTamanho_max_x)}
                        />
                    </Grid>

                    <Grid item className={classes.espacamento} sm={2}>
                        <TextField
                            id="max_y"
                            label="Maximo Y"
                            variant="standard"
                            fullWidth
                            value={tamanho_max_y}
                            onChange={e => tratamentoEntrada(e.target.value, setTamanho_max_y)}
                        />
                    </Grid>
                    <Grid item sm={2}>
                        <Tooltip title="Adicionar figura">
                            <Button
                                onClick={handleClickOpen}
                                startIcon={<DesignServices />}
                            >
                                Figura
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>

            </Grid>
            <Grid container item sm={6} xl={6} alignContent="center" alignItems="center">
                <Grid item sm={12}  >
                    <PainelRecorte
                        figura={figura}
                        tamanho={TAMANHO_CANVAS}
                        tamanhoHeight={tamanho_max_y - tamanho_min_y}
                        tamanhoWidth={tamanho_max_x - tamanho_min_x}
                        xInicial={tamanho_min_x}
                        yInicial={tamanho_min_y}
                        xFinal={tamanho_max_x}
                        yFinal={tamanho_max_y}
                    />

                </Grid>

            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle >
                    {"Criar figura"}
                </DialogTitle>
                <DialogContent>
                    <Grid container direction="row" >
                        <Grid container direction="row" justifyContent="space-between" alignContent="center">
                            <Grid item sm={2} className={classes.espacamento}>
                                <TextField
                                    id="x"
                                    value={ponto_x_inicial}
                                    label="X(Inicial)"
                                    variant="standard"
                                    fullWidth
                                    onChange={e => tratamentoEntrada(e.target.value, setPonto_x_inicial)}

                                />
                            </Grid>
                            <Grid item sm={2} className={classes.espacamento}>
                                <TextField
                                    id="y"
                                    value={ponto_y_inicial}
                                    label="Y(Inicial)"
                                    variant="standard"
                                    fullWidth
                                    onChange={e => tratamentoEntrada(e.target.value, setPonto_y_inicial)}

                                />
                            </Grid>
                            <Grid item sm={2} className={classes.espacamento}>
                                <TextField
                                    id="x"
                                    value={ponto_x_final}
                                    label="X(Final)"
                                    variant="standard"
                                    fullWidth
                                    onChange={e => tratamentoEntrada(e.target.value, setPonto_x_final)}

                                />
                            </Grid>
                            <Grid item sm={2} className={classes.espacamento}>
                                <TextField
                                    id="y"
                                    value={ponto_y_final}
                                    label="Y(Final)"
                                    variant="standard"
                                    fullWidth
                                    onChange={e => tratamentoEntrada(e.target.value, setPonto_y_final)}

                                />
                            </Grid>
                            <Grid item sm={2} className={classes.espacamento}>
                                <IconButton onClick={() => addPonto(ponto_x_inicial, ponto_y_inicial, ponto_x_final, ponto_y_final, figura)}>
                                    <Add />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item sm={12} marginY={2}>
                            <TableContainer sx={{ maxHeight: 250 }}>
                                <Table stickyHeader size="small" aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" colSpan={5}>
                                                Pontos
                                            </TableCell>
                                            <TableCell align="center" colSpan={1}>
                                                Ação
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center">X(Inicial)</TableCell>
                                            <TableCell align="center">Y(Inicial)</TableCell>
                                            <TableCell align="center">X(Final)</TableCell>
                                            <TableCell align="center">Y(Final)</TableCell>
                                            <TableCell align="center" >Cor</TableCell>
                                            <TableCell align="center" />

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.values(figura).map((ponto: Reta, index: number) =>
                                            <TableRow key={index}>
                                                <TableCell align="center">{ponto.xInicial}</TableCell>
                                                <TableCell align="center">{ponto.yInicial}</TableCell>
                                                <TableCell align="center">{ponto.xFinal}</TableCell>
                                                <TableCell align="center">{ponto.yFinal}</TableCell>
                                                <TableCell align="center" style={{ backgroundColor: ponto.cor }} />
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
                                        )}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Voltar
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid >

    )
}
export default Conteiner