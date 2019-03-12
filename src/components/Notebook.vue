<template>

  <div class="notebook">
    <h1>Notebook Test</h1>
    <p>{{msg}}</p>
    <section v-if="showNotebooks">
        <NotebookTable 
            v-bind:notebooks="notebooks" 
            v-on:add-notebook="addNote"
            v-on:edit-notebook="editNote"
            />
    </section>

    <section v-else>
        <NotebookEditor
            v-bind:initialNotebook="currentNotebook" 
            v-bind:notebookIndex="notebookIndex" 
            v-on:update-notebook="onSaveNotebook"
            v-on:cancel="onCancelNotebook">
        </NotebookEditor>
    </section>

  </div>
</template>

<script>
import NotebookEditor from './NotebookEditor'
import NotebookTable from './NotebookTable'
// Initialize the app

export default {
  name: 'Notebook',
  props: {
    msg: String
  },
  data: function() {
      return {
            notebookContent: '',
            notebookTitle: '',
            notebookIndex: 0,

            showNotebooks: true,
            
            columns: [
                {
                field: 'id',
                    label: 'ID',
                    width: '40',
                    numeric: true,
                    centered: true
                },
                {
                    field: 'title',
                    label: 'Title',
                    centered: true
                },                {
                    field: 'date',
                    label: 'Date',
                    centered: true
                },
            ],
        }
  },
  computed: {
      notebooks() {
          return this.$store.state.notebooks
      },
      currentNotebook() {
          return {title: this.notebookTitle, text: this.notebookContent, index: this.notebookIndex}
      }
  },
  components: {
      NotebookEditor,
      NotebookTable,
  },

  methods: {
      addNote: function() {
          // Creating new content so set values to empty
          this.notebookContent = 'Placeholder Content'
          this.notebookTitle = 'Placeholder Title'
          // This will be a new notebook - get next index value
          this.notebookIndex = this.$store.state.notebooks.length
          // Finally show the editing panel...
          this.showNotebooks = false
      },
      editNote: function(index) {
            console.log("Edit notebook index = " + index)
        
            if (index <= this.$store.state.notebooks.length) {
                this.notebookContent = this.$store.state.notebooks[index].text
                this.notebookTitle = this.$store.state.notebooks[index].title
                console.log("Editing Content: " + this.notebookContent)
                console.log("Editing Title: " + this.notebookTitle)
                this.notebookIndex = index
            }
            // Now make the editor pane visible...
            this.showNotebooks = false
      },
      onSaveNotebook: function(content) {
          this.$store.commit('update', content)
          this.showNotebooks = true
          this.notebookContent = ''
          this.notebookTitle = ''
      },
      onCancelNotebook: function() {
          this.showNotebooks = true
          this.notebookContent = ''
          this.notebookTitle = ''
      }
  },
}
</script>