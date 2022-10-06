import axios from 'axios';
import React from 'react';

const getAllCurrencies = async (currency) => {
  const apiLink = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
  const response = await axios.get(apiLink);
  return response.data
}

export {getAllCurrencies};
