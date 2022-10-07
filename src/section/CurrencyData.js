import { Box, Chip, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from 'App';
import { getCoinData } from 'component/api';
import Loading from 'component/Loading';
import { Anchor, AutorenewRounded, BoltOutlined, OfflineBoltOutlined, Straight } from '@mui/icons-material';
import { StatBarHeader } from "component/commons"
const CurrencyData = () => {
  const {currency, vsCurrency} = useContext(AppContext);
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    const coin = async () => {
      const data = await getCoinData(currency);
      setCoinData(data);
    }
    coin();
  }, [])

  if (coinData.length === 0) return <Loading />
  return (
    <Box sx={{p: 3}}>
      
      <Typography
          variant='h6' 
          component='h2'
          sx={{
            color: "#dfdfdf",
            fontWeight: 500,
            fontSize: "1.1rem",
            letterSpacing: "0.1px",
            pb: 3
          }} >
          Price
        </Typography>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <Box sx={{display: "flex", alignItems: "center"}}>
          <Box component="img" src={coinData.image.small} sx={{mr: 2}} />
          <Box sx={{color: "#dfdfdf", display: "flex", flexDirection: "column"}}>
            <Typography component="h3" fontWeight={600} fontSize={"1.5rem"} sx={{display: "flex", alignItems: "center", letterSpacing: "0.5px"}}>
              {coinData.name}
              <Typography component="span" fontWeight={500} sx={{ml: 1, color: "rgb(183 183 183 / 62%)"}}>
                ({(coinData.symbol).toUpperCase()})
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Box sx={{display: "flex", alignItems: "center"}}>
          <Typography component="p" sx={{color: "#dfdfdf", fontSize: "2rem", fontWeight: 600, letterSpacing: 1}}>
            {coinData.market_data.current_price[vsCurrency].toLocaleString('en-US', { style: 'currency', currency: `${vsCurrency}`, minimumFractionDigits: 0})}
          </Typography>
          <Box sx={{display: "flex", alignItems: "center"}}>
            <Chip label={coinData.market_data.price_change_percentage_24h} sx={{ml: 1, height: "20px", backgroundColor: coinData.market_data.price_change_percentage_24h >= 1 ? "rgb(40,182,85)": "red", color: "#dfdfdf", fontSize: ".9rem", fontWeight: 700}} icon={<Straight sx={{color: "#fff !important", height: "0.7em", width: "0.7em", ...(coinData.market_data.price_change_percentage_24h < 1 && {transform: "rotate(180deg)"}) }} />} />
          </Box>
        </Box>
      </Box>
      <Box sx={{mt: 3, width: "100%", display: "flex", alignItems: "center", color: "#dfdfdf"}}>
        <StatBarHeader 
          icon={<Anchor sx={{color: 'rgb(75,76,93)', fontSize: "1.6rem"}} />} 
          title={"Market Cap"} 
          borderdir="start"
          
        />
        <StatBarHeader 
          icon={<BoltOutlined sx={{color: 'rgb(75,76,93)', fontSize: "1.6rem"}} />} 
          title={"Volume (24h)"}
        />
        <StatBarHeader 
          icon={<OfflineBoltOutlined sx={{color: 'rgb(75,76,93)', fontSize: "1.6rem"}} />} 
          title={"Max Supply"}
        />
        <StatBarHeader 
          icon={<AutorenewRounded sx={{color: 'rgb(75,76,93)', fontSize: "1.6rem"}} />} 
          title={"Circulating Supply"}
          borderdir="end"
        />
      </Box>
    </Box>
  );
}

export default CurrencyData;
