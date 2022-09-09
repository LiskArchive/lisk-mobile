import thunk from 'redux-thunk'
import socketMiddleware from './socket'
import settingsMiddleware from './settings'

export default [thunk, socketMiddleware, settingsMiddleware]
