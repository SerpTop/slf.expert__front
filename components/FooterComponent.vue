<template>
  <div
    class="_container flex flex-col gap-5 sm:gap-10 xl:gap-[60px] 2xl:gap-20 bg-gray-400 pt-[60px] sm:pt-20 xl:pt-[120px] 2xl:pt-[200px] pb-5"
  >
    <h2>Контакты</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
      <div>
        <NuxtImg name="logo"/>
      </div>
      <div class="flex flex-col gap-[34px] 2xl:gap-10">
        <span
          v-for="(item, i) in list"
          :key="i"
          class="flex items-center justify-between py-[10px] border-y border-gray-100 text-sm xl:text-base text-black"
        >
        {{ item }}
        <span class="w-[6px] h-[6px] bg-black rounded-full"></span>
        </span>
      </div>
    </div>
    <div
      class="flex flex-col gap-5 sm:flex-row sm:justify-between text-gray-600 text-sm 2xl:text-base"
    >
      <a href="" target="_blank">Политика конфиденциальности</a>
      <span>© 2024 ИП Семин А. С.</span>
      <a href="https://serptop.ru">Разработка: Serptop</a>
    </div>
  </div>
</template>

<script setup>
const list = [
  "ИП Семин Андрей Сергеевич",
  "+8 (831) 414 04 02",
  "+7 (903) 601 04 02",
  "Почта компании: oo@slf.expert",
  "Личная почта Андрея: as@slf.expert",
  "WhatsApp: slf.expert",
  "Telegram: slf.expert",
];
</script>
