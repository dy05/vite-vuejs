<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <button v-on:click="changeSetup()"></button>
  <HelloWorld msg="Grssseat" />
  <div class="loading" v-if="loading">
    <div class="loader"></div>
  </div>
  <div>
    <ul>
      <li v-for="(announce, index) in announces" :key="index">
        {{ announce.user.name }}
      </li>
    </ul>
  </div>
</template>

<style>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}
.loader {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  animation: scale 1s infinite;
}

@keyframes scale {
  0% {
    background-color: transparent;
    width: 50px;
    height: 50px;
  }
  100% {
    background-color: #fff;
  }
}

</style>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  components: {HelloWorld},
  data() {
    return {
      loading: false,
      announces: []
    }
  },
  mounted() {
    this.changeSetup();
  },
  methods: {
    changeSetup() {
      axios.get('/sanctum/csrf-cookie')
        .then(() => {
          this.loading = true;
          axios.post(`/announcements`, {
            name: 'loll'
          }).then((response) => {
            console.log(response.data)
            this.announces = response.data
          }).catch((error) => {
            console.log(error?.response?.data)
          }).finally((response) => {
            console.log(response)
            setTimeout(() => {
              this.loading = false;
            }, 2000)
          })
        });
    },
    getAnnounces() {
      axios.get('/sanctum/csrf-cookie')
        .then(() => {
          this.loading = true;
          axios.get(`/announcements`).then((response) => {
            console.log(response.data)
            this.announces = response.data
          }).catch((error) => {
            if (error.response.status === 404) {
              alert('La page n\'existe pas')
            }
            console.log(error?.response?.data)
          }).finally((response) => {
            console.log(response)
            setTimeout(() => {
              this.loading = false;
            }, 2000)
          })
        })
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
