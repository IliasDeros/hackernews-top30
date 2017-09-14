import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import firebase from 'firebase'

firebase.initializeApp({
  databaseURL: 'https://hacker-news.firebaseio.com/'
})

ReactDOM.render(<App />, document.getElementById('root'))