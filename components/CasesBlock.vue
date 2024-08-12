<template>
  <div class="bg-gray-400">
    <a
      name="cases"
      class="_container bg-gray-400 flex flex-col gap-4 sm:gap-5 xl:gap-[30px] 2xl:gap-10 py-[60px] sm:py-20 xl:py-[120px] 2xl:py-[200px]"
    >
      <h2 ref="title">Кейсы из судебной практики</h2>
      <div
        ref="casesContainer"
        class="relative grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6 2xl:gap-8"
      >
        <span
          class="sm:absolute top-5 left-80 xl:left-[280px] text-gray-300 text-sm 2xl:text-base"
          >В настоящее время в производстве —  более 80 дел.</span
        >

        <div
          v-for="(item, i) in visibleCases"
          :key="i"
          class="bg-white p-4 sm:p-5 2xl:p-[30px] rounded-xl gap-4 sm:gap-5 click-path flex flex-col items-start min-h-[427px] sm:min-h-[420px] 2xl:min-h-[540px]"
        >
          <span
            class="text-black text-sm 2xl:text-base py-2 px-4 rounded-[10px] border-gray-200 border 2xl:py-[10px] 2xl:px-5"
            >{{ item.date }}</span
          >
          <span class="text-black text-sm 2xl:text-base -mb-2">{{
            item.name
          }}</span>
          <h4 class="text-black">{{ item.title }}</h4>
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-[30px] 2xl:gap-10">
            <span class="text-gray-200 text-sm 2xl:text-base">(Ситуация)</span>
            <span class="text-black text-sm 2xl:text-base text-clamp">{{
              item.situation
            }}</span>
          </div>
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-[30px] 2xl:gap-10">
            <span class="text-gray-200 text-sm 2xl:text-base">(Результат)</span>
            <span class="text-black text-sm 2xl:text-base text-clamp">{{
              item.result
            }}</span>
          </div>
          <button class="btn btn-blue mt-auto">
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

            посмотреть решение
          </button>
        </div>
      </div>
      <button class="btn btn-main mx-auto xl:w-1/4" @click="toggleShowAll">
        {{ showAll ? "свернуть" : "смотреть еще" }}
      </button>
    </a>
  </div>
</template>

<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const cases = [
  {
    name: "Дело № А43-41882/2019",
    title: "Признание недействительным решения таможни",
    date: "04.10.2019",
    situation:
      "Оспаривание предварительного решения о классификации серийно поставляемого товара (почвенная фреза). Таможня приняла решение о классификации его под код с пошлиной 5%.",
    result:
      "По результату решение признано незаконным, верным установлен код с пошлиной 0%.",
  },
  {
    name: "Дело № А40-134118/16",
    title: "Снижение размера неустойки",
    date: "16.06.2016",
    situation:
      "Дело по иску Следственного комитета РФ к исполнителю государственного контракта о взыскании 2 043 888 рублей неустойки.",
    result:
      "Удалось снизить размер неустойки с 2 043 888 рублей до 844 016 рублей 25 копеек путем признания незаконной методики расчета.",
  },
  {
    name: "Дело № А40-173857/2012",
    title: "Возврат излишне уплаченных таможенных платежей",
    date: "09.01.2013",
    situation:
      "ООО «Кроношпан» обратилось в суд с требованием к Московской областной таможне о признании незаконными решения Московской областной таможни от 03.10.2012 г. № 17-25/37652 и № 17-25/37653 об отказе в возврате излишне уплаченных таможенных платежей.",
    result:
      'Суд решил признать незаконными решения Московской областной таможни об отказе в возврате излишне уплаченных таможенных платежей и обязать Московскую областную таможню в течение 30 дней со дня вступления решения суда в законную силу возвратить ООО "Кроношпан" излишне уплаченные таможенные платежи в размере 51 905 167, 64 руб. и 53 225 475,39 руб.',
  },
  {
    name: "Дело № А43-4377/2015",
    title: "Спор о возложении расходов на хранение",
    date: "27.02.2015",
    situation:
      "Спор о возложении расходов на хранение арестованного по прекращенному делу об административном правонарушении груза.",
    result:
      "Требование оплаты хранения арестованного товара на складе временного хранения было признано незаконным. Расходы по хранению возложены на таможенный орган.",
  },
  {
    name: "Дело № А43-37587/2022",
    title: "Оспаривание результатов доначисления",
    date: "01.12.2022",
    situation:
      "Оспаривание результатов камеральной проверки таможенными органами с доначислением более чем на 400 млн.",
    result: "Доначисление признано незаконным в части 160 млн.",
  },
  {
    name: "Дело № А58-8221/2021",
    title: "Оспаривание неустойки и штрафа",
    date: "18.11.2021",
    situation:
      "Оспаривание неустойки и штрафа, удержанных заказчиком по 223-ФЗ с исполнителя срок в размере 1 714 278 руб. 24 коп.",
    result:
      "Штрафные санкции признаны несоразмерными нарушению и снижены до 736219,14 рублей.",
  },
  {
    name: "01.12.2022Дела №№ А43-40921/2021, А43-322/2022, А43-324/2022, А43-6065/2022, А43-6066/2022, А43-6067/2022, А43-6068/2022, А43-6069/2022, А43-6070/2022,  А43-2056/2022, А43-2055/2022, А43-2054/2022, А43-2053/2022",
    title: "Оспаривание привлечения к административной ответственности",
    date: "01.12.2022",
    situation:
      "Оспаривание привлечения к административной ответственности в рамках одной проверки по 13 эпизодам.",
    result:
      "В результате сумма уплаченных штрафов снижена с 650000 рублей до 100000 рублей.",
  },
];

const showAll = ref(false);

const visibleCases = computed(() => {
  return showAll.value ? cases : cases.slice(0, 4);
});

function toggleShowAll() {
  showAll.value = !showAll.value;
}

const title = ref(null);
const casesContainer = ref(null);
const mediaQuery = window.matchMedia("(min-width: 768px)");

onMounted(() => {
  if (mediaQuery.matches) {
    gsap.fromTo(
      title.value,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title.value,
          start: "top 80%",
          end: "top 60%",
          scrub: true,
          markers: false,
        },
      }
    );
    gsap.utils.toArray(casesContainer.value.children).forEach((caseItem, i) => {
      gsap.fromTo(
        caseItem,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: caseItem,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
            markers: false,
            start: `top ${100 - i * 10}%`,
            end: `top ${90 - i * 10}%`,
          },
        }
      );
    });
  } else return;
});
</script>
