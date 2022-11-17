import {createSlice} from '@reduxjs/toolkit';
import uuid from 'react-uuid';

const designerSlice = createSlice({
    name: 'designer',
    initialState: {
        name: 'Simple Design',
        id: uuid(),
        layout: []
    },
    reducers: {
        addContainer(state, action){
            state.layout = [...state.layout, action.payload]
        },
        addField(state, action){
            const foundContainer = state.layout.find(x => x.id === action.payload.id);
            foundContainer.data.children.push(action.payload.field);
        },
        editContainer(state, action){},
        editField(state, action){},
        removeContainer(state, action){
            state.layout = state.layout.filter(x => x.id !== action.payload);
        },
        removeField(state, action){
            const foundContainer = state.layout.find(x => x.id === action.payload.id);
            foundContainer.data.children = foundContainer.data.children.filter(x => x.id !== action.payload.field.id);
        },
    }
});

export const designerActions = designerSlice.actions;

export default designerSlice;