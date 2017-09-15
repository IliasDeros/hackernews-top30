import React from 'react'

export default class Story extends React.Component {
  constructor(props){
    super(props)
    const { id, title, by: author, url  } = props.story
    Object.assign(this, { author, id, title, url })
  }

  render(){
    return (
      <li><a href={`${this.url}`} target="_blank">{this.title}</a> - {this.author}</li>
    )
  }
}