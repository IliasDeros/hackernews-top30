import firebase from 'firebase'

export default class TopstoriesWatcher {
  constructor(){
    Object.assign(this, {
      rootRef: firebase.database().ref('v0'),
      storyRefs: {},
      topstories: [],
      topcommenters: []
    })
    this.subscribe('topstories', this.updateStories.bind(this))
  }

  setTopstory(story){
    const topstories = this.topstories
    let existing = topstories.find(({ id }) => id === story.id)

    existing || topstories.push(story)

    topstories.sort((a, b) => a.score - b.score)
  }

  subscribe(child, cb){
    this.rootRef.child(child).on('value', (s) => { cb(s.val()) })
  }

  unsubscribe(child){
    this.rootRef.child(child).off()
  }

  updateStories(topstoryIds){
    const { storyRefs } = this,
          refsToRemove = {}

    // subscribe new stories
    topstoryIds.forEach(id => {
      storyRefs[id] ? refsToRemove[id] = storyRefs[id] : this.subscribe(`item/${id}`, this.updateStory.bind(this))
    })

    // unsubscribe removed stories
    for (let ref in refsToRemove){ this.unsubscribe(`item/${ref}`) }
  }

  updateStory(story){
    let lowestRanked = this.topstories[29]

    if (!lowestRanked || lowestRanked.score < story.score){
      this.setTopstory(story)
      this.refreshTopstories(this.topstories)
    }
  }

  refreshTopstories(topstories){
    console.error("Unable to load top stories. Please override 'TopstoriesWatcher.refreshTopstories'")
  }
}