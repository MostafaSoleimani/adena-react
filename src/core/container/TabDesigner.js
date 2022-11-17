import React from "react";
import "./TabDesigner.css";
import AdenaContainerDesigner from "./ContainerDesigner";
import uuid from "react-uuid";
import {useDispatch, useSelector} from 'react-redux';
import { designerActions } from "../../store/designer-slice";
import Icon from '@mui/material/Icon';

export default function AdenaTabDesigner() {
  const containers = useSelector(state => state.designer.layout);
  const dispatch = useDispatch();
  const addContainer = () => {
    dispatch(designerActions.addContainer({
      id: uuid(),
      name: "container",
      data: {
        label: "Simple Container",
        type: 'Container',
        children: [],
        style: {},
      },
    }))
  };

  const renderedFields = containers.map((x, i) => (
    <AdenaContainerDesigner key={i} config={x} />
  ));
  return (
    <>
      <header>
        <h2>Hi Welcome to Form Designer</h2>
        <Icon color="primary" onClick={addContainer}>add_circle</Icon>
      </header>
      <main className="adena-tab-designer-main">
        <div className="adena-tab-designer-containers">{renderedFields}</div>
      </main>
    </>
  );
}
