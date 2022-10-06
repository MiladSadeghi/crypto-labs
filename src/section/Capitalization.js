import { Box, styled, Typography } from '@mui/material';
import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from "App";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { getAllCurrencies } from 'component/api';
import Currencies from './Currencies';
import Loading from 'component/Loading';

const SelectBox = styled('select')({
  backgroundColor: "rgb(64,64,79)",
  color: "#dfdfdf",
  outline: "none",
  border: "none",
  borderRadius: "10px",
  padding: "0.1px 5.5px",
  fontWeight: 700,
  fontSize: ".8rem",
  "&::-webkit-scrollbar": {
    width: "3.9px" 
  },
  "&::-webkit-scrollbar-track": {
    background: "rgb(43 43 64 / 61%)",
  },
  "&::-webkit-scrollbar-thumb": {
  backgroundColor: "rgb(108 108 120)",
  borderRadius: "20px",
  height: "100%"
  }
})

const Capitalization = () => {
  const {currency, setCurrency, vsCurrency, setVsCurrency} = useContext(AppContext);
  const searchInput = useRef();
  const magnifyIcon = useRef();
  const [currencies, setCurrencies] = useState([]);

  const currencyChange = (event) => {
    setVsCurrency(event.target.value);
  }

  const revealInput = (event) => {
    if (magnifyIcon.current && magnifyIcon.current.contains(event.target)) {
      searchInput.current.style.right = "0%";
      searchInput.current.focus();
    } else if (event.target !== searchInput.current){
      searchInput.current.style.right = "-100%";
    }
  }

  useEffect(() => {
    const getCurrency = async () => {
      const data = await getAllCurrencies(vsCurrency);
      setCurrencies([...data])
    }
    getCurrency();
  }, [vsCurrency]);

  return (
    <Box 
      onClick={revealInput}
      sx={{
      py: 3,
      px: 3,
      height: "100%",
      position: "relative",
      "&::before": {
        position: "absolute",
        content: `''`,
        left: 0,
        top: 0,
        height: "100%",
        width: "1px",
        bgcolor: "rgb(255 255 255 / 10%);"
      },
    }} >
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        overflowX: "hidden",
        pb: 3
      }}>
        <Typography 
          variant='h6' 
          component='h2'
          sx={{
            color: "#dfdfdf",
            fontWeight: 500,
            fontSize: "1.1rem",
            letterSpacing: "0.4px"
          }} >
          Capitalization
        </Typography>
        <Box sx={{
          display: "flex",
          alignItems: "center"
        }}>
          <SelectBox value={vsCurrency} onChange={currencyChange}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="rub">RUB</option>
            <option value="idr">IDR</option>
            <option value="krw">KRW</option>
            <option value="cny">CNY</option>
            <option value="twd">TWD</option>
            <option value="jpy">JPY</option>
            <option value="aed">AED</option>
            <option value="bdt">BDT</option>
            <option value="brl">BRL</option>
            <option value="clp">CLP</option>
            <option value="gbp">GBP</option>
            <option value="ils">ILS</option>
            <option value="lkr">LKR</option>
            <option value="myr">MYR</option>
            <option value="nzd">NZD</option>
            <option value="pln">PLN</option>
            <option value="sdd">SGD</option>
            <option value="uah">UAH</option>
            <option value="zar">ZAR</option>
            <option value="ars">ARS</option>
            <option value="bhd">BHD</option>
            <option value="cad">CAD</option>
            <option value="czk">CZK</option>
            <option value="hkd">HKD</option>
            <option value="inr">INR</option>
            <option value="mmk">MMK</option>
            <option value="ngn">NGN</option>
            <option value="php">PHP</option>
            <option value="sar">SAR</option>
            <option value="thb">THB</option>
            <option value="vef">VEF</option>
            <option value="xdr">XDR</option>
            <option value="aud">AUD</option>
            <option value="bmd">BMD</option>
            <option value="chf">CHF</option>
            <option value="dkk">DKK</option>
            <option value="huf">HUF</option>
            <option value="kwd">KWD</option>
            <option value="mxn">MXN</option>
            <option value="nok">NOK</option>
            <option value="pkr">PKR</option>
            <option value="sek">SEK</option>
            <option value="try">TRY</option>
            <option value="vnd">VND</option>
          </SelectBox>
          <SearchSharpIcon
            ref={magnifyIcon}
            onClick={revealInput}
            sx={{
              color: "#dfdfdf",
              fontSize: "1.3rem",
              ml: 1
            }} />
        </Box>
          <Box 
            component={"input"}
            ref={searchInput}
            sx={{
              position: "absolute",
              right: "-100%",
              width: "100%",
              height: "70%",
              outline: "none",
              border: "none",
              borderRadius: "10px",
              bgcolor: "rgb(108 108 120)",
              padding: "13px 15px",
              color: "#dfdfdf",
              transition: "right 0.35s ease"
            }}
            />
      </Box>
      {
        currencies.length === 0 ?
        <Loading  /> :
        <Box sx={{
          overflowY: "auto",
          position: "absolute",
          height: "calc(100% - 101.6px)",
          "&::-webkit-scrollbar": {
            width: "3.9px" 
          },
          "&::-webkit-scrollbar-track": {
            background: "rgb(43 43 64 / 61%)",
          },
          "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgb(108 108 120)",
          borderRadius: "20px"
          }
        }}>
          {
          currencies.map((coin) => 
            <Currencies
              key={coin.name}
              name={coin.name} 
              image={coin.image} 
              currentPrice={coin.current_price}
              marketCap={coin.market_cap}
              id={coin.id}
              pickedCurrency={currency}
              />
          )}
        </Box>
      }
    </Box>
  );
}

export default Capitalization;
