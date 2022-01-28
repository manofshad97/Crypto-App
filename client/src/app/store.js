import { configureStore } from "@reduxjs/toolkit"
import { cryptoApi } from "../services/cryptoApi"
import { cryptoNewsApi } from "../services/cryptoNewsApi"

//redux store with cryptoApi that was created in services
export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat((cryptoApi.middleware),(cryptoNewsApi.middleware))
})