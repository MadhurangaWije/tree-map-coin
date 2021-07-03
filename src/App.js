import './App.css';
import TreeMapD3 from './components/TreeMapD3';
import React, { useEffect, useState } from 'react';
import { dataset, info } from './mock-data/dataAnalytic';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  /* useEffect(() => {
    setData(dataset);
    console.log(dataset);
  }, []); */
  useEffect(() => {
    axios.get(`https://api.coinlore.com/api/tickers/`)
      .then(res => {
        setData(res);
        console.log("api", res);
      })
  },[])
  /* function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  } */



  const resetData = () => {
    setData(info);
  }

  if (data === null) return <></>;

  return (
    <div className="App">
      <h2>Graphs with React</h2>
      <div className="btns">
        {/* <button onClick={updateData1}>Change Child Data Values</button>
        <button onClick={updateData2}>Add/Remove Child Nodes</button>
        <button onClick={updateData3}>Add Parent Nodes</button>
        <button onClick={updateData4}>Remove Parent Nodes</button> */}
        <button onClick={resetData}>Reset</button>
      </div>
      <TreeMapD3 width={800} height={500} data={data} />
    </div>
  );
}

export default App;
