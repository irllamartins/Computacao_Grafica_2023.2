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
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  TransformSharp,
  Timeline,
  ShapeLine,
  Toll,
  AspectRatio,
  RecentActors,
  Pets,
  NaturePeople,
  Iso,
  Balance,
  AppRegistration,
  MonitorHeartOutlined,
  Compare
} from '@mui/icons-material'

import Circuferencia from '../pages/circuferencia/Conteiner'
import Nomalizacao from '../pages/normalizacao/Conteiner'
import Retas from '../pages/reta/Conteiner'
import Transformacoes2D from '../pages/transformacoes2D/Conteiner'
import Transformacoes3D from '../pages/transformacoes3D/Conteiner'
import CohenSuterland from '../pages/cohen.suterland/Conteiner'
import Filtros from '../pages/filtro/Container'
import OperacaoImagem from '../pages/operacao.imagem/Container'
import TrasformacoesImagem from '../pages/transformacoes.imagem/Container'
import Equalizacao from '../pages/equalizacao/Container'
import Batimentos from '../pages/batimentos/Conteiner'
import Morfologia from '../pages/morfologia/Container'
import Gato from '../pages/gato/Container'
import Perspectiva from '../pages/perspectiva/Container'

const drawerWidth = 240;

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
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))


const pages = (value: number) => {
  switch (value) {
    case 0:
      return <Nomalizacao />
    case 1:
      return <Batimentos />
    case 2:
      return <Retas />
    case 3:
      return <Circuferencia />
    case 4:
      return <Transformacoes2D />
    case 5:
      return <Transformacoes3D />
    case 6:
      return <CohenSuterland />
    case 7:
      return <Perspectiva />
    case 8:
      return <Filtros />
    case 9:
      return <OperacaoImagem />
    case 10:
      return <TrasformacoesImagem />
    case 11:
      return < Equalizacao />
    case 12:
      return <Gato />
    case 13:
      return <Morfologia />

    default:
      return "Não encontrado"
  }
}

export default function PersistentDrawerLeft() {
  const theme = useTheme()

  const [open, setOpen] = React.useState(false)

  const [pagesNumber, setPagesNumber] = React.useState(12)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const titulo = [
    { label: 'Normalizaçao', icon: <TransformSharp /> },
    { label: 'Batimentos Cardiacos', icon: <MonitorHeartOutlined /> },
    { label: 'Reta', icon: <Timeline /> },
    { label: 'Circuferencia', icon: <Toll /> },
    { label: 'Transformações2D', icon: <ShapeLine /> },
    { label: 'Transformações3D', icon: <ShapeLine /> },
    { label: 'Cohen Surterland', icon: <AspectRatio /> },
    { label: 'Perspectiva', icon: <NaturePeople /> },
    { label: 'Filtros', icon: <RecentActors /> },
    { label: 'Operação de imagem', icon: <Iso /> },
    { label: 'Transformações imagem', icon: <Compare /> },
    { label: 'Equalização de imagem', icon: <Balance /> },
    { label: 'Gato de Arnold', icon: <Pets /> },
    { label: 'Operadores morfológicos', icon: <AppRegistration /> }

  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar /*className={classes.header}*/>
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
      <Main open={open} /*className={classes.ativo}*/>
        <DrawerHeader />
        <Paper>
          {pages(pagesNumber)}
        </Paper>
      </Main>
    </Box>
  );
}
