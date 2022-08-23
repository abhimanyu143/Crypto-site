import React, { useState } from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { CoinList } from '../config/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider, Container, Typography, TextField, TableContainer,Table,TableHead,TableRow,TableCell,LinearProgress, TableBody, makeStyles } from '@material-ui/core';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from '@material-ui/lab';


const useStyles = makeStyles(()=>({
    row:{
        backgroundColor:"#16171a",
        cursor:"pointer",
        "&:hover":{
            backgroundColor:"#131111",
        },
        fontFamily:"Montserrat",
    },
pagination:{
    "& .MuiPaginationItem-root":{
        color:"gold",
    },
}
}));

const CoinsTable = () => {
    const navigate=useNavigate();
    const [coins, setCoins] = useState([]);
    const [search, setsearch] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const { Currency,Symbol } = CryptoState();
    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(Currency));
        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    })

    const handleSearch=()=>{
        return coins.filter((coin)=>
            coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        );
    }
    
   
    const classes=useStyles();
    

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography
                    variant="h4"
                    style={{ margin: 18, fontFamily: "Monterrat" }}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField
                    label="Search for a Crypto Currency.." variant="outlined"
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => { setsearch(e.target.value) }}
                />
                
                <TableContainer >
                    {loading?(
                    <LinearProgress style={{backgroundColor:"gold"}} />
                         
                    ):(
                    <Table aria-label="simple table">
                        <TableHead style={{backgroundColor:"#EEBC1D"}}>
                            <TableRow>
                                {["Coin","Price","24h Change","Market Cap"].map((head)=>(
                                     <TableCell
                                      style={{
                                        color:"black",
                                        fontWeight:"700",
                                        fontFamily:"Montserrat",
                                       }}
                                       key={head}
                                       align={head==="Coin"? "left":"right"}
                                       >
                                        
                                     {head}
                                     </TableCell>
                                ))}              
                            </TableRow>
                        </TableHead>
                             
                        <TableBody>
                          {handleSearch().slice((page-1)*10,(page-1)*10+10).map(row=>{
                                const profit=row.price_change_percentage_24h > 0;
                                return (
                                    <TableRow
                                    onClick={()=>navigate(`/coins/${row.id}`)}
                                    className={classes.row}
                                    key={row.name}
                                    >
                                    <TableCell component="th" scope="row"
                                    style={{
                                        display:"flex",
                                        gap:15,
                                    }}>
                                       <img src={row?.image}
                                        alt={row.name}
                                        height="50"
                                        style={{maeginBottom:10}}/>
                                        <div style={{display:"flex",flexDirection:"column"}}>
                                            <span
                                              style={{
                                                textTransform:"uppercase",
                                                fontSize:25,
                                              }}>
                                               {row.symbol}
                                            </span>
                                            <span style={{color:"darkgrey"}}>
                                                {row.name}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        {Symbol}{" "}
                                        {numberWithCommas(row.current_price.toFixed(2))}
                                    </TableCell >
                                    <TableCell align="right"
                                      style={{
                                        color: profit> 0 ? "green":"red",
                                        fontWeight:500
                                      }}>
                                        {profit && "+"}
                                        {row.price_change_percentage_24h.toFixed(2)}%
                                    </TableCell >
                                    <TableCell align="right">
                                        {Symbol}{" "}
                                        {numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                    </TableCell >
                              
                                </TableRow>
                                )
                             })}
                        </TableBody>
                     </Table>
                      )}
                    </TableContainer>
                    <Pagination 
                    style={{
                        padding:20,
                        width:"100%",
                        display:"flex",
                        justifyContent:"center",
                    }}
                    count={(handleSearch()?.length/10).toFixed(0)}
                    className={classes.pagination}
                    onChange={(_,value)=>{
                        setPage(value);
                        window.scroll(0,450);
                    }}/>
                    </Container>
                </ThemeProvider>
                )
}

                export default CoinsTable