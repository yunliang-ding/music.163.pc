import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from './app'
import { useStrict } from 'mobx'
useStrict(true)
ReactDOM.render( <App />,  document.querySelector('#root') )