import firebase from 'firebase'

export default class TopstoriesWatcher {
  constructor(){
    Object.assign(this, {
      commenters: {},
      commentLimit: 10,
      rootRef: firebase.database().ref('v0'),
      storyLimit: 30,
      subscribedStories: {},
      topCommenters: [],
      topstories: []
    })
    this.subscribe('topstories', this.updateStories.bind(this))
  }

  loadCommenter(name){
    if (!this.commenters[name]){
      this.commenters[name] = {}
      this.subscribe(`user/${name}`, this.updateCommenter.bind(this))
    }
  }

  recursivelyLoadComments(item){
    let comments = item.kids

    comments && comments.forEach(id => {
      this.subscribe(`item/${id}`, comment => {
        if (comment){
          this.loadCommenter(comment.by)
          this.recursivelyLoadComments(comment)
        }
      })
    })
  }

  removeTopStory(story){
    this.unsubscribe(`item/${story.id}`)
  }

  setTopCommenter(commenter){
    const topCommenters = this.topCommenters
    let existing = topCommenters.find(({ id }) => id === commenter.id)

    existing || topCommenters.push(commenter)
    topCommenters.length > this.commentLimit && topCommenters.pop()

    topCommenters.sort((a, b) => b.submitted.length - a.submitted.length)
  }

  setTopstory(story){
    const topstories = this.topstories
    let existing = topstories.find(({ id }) => id === story.id)

    existing || topstories.push(story)
    topstories.length > this.storyLimit && topstories.pop()

    topstories.sort((a, b) => b.score - a.score)
  }

  subscribe(child, cb){
    this.rootRef.child(child).on('value', (s) => { cb(s.val()) })
  }

  unsubscribe(child){
    this.rootRef.child(child).off()
  }

  updateCommenter(commenter){
    let lowestRanked = this.topCommenters[this.commentLimit - 1],
        score = commenter.submitted.length

    // move to the top!
    if (!lowestRanked || lowestRanked.submitted.length < score){
      this.setTopCommenter(commenter)
      this.refreshTopCommenters(this.topCommenters)
    }
  }

  updateStories(topstoryIds){
    const { subscribedStories } = this

    // subscribe new stories
    topstoryIds.forEach(id => {
      subscribedStories[id] || this.subscribe(`item/${id}`, this.updateStory.bind(this))
    })
  }

  updateStory(story){
    let lowestRanked = this.topstories[this.storyLimit - 1]

    // move to the top!
    if (!lowestRanked || lowestRanked.score < story.score){
      this.setTopstory(story)
      this.recursivelyLoadComments(story)
      this.refreshTopstories(this.topstories)
    }
  }

  refreshTopCommenters(){
    console.error("Unable to load top commenters. Please override 'TopstoriesWatcher.refreshTopCommenters'")
  }

  refreshTopstories(){
    console.error("Unable to load top stories. Please override 'TopstoriesWatcher.refreshTopstories'")
  }
}