import React from 'react'

export default class Story extends React.Component {
  constructor(props){
    super(props)
    const { id, title, by: author, url  } = props.story
    Object.assign(this, { author, id, title, url })
  }

  render(){
    return (
      <li className='item'>
       <a href={`${this.url}`} target="_blank">{this.title}</a><span className="author">{this.author}</span>
      </li>
    )
  }
}