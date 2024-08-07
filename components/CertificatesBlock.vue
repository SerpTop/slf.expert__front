<template>
  <a name="certificates" class="bg-gray-400">
    <div
      class="_container flex flex-col gap-5 sm:gap-5 xl:gap-[30px] 2xl:gap-10 py-[60px] sm:py-20 xl:py-[120px] 2xl:py-[200px]"
    >
      <h2
        ref="header"
        class="border-b pb-6 -mb-6 border-gray-100 xl:border-0 xl:m-0 xl:p-0"
      >
        Cертификаты и дипломы
      </h2>

      <div
        v-for="(item, i) in certificates"
        :key="i"
        ref="certificateBlocks"
        class="grid xl:grid-cols-[418fr_1372fr] items-start xl:border-t border-gray-100"
      >
        <span
          class="text-sm 2xl:text-base text-black font-semibold flex items-center pt-4 xl:pt-5"
        >
          <span class="w-2 h-2 bg-black font-bold rounded-full mr-2"></span>
          {{ item.title }}:
        </span>
        <ul>
          <li
            v-for="(doc, j) in item.docs"
            :key="j"
            class="flex justify-between gap-4 items-center w-full text-black text-sm 2xl:text-base border-b border-gray-100 py-3 sm:py-4 2xl:gap-5"
          >
            <a :href="doc.url">{{ doc.title }}</a>
            <div class="ml-auto flex items-center xl:gap-40 2xl:gap-64">
              <span>{{ doc.expansion }}</span>
              <span class="hidden xl:block">[{{ doc.size }}]</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </a>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  {
    title: "Сертификаты",
    docs: [
      {
        title:
          "Таможенное право: защита интересов бизнеса. Практика Омбудсмена",
        expansion: ".PDF",
        size: "1.6 MB",
        url: "files/tamozhennoe-pravo.pdf",
      },
      {
        title: "Налоговое консультирование: аттестованный специалист",
        expansion: ".PDF",
        size: "0.8 MB",
        url: "files/nalogovoe-konsultirovanie.pdf",
      },
      {
        title: "Арбитражное управление: передовые практики и стратегии",
        expansion: ".PDF",
        size: "1.4 MB",
        url: "files/arbitrazhnoe-upravlenie.pdf",
      },
    ],
  },
  {
    title: "Дипломы",
    docs: [
      {
        title:
          "За весомый вклад в защиту прав предпринимателей Нижегородской области",
        expansion: ".PDF",
        size: "0.6 MB",
        url: "files/zaschita-prav.pdf",
      },
      {
        title:
          "Финалист конкурса «Юрист – профессионал». За высокий уровень профессионализма в юри",
        expansion: ".PDF",
        size: "1.8 MB",
        url: "files/yurist-professional.pdf",
      },
      {
        title:
          "Финалист конкурса «Лидеры России». За лидерские качества и активную гражданскую позиц",
        expansion: ".PDF",
        size: "2.7 MB",
        url: "files/lidery-rossii.pdf",
      },
      {
        title:
          "Master of Business Administration (MBA) с отличием. Специализация: «Операционный менед",
        expansion: ".PDF",
        size: "1.2 MB",
        url: "files/mba.pdf",
      },
      {
        title:
          "За успешное применение знаний MBA в сфере юриспруденции и достижения в области арби",
        expansion: ".PDF",
        size: "0.5 MB",
        url: "files/mba-yurisprudenciya.pdf",
      },
    ],
  },
];

const header = ref(null);
const certificateBlocks = ref([]);

onMounted(() => {
  // Анимация заголовка
  gsap.fromTo(
    header.value,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: header.value,
        start: "top 75%",
        end: "top 55%",
        scrub: true,
        markers: false,
      },
    }
  );

  // Анимация блоков сертификатов
  gsap.utils.toArray(certificateBlocks.value).forEach((block, index) => {
    gsap.fromTo(
      block,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: block,
          start: "top 80%",
          end: "top 60%",
          scrub: true,
          markers: false,
          delay: index * 0.3,
        },
      }
    );
  });
});
</script>
