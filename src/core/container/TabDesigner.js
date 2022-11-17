import React from "react";
import './TabDesigner.css';
import AdenaContainerDesigner from './ContainerDesigner'

export default function AdenaTabDesigner() {
  const [containers, setContainers] = React.useState([]);

  const addContainer = () => {
    setContainers(pre => [...pre, {
        name: 'container',
        data: {
            label: 'Simple Container',
            children: [],
            style: {}
        }
    }])
  }
  
  const renderedFields = containers.map((x, i) => (
    <AdenaContainerDesigner key={i}/>
  ));
  return (
    <>
      <header>
        <h2>Hi Welcome to Form Designer</h2>
        <button onClick={addContainer}>Add Container</button>
      </header>
      <main className="adena-tab-designer-main">
        <div className="adena-tab-designer-containers">{renderedFields}</div>
      </main>
    </>
  );
}
