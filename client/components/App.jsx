import React from 'react'
import TopStoriesWatcher from './TopStoriesWatcher'
import TopStories from './TopStories.jsx'
import TopCommenters from './TopCommenters.jsx'

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {}
  }

  componentDidMount(){
    this.setState({ firebaseWatcher: new TopStoriesWatcher() })
  }

  render() {
    return (
      <main>
        <h1>TOP 30 HackerNews Stories</h1>
        {(() => this.state.firebaseWatcher && <TopStories firebaseWatcher={this.state.firebaseWatcher} />)()}

        <h2>Their 10 most popular commenters</h2>
        {(() => this.state.firebaseWatcher && <TopCommenters firebaseWatcher={this.state.firebaseWatcher} />)()}
      </main>
    )
  }
}