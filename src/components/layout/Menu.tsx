import * as React from 'react'
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
  AppBarProps as MuiAppBarProps,
  Paper
} from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import {
  Menu as MenuIcon,
  Inbox as InboxIcon,
  Email as MailIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  TransformSharp,
  Timeline,
  ShapeLine,
  Toll,
  AspectRatio,
  RecentActors,
  Pets,
  PermMedia,
  NaturePeople,
  Iso,
  BarChart
} from '@mui/icons-material'
import { makeStyles } from '@mui/styles';

import Circuferencia from '../pages/circuferencia/Conteiner'
import Transformacoes from '../pages/normalizacao/Conteiner'
import Retas from '../pages/reta/Conteiner'
import TransformacoesObjeto from '../pages/transformacoes/Conteiner'
import CohenSuterland from '../pages/cohen.suterland/Conteiner'
import Filtros from '../pages/filtro/Container'
import OperacaoImagem from '../pages/operacao.imagem/Container'

import { TEMA_COR } from '../material.theme'
const drawerWidth = 240;


const useStyles = makeStyles({
  ativo: {
    backgroundColor: "#173c51"
  },
  header: {
    backgroundColor: "#173c"
  }
})


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))


const pages = (value: number) => {
  switch (value) {
    case 0:
      return <Transformacoes />
    case 1:
      return <Retas />
    case 2:
      return <Circuferencia />
    case 3:
      return <TransformacoesObjeto />
    case 4:
      return <CohenSuterland />
    case 6:
      return <Filtros />
    case 9:
      return <OperacaoImagem />
    default:
      return "Não encontrado"

  }
}

export default function PersistentDrawerLeft() {
  const theme = useTheme()
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  const [pagesNumber, setPagesNumber] = React.useState(9)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const titulo = [
    { label: 'Normalizaçao', icon: <TransformSharp /> },
    { label: 'Reta', icon: <Timeline /> },
    { label: 'Circuferencia', icon: <Toll /> },
    { label: 'Transformações', icon: <ShapeLine /> },
    { label: 'Perspectiva', icon: <NaturePeople /> },
    { label: 'Cohen Surterland', icon: <AspectRatio /> },
    { label: 'Filtros', icon: <RecentActors /> },
    { label: 'Gato', icon: <Pets /> },
    { label: 'Histograma', icon: <BarChart /> },
    { label: 'Operação de imagem', icon: <Iso /> },
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar className={classes.header}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Project CG
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader  >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
          {titulo.map((text, index) => (
            <ListItem key={text.label} disablePadding>
              <ListItemButton onClick={() => setPagesNumber(index)}>
                <ListItemIcon>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open} className={classes.ativo}>
        <DrawerHeader />
        <Paper>
          {pages(pagesNumber)}
        </Paper>
      </Main>
    </Box>
  );
}
