<template>
  <div v-if="cookie" class="flex flex-col gap-4 p-5 bg-blue-100 rounded-2xl m-4 sm:m-5 sm:max-w-[356px] 2xl:max-w-[436px] fixed bottom-0 right-0">
    <span class="text-white font-bold text-sm 2xl:text-base">Мы используем файлы Cookie</span>
    <span class="text-white text-sm 2xl:text-base"
      >Это необходимо для того, чтобы сделать сайт более удобным для вас.
      Продолжая использовать сайт, вы соглашаетесь со сбором и обработкой
      <a href="">Персональных данных.</a>
      </span
    >
    <button @click="cookie = false" class="btn btn-white">согласиться</button>
  </div>
</template>

<script setup>
const cookie = ref(true);
</script>
