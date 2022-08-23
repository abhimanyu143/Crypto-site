import { AppBar, Toolbar, Typography, Container, Select, MenuItem, makeStyles, ThemeProvider,createTheme } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import React from 'react'

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "bold",
    cursor: "pointer",
  }
}))


function Header() {
  const classes = useStyles();

  const history = useNavigate();

  const {Currency,setCurrency}=CryptoState();
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography onClick={() => history("/")} className={classes.title} variant='h4'>Cryptopedia</Typography>
            <Select 
              variant='outlined'
              style={{
                width: 100,
                height: 40,
                color: "gold",
              }}
              value={Currency}
              onChange={(e)=>setCurrency(e.target.value)}
              >

              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>

            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header