<template>
  <div id="app">
    <h1> Person overview - retrieved from: {{ personListIp }}</h1>
    <div class="container">
      <PersonList :persons="persons" v-on:person-selected="loadDetails($event)" />
    </div>

    <h1> Person details - retrieved from: {{ personDetailIp }}</h1>
    <div class="container">
      <PersonDetails :selected="selected" />
    </div>
  </div>
</template>

<script>
 /* eslint-disable */
import PersonList from './components/PersonList.vue'
import PersonDetails from './components/PersonDetails.vue'
import axios from 'axios'
import config from './config.js'

const BACKEND_HOST = config.BACKEND_HOST
const BACKEND_PORT = config.BACKEND_PORT

export default {
  name: 'app',
  components: {
    PersonList,
    PersonDetails
  },
  data: function() {
    return {
      persons: [""],              // Dummy object list
      selected : { "x" : 1 },     // Dummy object
      personListIp: '0.0.0.0',    // Placeholder for IP
      personDetailIp: '0.0.0.0'   // Placeholder for IP
    }
  },
  methods: {
    loadDetails: function(id) {
      console.log('Received request to show details for ' + id)
      axios.get('http://' + BACKEND_HOST + ':' + BACKEND_PORT + '/api/person/'+id)
      .then(response => {
        console.log(response)
        this.personDetailIp = response.data.serverLocalAddress
        this.selected = response.data.personDetails

        console.log(this.selected)
      })
    }
  },
  mounted: function() {
    console.log('Loading all persons..')
    axios.get('http://' + BACKEND_HOST + ':' + BACKEND_PORT + '/api/person')
    .then(response => {
      console.log(response)
      this.personListIp = response.data.serverLocalAddress
      this.persons = response.data.persons

      console.log(this.persons)
    })
  }
}
</script>

<style>
body {
  background-color: #ffa2fc !important; 
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
