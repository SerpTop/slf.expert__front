<template>
  <div class="bg-blue-100">
    <a
      name="numbers"
      ref="container"
      class="_container flex flex-col bg-blue-100 overflow-hidden sm:h-[120vh] gap-10 sm:gap-[60px] xl:gap-20 2xl:gap-[120px] py-[60px] xl:py-20 2xl:py-[120px] bg-center bg-no-repeat bg-[length:500px_600px] bg-opacity-20 bg-[url('assets/icons/logo-big.svg')]"
    >
      <h2 class="text-white text-center">Цифры фирмы</h2>
      <div
        ref="grid"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 2xl:gap-8"
      >
        <div>
          <div data-speed="3.2"
            class="inner-div flex flex-col rounded-[20px] gap-4 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl xl:justify-between xl:min-h-[35vh] t xl:translate-y-[500px]"
          >
            <span class="number_1">70%</span>
            <span
              class="fl-text-[0.875rem,1.625rem] leading-[130%] text-gray-300"
              >70% снижений доначислений в ходе налоговых проверок из них 30%
              до минимальных значений</span
            >
          </div>
        </div>
        <div>
          <div
            data-speed="2.5"
            class="inner-div flex flex-col rounded-[20px] gap-4 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl xl:justify-between xl:min-h-[35vh] t xl:translate-y-[1600px]"
          >
            <span class="number_1">500+</span>
            <span
              class="fl-text-[0.875rem,1.625rem] leading-[130%] text-gray-300"
              >Юридическое сопровождение более 500 внешнеэкономических сделок
              без нарушений таможенного и валютного законодательства</span
            >
          </div>
        </div>
        <div class="flex flex-col gap-4 xl:gap-6 2xl:gap-8">
          <div
            data-speed="1.8"
            class="inner-div flex flex-col rounded-[20px] gap-4 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl xl:justify-between xl:min-h-[35vh] t xl:translate-y-[1200px]"
          >
            <span class="number_1">1 млрд</span>
            <span
              class="fl-text-[0.875rem,1.625rem] leading-[130%] text-gray-300"
              >Общий экономический эффект более 1 млрд рублей</span
            >
          </div>
          <div
            data-speed="3.0"
            class="inner-div flex flex-col rounded-[20px] gap-4 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl xl:justify-between xl:min-h-[35vh] t xl:translate-y-[1200px]"
          >
            <span class="number_1">30+</span>
            <span
              class="fl-text-[0.875rem,1.625rem] leading-[130%] text-gray-300"
              >Более 30 успешных дел в спорах с государственными заказчиками
              и исключению из реестра недобросовестных поставщиков</span
            >
          </div>
        </div>
        <div>
          <div
            data-speed="2.2"
            class="inner-div flex flex-col rounded-[20px] gap-4 bg-white-o2 p-5 2xl:p-[30px] backdrop-blur-xl xl:justify-between xl:min-h-[35vh] t xl:translate-y-[800px]"
          >
            <span class="number_1">200 млн</span>
            <span
              class="fl-text-[0.875rem,1.625rem] leading-[130%] text-gray-300"
              >Возврат излишне уплаченных таможенных пошлин в размере 200 млн
              рублей</span
            >
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const container = ref(null);
const grid = ref(null);
const mediaQuery = window.matchMedia("(min-width: 1280px)");

const initializeAnimations = () => {
  if (mediaQuery.matches) {
    const tl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        pin: true,
        trigger: container.value,
        start: "top top",
        // endTrigger: "#pin-windmill-wrap",
        end: "+=2000",
        markers: false,
      },
    });
    const innerDivs = grid.value.querySelectorAll("[data-speed]");

    innerDivs.forEach((div) => {
      const speed = parseFloat(div.getAttribute("data-speed")); // Преобразование в число
      tl.to(div, {
        y: `-${speed * 100}px`, // Корректное смещение
        ease: "none",
        scrollTrigger: {
          trigger: div,
          start: "top bottom", // Начало анимации, когда нижняя часть блока доходит до нижней части экрана
          end: "+=2000", // Конец анимации, когда верхняя часть блока доходит до верхней части экрана
          scrub: true,
          smooth: 2,
          markers: false, // Для отладки, можно убрать в финальной версии
        },
      });
    });
  } else {
    // Отключить анимации для мобильных экранов
    gsap.killTweensOf("[data-speed]");
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
};

onMounted(() => {
  initializeAnimations();
  mediaQuery.addEventListener("change", initializeAnimations);
  console.log(gsap);
});

onUnmounted(() => {
  mediaQuery.removeEventListener("change", initializeAnimations);
});
</script>
