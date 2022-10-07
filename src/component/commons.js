import { Box, Typography } from "@mui/material";
import React from 'react';


export const StatBarHeader = ({icon, title, borderdir, children}) => {
  let borderR;
  borderdir === "start" ? 
  borderR = {borderRadius: "12px 0 0 12px"} : 
  borderdir === "end" ? 
  borderR = { borderRadius: "0 12px 12px 0"} : 
  borderR = { borderRadius: "0"}
  return (
    <Box sx={{width: "100%"}}>
      <Box sx={{bgcolor: "rgb(25,27,42)", px: 2, py: 1.7, ...borderR, display: "flex"}}>
        {icon}
        <Typography component="p" sx={{ml: 1.5, fontWeight: 600, fontSize: "0.9rem"}}>{title}</Typography>
      </Box>
      {children}
    </Box>
  )
}