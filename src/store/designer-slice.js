import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const designerSlice = createSlice({
  name: "designer",
  initialState: {
    name: "Simple Design",
    id: uuid(),
    layout: [],
  },
  reducers: {
    addTab: (state, action) => {
      state.layout = [...state.layout, action.payload];
    },
    addContainer: (state, action) => {
      const foundTab = state.layout.find(
        (x) => x.id === action.payload.tabId
      );
      foundTab.data.children.push(action.payload.container);
    },
    addField: (state, action) => {
      const foundTab = state.layout.find(
        (x) => x.id === action.payload.tabId
      );
      const foundContainer = foundTab.data.children.find(
        (x) => x.id === action.payload.containerId
      );
      foundContainer.data.children.push(action.payload.field);
    },
    editTab: (state, action) => {
      let tab = state.layout.find(
        (x) => x.id === action.payload.id
      );
      tab.name = action.payload.name;
      tab.data = action.payload.data;
    },
    editContainer: (state, action) => {
      const foundTab = state.layout.find(
        (x) => x.id === action.payload.tabId
      );
      const container = foundTab.data.children.find((x) => x.id === action.payload.id);
      container.name = action.payload.name;
      delete action.payload.name;
      container.data = action.payload;
    },
    editField: (state, action) => {
      const foundTab = state.layout.find(
        (x) => x.id === action.payload.tabId
      );
      const foundParent = foundTab.data.children.find(
        (x) => x.id === action.payload.containerId
      );
      const foundField = foundParent.data.children.find(
        (x) => x.id === action.payload.field.id
      );
      foundField.name = action.payload.field.name;
      delete action.payload.field.name;
      foundField.data = action.payload.field;
    },
    removeTab: (state, action) => {
      state.layout = state.layout.filter((x) => x.id !== action.payload);
    },
    removeContainer: (state, action) => {
      const foundTab = state.layout.find(
        (x) => x.id === action.payload.tabId
      );
      foundTab.data.children = foundTab.data.children.filter((x) => x.id !== action.payload.containerId);
    },
    removeField: (state, action) => {
      const foundTab = state.layout.find(
        (x) => x.id === action.payload.tabId
      );
      const foundContainer = foundTab.data.children.find(
        (x) => x.id === action.payload.containerId
      );
      foundContainer.data.children = foundContainer.data.children.filter(
        (x) => x.id !== action.payload.field.id
      );
    },
  },
});

export const designerActions = designerSlice.actions;

export default designerSlice;
