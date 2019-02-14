<template>

  <div class="notebook">
    <h1>Notebook</h1>
    <p>{{msg}}</p>
    <button v-on:click="addNote">Add Note</button>
    <div>
        <p>There are {{notes}} in the store</p>
        <div v-for="(nb, index) in notebooks" v-bind:key="index">
            <h2>Note: {{index}}</h2>
            <NotebookEditor name="index" v-bind:intialData="nb" v-bind:index="index"></NotebookEditor> 
        </div>
    </div>
  </div>
</template>

<script>
import NotebookEditor from './NotebookEditor'
// Initialize the app

export default {
  name: 'Notebook',
  props: {
    msg: String
  },
  data: function() {
      return {
          notebook_content: '',
          show_notebook: false,
          edit_notebook_index: undefined,
      }
  },
  computed: {
      notebooks() {
          return this.$store.state.notebooks
      },
      notes() {
          return this.$store.state.notebooks.length
      }
  },
  components: {
      NotebookEditor,
  },

  methods: {
      addNote: function() {
          console.log("Add Note")
          this.$store.commit('add', "placeholder")
      },
  },
}
</script>