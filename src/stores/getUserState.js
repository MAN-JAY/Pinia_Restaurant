// auth.js

import { defineStore } from 'pinia';
import {ref,computed} from 'vue'

export const useAuthStore = defineStore('auth', () => {


    const users = ref(JSON.parse(localStorage.getItem('users') )||[])
    const currentUser = ref({})

    const isLoggedIn =  computed(() => !!currentUser.value)
  
    const login = (username, password) => {
      const user = users.value.find(user => user.username === username.value && user.password === password.value);
      if (user) {
        currentUser.value = user;
        return true; // Successful login
      } else {
        return false; // Invalid credentials
      }
    }

    const register = (name, username, password) => {
      const userExists = users.value.some(user => user.username === username);
      if (userExists) {
        return false; // User already exists
      } else {
        const newUser = { name, username, password };
        users.value.push(newUser);
        localStorage.setItem('users', JSON.stringify(users.value));
        return true; // Successful registration
      }
    }
    const logout = () => {
      this.currentUser = null;
    }
    return {users,currentUser,isLoggedIn,login,register,logout}
}
 
);
