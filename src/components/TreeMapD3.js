import "react-d3-treemap/dist/react.d3.treemap.css";
import TreeMap from "react-d3-treemap";


function TreeMapD3({ width, height, data }) {
    console.log("Rendering Tree Map");
    return (
        <TreeMap id="my" width={width} height={height} data={data} />
    )

}

export default TreeMapD3;
