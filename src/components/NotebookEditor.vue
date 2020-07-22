<template>

  <div class="notebook-editor">
      <div class="container">
        <b-field label="Title" horizontal>
            <b-input :value="notebookTitle" v-model="notebookTitle"></b-input>
        </b-field>

        <b-field label="Notebook" horizontal>
            <editor 
                :initial-value="notebookContent" 
                v-model="notebookContent"
                :init="tinymce_config">
            </editor>
        </b-field>

        <b-field label="File Options" horizontal>
            <button v-on:click="onSaveNote">Save</button>
            <button v-on:click="onDeleteNote">Delete</button>
            <button v-on:click="onCancel">Cancel</button>
        </b-field>

      </div>
  </div>
</template>

<script>

// Import TinyMCE
// eslint-disable-next-line
import tinymce from 'tinymce';

// A theme is also required

import 'tinymce/icons/default';
import 'tinymce/themes/silver';

import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/default/content.css';

// Any plugins you want to use has to be imported
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/print';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/save';
import 'tinymce/plugins/fullpage';


// Import TinyMCE
import Editor from '@tinymce/tinymce-vue';

// Initialize the app
// All Plugins and toolbar options
//  plugins: 'print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks 
//            visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak 
//            nonbreaking anchor toc insertdatetime advlist lists wordcount tinymcespellchecker a11ychecker 
//            imagetools textpattern help formatpainter permanentpen pageembed tinycomments mentions linkchecker',
//  toolbar: 'formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image media pageembed | 
//            alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | 
//            removeformat | addcomment',

const config = {
  height: 500,
  inline: false,
  branding: false,
//   theme: 'silver',
  plugins: 'code fullscreen fullpage hr insertdatetime image imagetools link lists paste print save table template',
  toolbar: [
      'undo redo | save | formatselect bold italic | numlist bullist | alignleft aligncenter alignright alignjustify | link image',
      'bold italic hr forecolor backcolor fullpage',
  ],
  templates: [
    {title: 'Template 1', description: 'A data capture template', content: 'My content'},
    {title: 'Template 2', description: 'A processing template', url: 'notebook_template.html'}
  ],
};

export default {
    name: 'NotebookEditor',
    props: {
        initialNotebook: Object,
        notebookIndex: Number,
    },
    data: function() {
        return {
            notebookContent: '',
            notebookTitle: '',
            editing: false,
            tinymce_config: config,
        }
    },
    methods: {
        onSaveNote: function() {
            let payload = {text: this.notebookContent, index: this.$props.notebookIndex, title: this.notebookTitle}
            this.$emit('update-notebook', payload)
            this.editing = false
        },
        onDeleteNote: function() {
            this.$store.commit('delete', this.$props.notebookIndex)
            this.editing = false
        },
        onCancel: function() {
            this.editing = false
            this.$emit('cancel')
        }
    },
    components: {
        'editor': Editor,
    },
    created: function() {
        console.log("Vue component Created")
        var self = this
        this.tinymce_config.save_onsavecallback = function () { 
            self.onSaveNote()
            console.log('Saved'); 
        }
    },
    mounted: function() {
        console.log("Mounted Editor: " + JSON.stringify(this.$props.initialNotebook))
        this.notebookContent = this.$props.initialNotebook.text
        this.notebookTitle = this.$props.initialNotebook.title

        this.editing = true
    }
}
</script>
