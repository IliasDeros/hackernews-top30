import React from 'react'

export default class Story extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      score: props.commenter.submitted.length
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      score: nextProps.commenter.submitted.length
    })
  }

  render(){
    return (
      <li className="item">{this.props.commenter.id} - {this.state.score} comments</li>
    )
  }
}