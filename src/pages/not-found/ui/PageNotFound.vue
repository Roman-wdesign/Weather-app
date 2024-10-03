<template>
  <div class="min-h-[80vh] bg-white dark:bg-gray-800 flex flex-col">
    <div class="grid h-[80vh] place-content-center px-4">
      <div class="text-center">
        <h1 class="text-9xl font-black text-gray-200 dark:text-gray-400">404</h1>
        <p class="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Uh-oh!
        </p>
        <p class="mt-4 text-gray-500 dark:text-gray-300">
          Try searching again, or return home to start from the beginning.
        </p>
        <router-link to="/"
          class="mt-6 inline-block rounded bg-indigo-600 dark:bg-indigo-500 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-400 focus:outline-none focus:ring">
          Go Back Home
        </router-link>
      </div>
    </div>
  </div>
</template>