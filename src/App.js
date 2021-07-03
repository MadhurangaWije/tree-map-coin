import './App.css';
import TreeMapD3 from './components/TreeMapD3';
import React, { useEffect, useState } from 'react';
import TreeMap from "react-d3-treemap";
import axios from 'axios';
import "react-d3-treemap/dist/react.d3.treemap.css";
import Dashboard from './components/Dashboard';

function App() {
  const [data, setData] = useState(null);
  const [category, setCategory] = useState("markets");
  const [blockSize, setBlockSize] = useState("market_cap");
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${category}?vs_currency=USD&order=market_cap_desc&per_page=20&page=1`)
      .then(res => {
        const formattedData = res.data.map((data)=>{
          return {
            name: data.name,
            value: data[blockSize]?data[blockSize]:0
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
      });
  },[category, blockSize]);

  const setCategoryType = (type)=>{
    console.log(type);
    setCategory(type);
  }

  const setBlockSizeType = (type)=>{
    console.log(type);
    setBlockSize(type);
  }

  const updateData = (data)=> {
    console.log(data);
    setData(data);
  }

  return (
    <div className="App">
      <h2>Crypto Graph</h2>
        <div className="filters">
          <div className="categorizeBy">
              <label htmlFor="category">Category</label>
              <select name="category" id="category" value={category} onChange={(e)=>setCategoryType(e.target.value)}>
                  <option value="markets">Market</option>
                  <option value="categories">Coin Category</option>
              </select>
          </div>
          <div className="blockSizeBy">
              <label htmlFor="blocksize">Block Size By</label>
              <select name="blockSizeBy" id="blocksize" value={blockSize} onChange={(e)=>setBlockSizeType(e.target.value)}>
                <option value="market_cap">Market CAP</option>
                <option value="total_supply">Total Supply</option>
                <option value="total_volume">Total Volume</option>
              </select>
          </div>
          <div className="currency">
              <label htmlFor="currency">Currency</label>
              <select name="currency" id="currency">
                <option value="usd">USD</option>
              </select>
          </div>
        </div>
        
        {data ? <Dashboard width={1200} height={500} data={data} /> : null}
        
    </div>
  );
}

export default App;
