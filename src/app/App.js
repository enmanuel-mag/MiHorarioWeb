import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Zoom from '@material-ui/core/Zoom'
import Toolbar from '@material-ui/core/Toolbar'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import './App.css'
import PasoAPaso from './pages/PasoAPaso'
import Notifier from './components/Notifier'
import AnimatedDialog from './components/inicio/animated-dialog'
import InfoDialog from './components/inicio/info-dialog'
import DisclaimerDialog from './components/inicio/disclaimer-dialog'
import { Grid, Paper, CssBaseline, Container } from '@material-ui/core'
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import IconButton from "@material-ui/core/IconButton";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./theme";
function ElevationScroll(props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const useStyles = makeStyles((theme) => ({
  root:{
    height: '100%'
    },
  zoom: {
    backgroundColor: 'transparent',
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  icon: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
  }
}))

function ScrollTop(props) {
  const { children, window } = props
  const classes = useStyles()
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    )
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.zoom}>
        {children}
      </div>
    </Zoom>
  )
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
}
function App(props) {
  const classes = useStyles()
  const [isThemeLight, setTheme] = React.useState(true);
  const themeButtonHandler = () => {
    setTheme(!isThemeLight);
  }

  return (
    <>
    <ThemeProvider theme={theme}>
    <Paper elevation={0} square className={classes.root}>
        <Notifier />
        <div id="back-to-top-anchor"/>
        <AppBar position="sticky" >
          <Toolbar >
            <Typography variant="h6">Horario</Typography>
            <Grid spacing={0} container
              direction="row"
              justify="flex-end"
              alignItems="flex-start"
            >
              <Grid item xs={1}>
                <IconButton aria-label="show 4 new mails"
                  color="inherit" className={classes.icon} onClick={themeButtonHandler}>
                  {isThemeLight ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>

              </Grid>
              <Grid item xs={1} style={{ display: 'none' }}>
                <AnimatedDialog
                  open={true}
                  titulo={<DisclaimerDialog.Titulo />}
                  contenido={<DisclaimerDialog.Contenido />}
                  actions={(handle) => (
                    <DisclaimerDialog.Actions handle={handle} />
                  )}
                >
                  {(handle) => <DisclaimerDialog.Controlador handle={handle} />}
                </AnimatedDialog>
              </Grid>
              <Grid item xs={1}>
                <AnimatedDialog
                  open={false}
                  titulo={<InfoDialog.Titulo />}
                  contenido={<InfoDialog.Contenido />}
                  actions={(handle) => <InfoDialog.Actions handle={handle} />}
                >
                  {(handle) => <InfoDialog.Controlador handle={handle} />}
                </AnimatedDialog>
              </Grid>

            </Grid>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" >
        <Router>
          <Route exact path="/" component={PasoAPaso} />
        </Router>
        </Container>
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
        </Paper>
    </ThemeProvider>
    </>
  )
}

export default App
