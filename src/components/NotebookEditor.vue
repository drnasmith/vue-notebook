<template>

  <div class="notebook-editor">
      <div v-if="editing">
          <editor :initial-value="initialData" v-model="notebook_content"></editor>
          <button v-on:click="onSaveNote">Save</button>
          <button v-on:click="onDeleteNote">Delete</button>
      </div>
      <div v-else>
          <button v-on:click="onEditNote">Edit</button>
      </div>
  </div>
</template>

<script>

// Import TinyMCE
// eslint-disable-next-line
import tinymce from 'tinymce';

// A theme is also required
import 'tinymce/themes/modern/theme';

// Any plugins you want to use has to be imported
//import 'tinymce/plugins/paste';
//import 'tinymce/plugins/link';


// Import TinyMCE
import Editor from '@tinymce/tinymce-vue';

// Initialize the app

export default {
  name: 'NotebookEditor',
  props: {
    initialData: String,
    index: Number,
  },
  mounted: function() {
      console.log("Created....Notebook " + this.$props.index)
      this.editing = true
  },
  data: function() {
      return {
          notebook_content: this.$props.initialData,
          editing: false
      } 
  },
  methods: {
      onSaveNote: function() {
          let payload = {text: this.notebook_content, index: this.$props.index}
          this.$store.commit('update', payload)
          this.editing = false
      },
      onDeleteNote: function() {
          this.$store.commit('delete', this.$props.index)
          this.editing = false
      },
      onEditNote: function() {
          this.editing = true
      }
  },
  components: {
      'editor': Editor,
  },
}
</script>