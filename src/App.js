import './App.css';
import TreeMapD3 from './components/TreeMapD3';
import React, { useEffect, useState } from 'react';
import { dataset, info, treeMapData } from './mock-data/dataAnalytic';
import axios from 'axios';
import * as apiEndPoints from './configurations/api.json';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${apiEndPoints.mainUrl}`)
      .then(res => {
        console.log(res);
        const formattedData = res.data.map((data) => {
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
      }).catch(error => {
        let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
        console.warn("error", message);
      })
  }, []);

  const resetData = () => {
    console.log(data);
  }

  return (
    <div className="App">
      <h2>Crypto Graph</h2>
      <div className="btns">
        {/* <button onClick={resetData}>Reset</button> */}
      </div>
      {data ? <TreeMapD3 width={1500} height={1000} data={data} /> : null}
    </div>
  );
}

export default App;
