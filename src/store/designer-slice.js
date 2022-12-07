import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { loadState } from "../utils/browser-storage";

const initialState = {
  name: "Simple Schema",
  id: uuid(),
  description: "This is a simple Form",
  createdAt: new Date().toString(),
  modifiedAt: new Date().toString(),
  version: "0.0.0",
  submitURL: "",
  layout: [],
};

const designerSlice = createSlice({
  name: "designer",
  initialState,
  reducers: {
    reset: () => initialState,
    shiftLeftTab: (state, action) => {
      if (action.payload !== 0)
        insertAndShift(state.layout, action.payload, action.payload - 1);
    },
    shiftLeftContainer: (state, action) => {
      const foundTab = state.layout.find((x) => x.id === action.payload.tabId);
      const foundContainerIndex = foundTab.data.children.findIndex(
        (x) => x.id === action.payload.containerId
      );
      if (action.payload !== 0)
        insertAndShift(
          foundTab.data.children,
          foundContainerIndex,
          foundContainerIndex - 1
        );
    },
    shiftLeftField: (state, action) => {
      const foundTab = state.layout.find((x) => x.id === action.payload.tabId);
      const foundContainer = foundTab.data.children.find(
        (x) => x.id === action.payload.containerId
      );
      const foundFieldIndex = foundContainer.data.children.findIndex(
        (x) => x.id === action.payload.field.id
      );
      if (action.payload !== 0)
        insertAndShift(
          foundContainer.data.children,
          foundFieldIndex,
          foundFieldIndex - 1
        );
    },
    shiftRightTab: (state, action) => {
      if (action.payload !== state.layout - 1)
        insertAndShift(state.layout, action.payload, action.payload + 1);
    },
    shiftRightContainer: (state, action) => {
      const foundTab = state.layout.find((x) => x.id === action.payload.tabId);
      const foundContainerIndex = foundTab.data.children.findIndex(
        (x) => x.id === action.payload.containerId
      );
      if (action.payload !== 0)
        insertAndShift(
          foundTab.data.children,
          foundContainerIndex,
          foundContainerIndex + 1
        );
    },
    shiftRightField: (state, action) => {
      const foundTab = state.layout.find((x) => x.id === action.payload.tabId);
      const foundContainer = foundTab.data.children.find(
        (x) => x.id === action.payload.containerId
      );
      const foundFieldIndex = foundContainer.data.children.findIndex(
        (x) => x.id === action.payload.field.id
      );
      if (action.payload !== 0)
        insertAndShift(
          foundContainer.data.children,
          foundFieldIndex,
          foundFieldIndex + 1
        );
    },
    addTab: (state, action) => {
      state.layout = [...state.layout, action.payload];
    },
    addContainer: (state, action) => {
      const foundTab = state.layout.find((x) => x.id === action.payload.tabId);
      foundTab.data.children.push(action.payload.container);
    },
    addField: (state, action) => {
      const foundTab = state.layout.find((x) => x.id === action.payload.tabId);
      const foundContainer = foundTab.data.children.find(
        (x) => x.id === action.payload.containerId
      );
      foundContainer.data.children.push(action.payload.field);
    },
    editForm: (state, action) => {
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.version = action.payload.version;
      state.modifiedAt = action.payload.modifiedAt;
      state.submitURL = action.payload.submitURL;
    },
    setForm: (state, action) => {
      state = action.payload;
    },
    editTab: (state, action) => {
      let tab = state.layout.find((x) => x.id === action.payload.id);
      tab.name = action.payload.name;
      tab.data = action.payload.data;
    },
    editContainer: (state, action) => {
      const foundTab = state.layout.find((x) => x.id === action.payload.tabId);
      const container = foundTab.data.children.find(
        (x) => x.id === action.payload.container.id
      );
      container.name = action.payload.container.name;
      delete action.payload.container.name;
      container.data = action.payload.container;
    },
    editField: (state, action) => {
      const foundTab = state.layout.find((x) => x.id === action.payload.tabId);
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
      const foundTab = state.layout.find((x) => x.id === action.payload.tabId);
      foundTab.data.children = foundTab.data.children.filter(
        (x) => x.id !== action.payload.containerId
      );
    },
    removeField: (state, action) => {
      const foundTab = state.layout.find((x) => x.id === action.payload.tabId);
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
    });
  },
});

export const fetchFormById = createAsyncThunk(
  "designer/setForm",
  async (id, thunkAPI) => {
    if (!id || id === "new") {
      return {
        ...initialState,
      };
    }
    const data = await loadState();
    return data.find((x) => x.id === id);
  }
);

export const designerSelect = (state) => state.designer;

export const designerActions = designerSlice.actions;

export default designerSlice;

function insertAndShift(arr, from, to) {
  let cutOut = arr.splice(from, 1)[0]; // cut the element at index 'from'
  arr.splice(to, 0, cutOut); // insert it at index 'to'
}
