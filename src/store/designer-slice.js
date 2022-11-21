import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { loadState } from "../core-design/tools/browser-storage";

const designerSlice = createSlice({
  name: "designer",
  initialState: {
    name: "Simple Design",
    id: uuid(),
    layout: [],
  },
  reducers: {
    shiftLeftTab: (state, action) => {
      if(action.payload !== 0) insertAndShift(state.layout, action.payload, action.payload - 1)
    },
    shiftRightTab: (state, action) => {
      if(action.payload !== state.layout - 1) insertAndShift(state.layout, action.payload, action.payload + 1)
    },
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
    editForm: (state, action) => {state.name = action.payload.name},
    setForm: (state, action) => {
      state = action.payload
      console.log(state)
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
      const container = foundTab.data.children.find((x) => x.id === action.payload.container.id);
      container.name = action.payload.container.name;
      delete action.payload.container.name;
      container.data = action.payload.container;
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
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchFormById.fulfilled, (state, action) => {
      // Add user to the state array
      // state = action.payload
      state.layout = action.payload.layout;
      state.id = action.payload.id;
      state.name = action.payload.name;
    })
  }
});

export const fetchFormById = createAsyncThunk(
  'designer/setForm',
  async (id, thunkAPI) => {
    if (!id || id === 'new') {
      return{
        name: "Simple Design",
        id: uuid(),
        layout: [],
      }
    }
    const data = await loadState();
    return data.find(x => x.id === id);
  }
)

export const designerActions = designerSlice.actions;

export default designerSlice;


function insertAndShift(arr, from, to) {
  let cutOut = arr.splice(from, 1)[0]; // cut the element at index 'from'
  arr.splice(to, 0, cutOut);            // insert it at index 'to'
}