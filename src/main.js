import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'Access-Control-Allow-Origin': '*'
};
window.axios = axios;

createApp(App).mount('#app')
