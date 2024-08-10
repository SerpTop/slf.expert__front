<template>
  <div class="bg-gray-400">
    <a name="practices"
      class="_container flex flex-col gap-5 sm:gap-6 xl:gap-[30px] 2xl:gap-10 py-[60px] sm:py-20 xl:py-[120px] 2xl:py-[200px]"
    >
      <h2 ref="header">Ключевые практики</h2>
      <div class="1 w-full h-px bg-gray-100"></div>
      <div
        v-for="(item, i) in blocksMain"
        :key="i"
        ref="blocks"
        class="grid grid-cols-1 xl:grid-cols-2 gap-5 xl:gap-0 border-b border-gray-100 pb-10"
      >
        <div class="flex h-fit gap-2.5 sm:gap-4 xl:gap-[190px] 2xl:gap-[250px]">
          <span
            class="bg-white rounded-full flex items-center justify-center w-12 h-12 sm:w-[50px] sm:h-[50px] 2xl:h-[60px] 2xl:w-[60px]"
          >
            <img :src="item.icon" />
          </span>
          <h3 class="xl:max-w-[470px] 2xl:max-w-[570px]">{{ item.title }}</h3>
        </div>
        <div class="flex items-start flex-col gap-5 xl:gap-[30px] 2xl:gap-10 sm:border-l sm:border-gray-100 sm:pl-10">
          <ul class="flex flex-col gap-4 list-disc list-inside">
            <li
              v-for="(listItem, i) in item.list"
              :key="i"
              class="text-xs 2xl:text-base text-black"
            >
              {{ listItem }}
            </li>
          </ul>
          <NuxtImg name="arrow-right" />
          <button @click="isFormOpen = true" class="btn btn-main">
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-0.000137329 4.875L2.24986 4.875L12.7499 4.875V1.125L17.9999 6L12.7499 10.875V7.125L-0.000137329 7.125V4.875Z"
                fill="white"
              />
              <rect width="2.25" height="5.25" fill="white" />
            </svg>

            решить проблему
          </button>
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
    </a>
  </div>
</template>

<script setup>
const isFormOpen = ref(false);

import customsIcon from "assets/icons/customs.svg";
import taxesIcon from "assets/icons/taxes.svg";
import arbDisputesIcon from "/assets/icons/arb-disputes.svg";
import govContractsIcon from "assets/icons/gov-contracts.svg";
import businessProcessesIcon from "assets/icons/business-processes.svg";

const blocksMain = [
  {
    title: "Таможня",
    icon: customsIcon,
    list: [
      "Сопровождение внешнеэкономических сделок",
      "Разработка проектов в сфере ВЭД",
      "Представление интересов доверителей в спорах с таможенными органами",
      "Обжалование корректировки таможенной стоимости",
      "Представление интересов доверителей в делах об административных правонарушениях на таможне",
      "Обжалование классификации товаров по ТН ВЭД",
      "Возврат таможенных платежей",
      "Возврат сумм обеспечения",
      "Взыскание убытков с таможенных органов",
    ],
    buttonClick: "",
  },
  {
    title: "Налоги",
    icon: taxesIcon,
    list: [
      "Представление интересов доверителей в налоговых органах",
      "Выявление потенциальных налоговых рисков",
      "Разработка и внедрение налоговых стратегий",
      "Представление интересов доверителей в спорах с налоговыми органами",
    ],
    buttonClick: "",
  },
  {
    title: "Арбитражные споры",
    icon: arbDisputesIcon,
    list: [
      "Взыскание убытков, неосновательного обогащения",
      "Банкротство, субсидиарная ответственность",
      "Защита права собственности",
      "Коммерческие споры",
      "Корпоративные споры",
      "Строительные споры",
      "Споры об интеллектуальной собственности",
    ],
    buttonClick: "",
  },
  {
    title: "Споры по исполнению госконтрактов",
    icon: govContractsIcon,
    list: [
      "Обжалование решений ФАС в суде",
      "Споры по реестру недобросовестных поставщиков",
      "Споры по качеству товаров или работ/услуг",
      "Решение споров по срокам поставки и оплате товара или выполнения работ",
      "Взыскание/снижение пеней, штрафов, убытков",
    ],
    buttonClick: "",
  },
  {
    title: "Аудит юридических бизнес-процессов в компании",
    icon: businessProcessesIcon,
    list: [
      "Выявление рисков",
      "Анализ эффективности работы юридической службы",
      "Построение риск-ориентированной модели",
      "Разработка механизмов обеспечения безопасности",
      "Разработка дорожной карты по приведению юридической службы к требуемой структуре",
    ],
    buttonClick: "",
  },
];
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const header = ref(null);
const blocks = ref([]);
const blocksArray = ref([]);

onMounted(() => {
  // Анимация заголовка
  gsap.fromTo(
    header.value,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: header.value,
        start: "top 90%",
        end: "top 90%",
        scrub: true,
        markers: false,
      },
    }
  );

  // Анимация блоков
  blocks.value.forEach((block, index) => {
    gsap.fromTo(
      block,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: block,
          start: "top 95%",
          end: "top 90%",
          scrub: true,
          markers: false,
        },
        // stagger: 0.3,
      }
    );
  });
});
</script>
