import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // This needs to be updated with an object
  // Otherwise removing an item from the list does not work...
  state: {
    notebooks: []
  },
  mutations: {
    add (state, text) {
      console.log("Adding note: " + text + " to notebooks ")
      state.notebooks.push(text)
    },
    update (state, note) {
      // Accepts a payload "note" {note: "my note", index: 0}
      console.log("Updating note: " + note.text + " to notebooks at " + note.index)
      if (note.index < state.notebooks.length) {
        state.notebooks[note.index].title = note.title
        state.notebooks[note.index].text = note.text
        state.notebooks[note.index].date = Date()
      } else {
        // Add new one if none exists
        note.date = Date()
        state.notebooks.push(note)
      }
    },
    delete (state, noteIndex) {
      console.log("Removing note from notebooks, index = " + noteIndex)
      if (noteIndex > -1) {
        Vue.delete(state.notebooks, noteIndex)
      }
    }
  },
  actions: {

  }
})
