import './App.css';
import TreeMapD3 from './components/TreeMapD3';
import React, { useEffect, useState } from 'react';
import { dataset, info, treeMapData } from './mock-data/dataAnalytic';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`)
      .then(res => {
        console.log(res);
        const formattedData = res.data.map((data)=>{
          return {
            name: data.name,
            value: data.market_cap
          };
        });
        console.log(formattedData);
        const formattedTreeData = {
          name: "Super Parent",
          value: 123,
          children: []
        };
        formattedData.forEach(element => {
          formattedTreeData.children.push(element);  
        });
        
        setData(formattedTreeData);
      })
  },[]);
 
  const resetData = () => {
    console.log(data);
  }

  return (
    <div className="App">
      <h2>Graphs with React</h2>
      <div className="btns">
        {/* <button onClick={resetData}>Reset</button> */}
      </div>
      { data ? <TreeMapD3 width={1800} height={1000} data={data} valueUnit={"MB"} /> : null }
    </div>
  );
}

export default App;
