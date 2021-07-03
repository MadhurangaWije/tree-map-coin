import './App.css';
import TreeMapD3 from './components/TreeMapD3';
import React, { useEffect, useState } from 'react';
import { dataset, info, treeMapData } from './mock-data/dataAnalytic';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`https://api.coinlore.com/api/tickers/`)
      .then(res => {
        const formattedData = res.data.data.map((data)=>{
          return {
            name: data.name,
            value: data.rank
          };
        });
        console.log(formattedData);
        setData(formattedData);
      })
  },[]);

  const resetData = () => {
    console.log(data);
  }

  return (
    <div className="App">
      <h2>Graphs with React</h2>
      <div className="btns">
        <button onClick={resetData}>Reset</button>
      </div>
      { data ? <TreeMapD3 width={800} height={500} data={treeMapData} valueUnit={"MB"} /> : null }
    </div>
  );
}

export default App;
