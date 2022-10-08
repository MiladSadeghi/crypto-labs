import { Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from "App";

const Currencies = ({name, image, currentPrice, marketCap, pickedCurrency, id}) => {
  const {vsCurrency ,setCurrency, setShowCapSide} = useContext(AppContext);

  const numberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const selectedCoinPricesStyle = () => {
    return id === pickedCurrency ? "rgb(211 211 211)" : "rgb(183 183 183 / 62%)"
  }

  const changeCoin = () => {
    setCurrency(id);
    setShowCapSide(false);
  }

  const currencySymbol = marketCap.toLocaleString('en-US', { style: 'currency', currency: `${vsCurrency}`,}).replace(/,*[0-9]+./g, '');

  return (
    <Box onClick={changeCoin} sx={{
      p: 1,
      mb: 1,
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      background: (id === pickedCurrency ? "rgb(0,141,255)" : "transparent"),
      borderRadius: 3,
      transition: "background .15s ease-in-out",
      cursor: "pointer"
    }}>
      <Box sx={{
        display: "flex"
      }}>
        <Box component={"img"} src={image} alt={"coin_image"} sx={{
          width: "42px",
          mr: 2
        }} />
        <Box sx={{my: "auto"}}>
          <Typography component={"h4"} fontSize={"1rem"} fontWeight={600} sx={{lineHeight: 1}}>{name}</Typography>
          <Typography component={"p"} fontSize={".7rem"} sx={{lineHeight: 1.6, color: selectedCoinPricesStyle()}} >{currencySymbol}{numberWithSpaces(marketCap)}</Typography>
        </Box>
      </Box>
      <Typography component={"p"} fontSize={".7rem"} sx={{alignSelf: "self-end", pb: .5, color: selectedCoinPricesStyle()}}>{currentPrice.toLocaleString('en-US', { style: 'currency', currency: `${vsCurrency}`,})}
      </Typography>
    </Box>
  );
}

export default Currencies;
