import React from 'react'
import Story from './Story.jsx'

export default class TopStories extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    props.firebaseWatcher.refreshTopstories = this.refreshTopstories.bind(this)
  }

  refreshTopstories(topstories){
    this.setState({ stories: topstories })
  }

  render(){
    return (
      <ul>
        {(() => this.state.stories ?
          this.state.stories.map(createStory.bind(this)) :
          <li>Looking for the best stories...</li>
        )()}
      </ul>
    )

    function createStory(story){
      return (
        <Story key={story.id} story={story} />
      )
    }
  }
}