import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "react-d3-treemap/dist/react.d3.treemap.css";
import Dashboard from './components/Dashboard';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function App() {
  const [data, setData] = useState(null);
  const [category, setCategory] = useState("markets");
  const [blockSize, setBlockSize] = useState("market_cap");
  //const [currency, setCurrency] = useState(null);

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${category}?vs_currency=USD&order=market_cap_desc&per_page=20&page=1`)
      .then(res => {
        const formattedData = res.data.map((data) => {
          return {
            name: data.name,
            value: data[blockSize] ? data[blockSize] : 0
          };
        });
        const formattedTreeData = {
          name: "Super Parent",
          value: 123,
          children: []
        };
        formattedData.forEach(element => {
          formattedTreeData.children.push(element);
        });
        updateData(formattedTreeData);
      }).catch(error => {
        let message = typeof error.response !== "undefined" ? error.response.data.error : error.message;
        console.warn("error", message);
      });
  }, [category, blockSize]);

  const setCategoryType = (type) => {
    console.log(type);
    setCategory(type);
  }

  const setBlockSizeType = (type) => {
    console.log(type);
    setBlockSize(type);
  }

  const updateData = (data) => {
    console.log(data);
    setData(data);
  }

  return (
    <div className="App">
      <h2>Crypto Graph</h2>
      <div className="card card-header">
        <Select
          disableUnderline
          value={category}
          onChange={(e) => setCategoryType(e.target.value)}
        >
          <MenuItem value="markets">Market</MenuItem>
          <MenuItem value="categories">Coin Category</MenuItem>
        </Select>
        <Select
          disableUnderline
          value={blockSize}
          onChange={(e) => setBlockSizeType(e.target.value)}
        >
          <MenuItem value="market_cap">Market CAP</MenuItem>
          <MenuItem value="total_supply">Total Supply</MenuItem>
          <MenuItem value="total_volume">Total Volume</MenuItem>
        </Select>
        {/* <Select
          disableUnderline
          value="Currency"
        >
          <MenuItem value="usd">USD</MenuItem>
        </Select> */}
      </div>

      {data ? <Dashboard width={1300} height={500} data={data} /> : null}

    </div>
  );
}

export default App;
