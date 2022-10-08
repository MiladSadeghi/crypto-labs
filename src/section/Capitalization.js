import { Box, styled, Typography } from '@mui/material';
import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from "App";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { getAllCurrencies } from 'component/api';
import Currencies from './Currencies';
import Loading from 'component/Loading';
import { HighlightOffOutlined } from '@mui/icons-material';
import styles from "../Styles.module.scss";
import SearchedCoin from './SearchedCoin';
import { search } from 'component/api';

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
  const {currency, vsCurrency, setVsCurrency, showCapSide, setShowCapSide} = useContext(AppContext);

  const [currencies, setCurrencies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searched, setSearched] = useState([]);

  const searchDiv = useRef();
  const magnifyIcon = useRef();
  const closeSearchDivIcon = useRef();
  const ignoreMount = useRef(false);
  const timeOut = useRef()

  const currencyChange = (event) => {
    setVsCurrency(event.target.value);
  }

  const revealInput = (event) => {
    if (event.currentTarget === closeSearchDivIcon.current) {
      searchDiv.current.style.right = "-100%";
      setSearched([]);
      setSearchInput("");
    } else if (event.currentTarget === magnifyIcon.current) {
      searchDiv.current.focus();
      searchDiv.current.style.right = "0%";
    }
  }

  useEffect(() => {
    const getCurrency = async () => {
      const data = await getAllCurrencies(vsCurrency);
      setCurrencies([...data])
    }
    getCurrency();
  }, [vsCurrency]);

  useEffect(() => {
    
    if(ignoreMount.current) {
      if(searchInput.length !== 0) {
        clearTimeout( timeOut.current );
        timeOut.current = setTimeout(async() => {
        const data = await search(searchInput);
        setSearched(data.coins)
      }, 3000);
      } else {
        setSearched([]);
      }
    } else {
      ignoreMount.current = true;
    }
  }, [searchInput]);

  const handleChange = (event) => {
    setSearchInput(event.target.value)
  }

  return (
    <Box 
      className={`${styles.capitalization} ${showCapSide ? styles.showCap : ""}`}
      sx={{
      p: 3,
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
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
        overflow: "clip",
        mb: 3
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
            <option value="sgd">SGD</option>
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
              ml: 1,
              cursor: "pointer"
            }} />
        </Box>
        <Box ref={searchDiv} sx={{
          position: "absolute",
          right: "-100%",
          width: "100%",
          height: "100%",
          transition: "right 0.35s ease",
          display: "flex",
          alignItems: "center"
        }}>
          <Box 
            component={"input"}
            value={searchInput}
            onChange={handleChange}
            sx={{
              width: "100%",
              height: "100%",
              outline: "none",
              border: "none",
              borderRadius: "10px",
              bgcolor: "rgb(108 108 120)",
              pl: "15px",
              pr: "30px",
              color: "#dfdfdf"
            }}
          />
          <HighlightOffOutlined ref={closeSearchDivIcon} onClick={revealInput} sx={{position: "absolute", right: 8, fontSize: "1.1rem", color: "#dfdfdf", cursor: "pointer"}} />
        </Box>
      </Box>
      {
        (currencies.length) === 0 ?
        <Loading  /> :
        <Box sx={{position: "relative", width: "100%", height: "100%"}}>
          <Box sx={{
            overflowY: "auto",
            position: "absolute",
            height: "100%",
            width: "100%",
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
              searched.length !== 0 ?
              searched.map(coin => 
                <SearchedCoin
                  key={coin.id}
                  name={coin.name}
                  image={coin.large}
                  id={coin.id}
                  pickedCurrency={currency}
                />
              )
            :
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
        </Box>
      }
    </Box>
  );
}

export default Capitalization;
