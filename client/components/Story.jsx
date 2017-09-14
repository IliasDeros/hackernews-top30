import React from 'react'

export default class Story extends React.Component {
  constructor(props){
    super(props)
    const { id, title, by: author } = props.story
    Object.assign(this, { id, title, author })
  }

  render(){
    return (
      <li>{this.title} - {this.author}</li>
    )
  }
}