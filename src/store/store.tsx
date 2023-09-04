import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

const store = configureStore({
	reducer: {},
	middleware: [thunk],
	devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
