import { Box, Grid } from "@mui/material";
import React, { useState, createContext } from "react";
import CurrencyData from "section/CurrencyData";
import Capitalization from "section/Capitalization";
import styles from "./Styles.module.scss";

export const AppContext = createContext();

function App() {
  const [currency, setCurrency] = useState("bitcoin");
  const [vsCurrency, setVsCurrency] = useState("usd");
  const [showCapSide, setShowCapSide] = useState(false);

  return (
    <AppContext.Provider value={{currency, setCurrency, vsCurrency, setVsCurrency, showCapSide, setShowCapSide}}>
      <div style={{backgroundColor: "rgb(21,21,32)"}}>
      <Box 
        sx={{
          display: 'flex',
          minHeight: "100vh",
          width: "100%",
          position: "relative"
        }}>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={9}>
            <CurrencyData coinName={currency} />
          </Grid>
          <Grid item lg={3}>
            <Capitalization />
          </Grid>
        </Grid>
        <Box className={`${styles.openCapitalization} ${showCapSide && styles.moveIcon}`} >
          <input className={styles.checkbox} type="checkbox" checked={showCapSide} value={showCapSide} onChange={() => setShowCapSide(!showCapSide)} />
          <div className={`${styles.line1} ${styles.lines}`} />
          <div className={`${styles.line2} ${styles.lines}`} />
          <div className={`${styles.line3} ${styles.lines}`} />
        </Box>
      </Box>
    </div>
    </AppContext.Provider>
  );
}

export default App;
