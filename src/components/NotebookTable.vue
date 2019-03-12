<template>

  <div class="notebook-table">
      <h1>Notebook Table Component</h1>
        <button @click="onNewNotebook">Add New Notebook</button>

        <table class="nb-table">
            <thead>
                <th>Index</th>
                <th>Description</th>
                <th>Last Updated</th>
            </thead>
            <tbody>
                <tr v-for="(nb, index) in notebooks" :key="index" @click="onShowNotebook(index)">
                    <td>{{index}}</td>
                    <td>{{nb.title}}</td>
                    <td>{{nb.date}}</td>
                </tr>
            </tbody>
        </table>

  </div>
</template>

<script>

export default {
  name: 'NotebookTable',
  props: {
      notebooks: Array,
  },
    data: function() {
        return {
        }
    },
    methods: {
        onNewNotebook: function() {
            console.log("Show Notebook")
            this.$emit('add-notebook')
        },
        onShowNotebook: function(index) {
            console.log("Show Notebook Number: " + JSON.stringify(index))
            this.$emit('edit-notebook', index)
        }
    },
}
</script>

<style>
.nb-table {
    width: 100%;
    border-collapse: collapse;
}
.nb-table  th {
    border-bottom: 2px solid black;
}
</style>
