import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PeopleTable from './PeopleTable'
import { produce } from 'immer'
import axios from 'axios'

ReactDOM.createRoot(document.getElementById('root')).render(
    <PeopleTable />
)
