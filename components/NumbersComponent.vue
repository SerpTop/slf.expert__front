<template>
  <div
    ref="container"
    class="_container flex flex-col overflow-hidden h-[120vh] gap-10 sm:gap-[60px] xl:gap-20 2xl:gap-[120px] bg-blue-100 py-[60px] xl:py-20 2xl:py-[120px] bg-center bg-no-repeat bg-[length:500px_600px] bg-[url('assets/icons/logo-big.svg')]"
  >
    <h2 class="text-white text-center">Цифры фирмы</h2>
    <div
      ref="grid"
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 2xl:gap-8"
    >
      <div data-speed="0.2">
        <div
          class="inner-div flex flex-col rounded-[20px] gap-4 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl xl:justify-between xl:h-[311px] 2xl:h-[436px]"
        >
          <span class="number_1">70%</span>
          <span class="fl-text-[0.875rem,1.625rem] leading-[130%] text-gray-300"
            >70% снижений доначислений в ходе налоговых проверок из них 30%
            до минимальных значений</span
          >
        </div>
      </div>
      <div>
        <div
          data-speed="1.5"
          class="inner-div flex flex-col rounded-[20px] gap-4 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl xl:justify-between xl:h-[311px] 2xl:h-[436px]"
        >
          <span class="number_1">500+</span>
          <span class="fl-text-[0.875rem,1.625rem] leading-[130%] text-gray-300"
            >Юридическое сопровождение более 500 внешнеэкономических сделок без
            нарушений таможенного и валютного законодательства</span
          >
        </div>
      </div>
      <div class="flex flex-col gap-4 xl:gap-6 2xl:gap-8">
        <div
          data-speed="0.8"
          class="inner-div flex flex-col rounded-[20px] gap-4 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl xl:justify-between xl:h-[311px] 2xl:h-[436px]"
        >
          <span class="number_1">1 млрд</span>
          <span class="fl-text-[0.875rem,1.625rem] leading-[130%] text-gray-300"
            >Общий экономический эффект более 1 млрд рублей</span
          >
        </div>
        <div
          data-speed="2.0"
          class="inner-div flex flex-col rounded-[20px] gap-4 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl xl:justify-between xl:h-[311px] 2xl:h-[436px]"
        >
          <span class="number_1">30+</span>
          <span class="fl-text-[0.875rem,1.625rem] leading-[130%] text-gray-300"
            >Более 30 успешных дел в спорах с государственными заказчиками
            и исключению из реестра недобросовестных поставщиков</span
          >
        </div>
      </div>
      <div>
        <div
          data-speed="1.2"
          class="inner-div flex flex-col rounded-[20px] gap-4 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl xl:justify-between xl:h-[311px] 2xl:h-[436px]"
        >
          <span class="number_1">200 млн</span>
          <span class="fl-text-[0.875rem,1.625rem] leading-[130%] text-gray-300"
            >Возврат излишне уплаченных таможенных пошлин в размере 200 млн
            рублей</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const container = ref(null);
const grid = ref(null);

onMounted(() => {
  const innerDivs = grid.value.querySelectorAll("[data-speed]");

  innerDivs.forEach((div) => {
    const speed = div.getAttribute("data-speed");
    gsap.to(div, {
      y: () => `${speed * 200}px`,
      ease: "none",
      scrollTrigger: {
        trigger: div,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
});
</script>

