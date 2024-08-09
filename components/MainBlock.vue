<template>
  <div class="bg-blue-100">
    <div
      ref="container"
      class="_container h-screen bg-[url('/images/main-andrey-mob.png')] sm:bg-[url('/images/main-andrey-tab.png')] xl:bg-[url('/images/main-andrey-desk.png')] pt-6 sm:pt-[38px] 2xl:pt-[100px] pb-6 sm:pb-5 xl:pb-6 2xl:pb-10 bg-no-repeat"
    >
      <div ref="content" class="max-w-[1100px]">
        <h1
          class="fl-text-[1.625rem,5.125rem] leading-[120%] font-bold text-white uppercase"
        >
          Более 15 лет успешной <br> практики
          <span class="text-blue-300">
            в области таможни, налогов <br> и арбитража
          </span>
        </h1>
      </div>

      <button
        @click="isFormOpen = true"
        ref="button"
        class="btn btn-white mt-3 sm:mt-4 2xl:mt-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="12"
          viewBox="0 0 18 12"
          fill="none"
        >
          <path
            d="M-0.00012207 4.875L2.24988 4.875L12.7499 4.875V1.125L17.9999 6L12.7499 10.875V7.125L-0.00012207 7.125V4.875Z"
            fill="#1F1F1F"
          />
          <rect width="2.25" height="5.25" fill="#1F1F1F" />
        </svg>
        записаться на консультацию
      </button>
      <div
        ref="grid"
        class="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-[1015px] mt-[387px] sm:mt-[118px] xl:mt-[37px] 2xl:mt-[55px]"
      >
        <div
          v-for="(item, i) in numbers"
          :key="i"
          class="flex flex-col rounded-[20px] justify-between gap-4 2xl:gap-5  bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl"
        >
          <span class="number_2">{{ item.title }}</span>
          <span class="text-base text-gray-300">{{ item.subtitle }}</span>
        </div>
      </div>
      <div
        v-if="isFormOpen"
        class="fixed top-0 right-0 z-20 w-full overflow-scroll xl:max-w-[696px] 2xl:max-w-[984px]"
      >
        <div class="bg-blue-100 p-4">
          <div
            @click="isFormOpen = false"
            class="border border-white rounded-full ml-auto w-11 h-11 flex items-center justify-center"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 10L15 15M10 10L5 5M10 10L5 15M10 10L15 5"
                stroke="white"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
        <FormComponent modal />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
const isFormOpen = ref(false);

const container = ref(null);
const content = ref(null);
const button = ref(null);
const grid = ref(null);

const numbers = [
  {
    title: "70%",
    subtitle:
      "70% снижений доначислений в ходе налоговых проверок из них 30% до минимальных значений",
  },
  {
    title: "200 млн",
    subtitle:
      "Возврат излишне уплаченных таможенных пошлин в размере 200 млн рублей",
  },
  {
    title: "1 млрд",
    subtitle: "Общий экономический эффект более 1 млрд рублей",
  },
];

onMounted(() => {
  // Анимация контейнера
  gsap.fromTo(
    container.value,
    { x: "100%", opacity: 0 },
    {
      x: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
    }
  );

  // Анимация контента
  gsap.fromTo(
    content.value,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5, // Задержка для последовательности анимаций
    }
  );

  // Анимация кнопки и грида
  gsap.fromTo(
    [button.value, grid.value],
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      delay: 1, // Задержка для последовательности анимаций
      stagger: 0.2, // Задержка между анимациями элементов
    }
  );
});
</script>
