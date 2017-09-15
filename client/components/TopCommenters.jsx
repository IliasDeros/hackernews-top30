import React from 'react'
import Commenter from './Commenter.jsx'

export default class TopCommenters extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    props.firebaseWatcher.refreshTopCommenters = this.refreshTopCommenters.bind(this)
  }

  refreshTopCommenters(topCommenters){
    this.setState({ commenters: topCommenters })
  }

  render(){
    return (
      <ul>
        {(() => this.state.commenters ?
          this.state.commenters.map(createCommenter.bind(this)) :
          <li>Awarding best commenters...</li>
        )()}
      </ul>
    )

    function createCommenter(commenter){
      return (
        <Commenter key={commenter.id} commenter={commenter} />
      )
    }
  }
}