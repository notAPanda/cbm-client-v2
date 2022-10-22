<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { includes } from 'lodash'
import { get } from 'lodash'
import { onMounted, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()

const name: Ref<string> = ref('')
const email: Ref<string> = ref('')
const password: Ref<string> = ref('')
const validationErrors: Ref<any> = ref({})

function register() {
  auth
    .register({
      name: name.value,
      email: email.value,
      password: password.value,
    })
    .catch((error) => {
      let status = get(error, 'response.status')
      let errors = get(error, 'response.data.errors')

      if (includes([422], status)) {
        validationErrors.value = errors
      } else {
        console.error(errors)
      }
    })
}

onMounted(() => {
  auth.getUser().then(() => {
    if (auth.authenticated) {
      router.push('/')
    }
  })
})
</script>

<template>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <RouterLink to="/">
          <img class="mx-auto h-12 w-auto" src="public/icon.png" />
        </RouterLink>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-100">
          Sign up
        </h2>
      </div>
      <form class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="name" class="sr-only">Name</label>
            <input
              v-model="name"
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              required="true"
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Name"
            />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              v-model="email"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required="true"
              class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required="true"
              class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div v-if="validationErrors">
            <div v-for="(error, index) in validationErrors" :key="index">
              <span
                v-for="m in error"
                :key="m"
                class="mt-1 text-sm text-red-500"
                >{{ m }}</span
              >
            </div>
          </div>
        </div>

        <div>
          <button
            @click.prevent.stop="register"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            </span>
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
