import { configureStore } from "@reduxjs/toolkit";
import designerSlice from "./designer-slice";

const store = configureStore({
    reducer: {
        designer: designerSlice.reducer
    }
})

export default store