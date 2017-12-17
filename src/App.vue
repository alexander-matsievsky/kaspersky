<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import 'normalize.css'
  import { employees } from './data/employees'

  export default {
    name: 'app',
    async created () {
      employees.changes.subscribe(
        console.log.bind(console),
        console.error.bind(console)
      )
      try {
        await employees.fetch('/static/dataset.json')
      } catch (error) {
        console.error(error)
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    border: 0;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100vh;
    width: 100vw;
  }

  ul {
    bottom: 0;
    list-style: none;
  }
</style>
