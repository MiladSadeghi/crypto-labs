import { Box, Grid } from "@mui/material";
import React, { useState, createContext } from "react";
import CurrencyData from "component/section/CurrencyData";
import Capitalization from "component/section/Capitalization";

export const AppContext = createContext();

function App() {
  const [currency, setCurrency] = useState("bitcoin");

  return (
    <AppContext.Provider value={{currency, setCurrency}}>
      <div style={{backgroundColor: "rgb(21,21,32)"}}>
      <Box 
        sx={{
          display: 'flex',
          minHeight: "100vh",
          width: "100%",
        }}>
        <Grid container spacing={0}>
          <Grid item md={9}>
            <CurrencyData coinName={currency} />
          </Grid>
          <Grid item md={3}>
            <Capitalization />
          </Grid>
        </Grid>
      </Box>
    </div>
    </AppContext.Provider>
  );
}

export default App;
