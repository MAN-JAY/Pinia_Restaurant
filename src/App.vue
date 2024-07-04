<script setup>
import {useCountryStore} from './stores/getCountry'
import {onMounted,ref} from 'vue'
import { storeToRefs } from "pinia";
import {useCapitalStore} from './stores/getCapital'
import {useAuthStore} from './stores/getUserState'

const {users,currentUser} = storeToRefs(useAuthStore())
const {isLoggedIn,login,register,logout} = useAuthStore()

const countryStore = useCountryStore()
const {onCountryChange,fetchCountries} = countryStore
const {countries,selectedCountry} = storeToRefs(countryStore)

const capitalStore = useCapitalStore()
const {countryCapital,loading} = storeToRefs(capitalStore)


// Fetch countries on component mount
onMounted(fetchCountries)

    const showLogin = ref(false);
    const showRegister = ref(false);
    const username = ref('');
    const password = ref('');
    const name = ref('');
    const regUsername = ref('');
    const regPassword = ref('');

    const showLoginForm = () => {
      showLogin.value = true;
      showRegister.value = false;
    };

    const showRegisterForm = () => {
      showLogin.value = false;
      showRegister.value = true;
    };

    const userLogin = () => {
      // Implement login logic here
      login(username,password)
      console.log("Logged ", isLoggedIn())
    };

    const userRegister = () => {
      // Implement registration logic here
      register(name,regUsername,regPassword)
      console.log('Register clicked');
    };


</script>

<template>

<div class="header">

<div class="lHeader">
<span>Home</span>
<span>About</span>
</div>

<div class="rHeader">
      <div v-if="!isLogged">
        <button @click="showLoginForm">Sign In</button>
        <button @click="showRegisterForm">Register</button>
      </div>
      <div v-else>
        <h3>{{ currentUser.name }}</h3>
        <button @click="logout">Logout</button>
      </div>

    </div>
</div>
<div class="container">
  <div v-if="showLogin" class="form-container">
      <!-- Login Form -->
      <form @submit.prevent="userLogin" class="form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password">
        </div>
        <button type="submit">Login</button>
      </form>
    </div>

    <div v-if="showRegister" class="form-container">
      <!-- Register Form -->
      <form @submit.prevent="userRegister" class="form">
        <div class="form-group">
          <label for="regName">Name:</label>
          <input type="text" id="regName" v-model="name">
        </div>
        <div class="form-group">
          <label for="regUsername">Username:</label>
          <input type="text" id="regUsername" v-model="regUsername">
        </div>
        <div class="form-group">
          <label for="regPassword">Password:</label>
          <input type="password" id="regPassword" v-model="regPassword">
        </div>
        <button type="submit">Register</button>
      </form>
    </div>


<div v-if="!(showLogin || showRegister)" >
<div class="main">

  <div class="mainHeader">
  <h1>Pinia Country/Capital</h1>
  <img src="./assets/Pinialogo.svg" />
  </div>

  <br/>
  <!-- <input type="text" v-model="search" @input="fetchCities" placeholder="Type a city...">
    <ul v-if="showSuggestions">
        <li v-for="city in cities" @click="selectCity(city)">{{ city }}</li>
    </ul> -->

    <!-- <input v-model="search" @input="fetchCities" placeholder="Type a city..." type="text"  style="width: 500px;"/>
      <ul v-if="showSuggestions">
        <li v-for="city in cities" @click="selectCity(city)">{{ city }}</li>
    </ul> -->

  <div class="mainInput">
    <div class="city">
      <span style="padding:20px">Country : </span>
      <select v-model="selectedCountry" @change="onCountryChange" style="width: 400px;">
      <option disabled value="">Select a country</option>
      <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
    </select>

    </div>
    <br/>
       <!-- Spinner component -->
       <div v-if="loading" class="spinner">
      <div class="spinner-icon"></div>
      <div>Loading...</div>
      </div>
      <div v-else>
        <!-- <div v-if="countryCapital" class="Search"> -->
      <h2 v-if="countryCapital" >Capital of {{ selectedCountry }}  : {{ countryCapital }}</h2>
    </div>      
  </div>
</div>
</div>
</div>

</template>

<style scoped>



  /* .main{
    margin-top:60px;
    display:flex;
    justify-content: center;
    flex-direction: column;
    padding:100px
  }

  .mainHeader{
    display: flex;
    justify-content: center;
  }

  .mainInput{

    display: flex;
    justify-content: center;  
    flex-direction: column;
    padding-top: 120px;
 }

  .mainHeader > img{
    margin-left:50px;
    height:100px;
    width:70px
    
  }


  .header {
    display: flex;
    flex-wrap: nowrap;
    justify-content:space-around;
  }

  .lHeader > span{
    padding:5px
  }

  .rHeader >button{
    margin:5px
  } */

  .mainHeader{
    display: flex;
    justify-content: center;
  }
  .header {
    display: flex;
    flex-wrap: nowrap;
    justify-content:space-around;
    padding: 50px;
  }

  
  .mainHeader > img{
    margin-left:50px;
    height:100px;
    width:70px
    
  }

  .lHeader > span{
    padding:10px
  }

  .rHeader >button{
    margin:10px
  }

  .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
}

.mainHeader {
  margin-bottom: 40px; /* Adjust as needed */
}

.mainInput {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20vh;
}

.city,
.Search {
  margin-bottom: 20px; /* Adjust as needed */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spinner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px; /* Adjust as needed */
}

.spinner-icon {
  border: 6px solid #f3f3f3;
  border-radius: 50%;
  border-top: 6px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite; /* Apply the spin animation */
}

/* Additional styling for spinner text */
.spinner div {
  margin-top: 10px;
}

.form-container {
  width: 300px;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 10px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

</style>./stores/getCountry
