<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from "vue";
import notify from "@/utils/notify.js";
import axios from "axios";
import { setToken } from "@/utils/localStorage";
import router from '@/router';

const api = import.meta.env.VITE_API_BASE_URL; // api_url

const name = defineModel<string>({default:""});
const password = defineModel<string>('password', {default:""});
const error = ref({
    name: "",
    password: ""
});
const validateForm = () => {
    if(name.value===""){
        error.value.name = "Name needs to fill";
    }
    if(password.value===""){
        error.value.password = "Password needs to fill";
    }
}
const handleSubmitFrom = async() => {
    validateForm();
    try{
      const response = await axios.post(`${api}/auth/register`, {
      name: name.value,
      password: password.value
      });
      setToken(response.data.data.token);
      router.push({ name: 'home', replace: true }); // goto home page
      notify({type:"success", message: "Registration success", theme:"dark"});
    }catch(error){
      // Handle errors
      notify({type:"error", message: error.response.data.message, theme:"dark"});
      name.value = "";
      password.value = "";
  } 
}
</script>

<template>
        <main class="w-screen h-screen flex bg-blue-300">
      <!-- Image -->
      <div class="hidden md:block md:flex-1 ps-0 lg:ps-10">
        <img
          src="../assets/Secure data-bro.svg"
          alt="avatar"
          class="w-full h-full object-cover object-center"
        />
      </div>
      <!-- Form -->
      <form
        @submit.prevent="handleSubmitFrom"
        class="flex-1 flex items-center justify-center md:justify-start px-6"
      >
        <div class="flex flex-col items-start min-w-[100%] sm:min-w-[80%] md:min-w-[60%] px-7 py-7  bg-bgChat rounded-lg">
          <h1 class="text-xl text-blue-700 md:text-3xl font-medium  w-full mb-5">
            Register Account
          </h1>
          <div class="flex flex-col gap-2 w-full mb-2">
            <label
              htmlFor="name"
              class=" text-base md:text-lg font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              class="py-2 px-4 text-base w-full rounded bg-transparent placeholder-gray-700 border-2 border-blue-100 outline-none"
              id="name"
              v-model="name"
              placeholder="Enter name.."
            />
            <span v-if="error.name" class="text-red-700 text-xs">{{ error.name }}</span>
          </div>
          <div class="flex flex-col gap-2 w-full mb-3">
            <label
              htmlFor="password"
              class=" text-base md:text-lg font-semibold"
            >
              Password
            </label>
            <input
              type="text"
              class="py-2 px-4 text-base w-full rounded bg-transparent placeholder-gray-700 border-2 border-blue-100  outline-none"
              id="password"
              v-model="password"
              placeholder="Enter password.."
            />
            <span v-if="error.password" class="text-red-700 text-xs">{{ error.password }}</span>
          </div>
          <button
            type="submit"
            class="mt-1 py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded block w-full"
          >
            Register
          </button>
          <div class=" w-full text-end">
            <span class="cursor-pointer">
              <router-link :to="{ name:'login' }" class="text-xs underline text-slate-50">
                Already have an account?
            </router-link>
            </span>
          </div>
        </div>
      </form>
    </main>
</template>


<style scoped>

</style>