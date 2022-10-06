import { Box } from '@mui/material';
import React from 'react';
import {Oval} from "react-loader-spinner";
const Loading = ({width, height}) => {
  return (
    <Box sx={{
      height: "calc(100% - 28.14px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Oval
        height={width}
        width={height}
        color="rgb(108 108 120)"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="rgb(43 43 64 / 61%)"
        strokeWidth={2}
        strokeWidthSecondary={2}

      />
    </Box>
  );
}

export default Loading;
