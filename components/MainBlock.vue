<template>
  <div class="_container bg-[url('/images/main-andrey-mob.png')] sm:bg-[url('/images/main-andrey-tab.png')] xl:bg-[url('/images/main-andrey-desk.png')] pt-6 sm:pt-[38px] 2xl:pt-[100px] pb-6 sm:pb-5 xl:pb-6 2xl:pb-10">
    <div class="max-w-[1080px]">
      <h1
        class="fl-text-[1.625rem,5.125rem] leading-[120%] font-bold text-white uppercase"
        >Более 15 лет успешной практики
        <span class="text-blue-300">
          в области таможни, налогов и арбитража
        </span></h1
      >
    </div>

    <button class="btn btn-white mt-3 sm:mt-4 2xl:mt-5">
      <IconComponent name="arrow-right" />
      записаться на консультацию
    </button>
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-[1080px]  mt-[387px] sm:mt-[118px] xl:mt-[37px] 2xl:mt-[55px]">
      <div
        v-for="(item, i) in numbers"
        :key="i"
        class="flex flex-col rounded-[20px] bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl"
      >
        <span class="number_2">{{ item.title }}</span>
        <span class="text-base text-gray-300">{{ item.subtitle }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const numbers = [
  {
    title: "70%",
    subtitle:
      "70% снижений доначислений в ходе налоговых проверок из них 30% до минимальных значений",
  },
  {
    title: "200 млн",
    subtitle:
      "Возврат излишне уплаченных таможенных пошлин в размере 200 млн рублей",
  },
  {
    title: "1 млрд",
    subtitle: "Общий экономический эффект более 1 млрд рублей",
  },
];
</script>
