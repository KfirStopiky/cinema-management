import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "persist-key",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

// export default configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

export default store;
export { persistor };
