<template>
  <footer class="bg-gray-400">
    <a
      name="contacts"
      class="_container flex flex-col gap-5 sm:gap-10 xl:gap-[60px] 2xl:gap-20 pt-[60px] sm:pt-20 xl:pt-[120px] 2xl:pt-[200px] pb-5"
    >
      <h2 ref="header">Контакты</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
        <div>
          <img ref="logo" src="assets/icons/logo-big.svg" alt="Logo" />
        </div>
        <div class="flex flex-col gap-[34px] 2xl:gap-10">
          <span
            v-for="(item, i) in list"
            :key="i"
            ref="listItems"
            class="flex items-center justify-between py-[10px] border-y border-gray-100 text-sm xl:text-base text-black"
          >
            {{ item }}
            <span class="w-[6px] h-[6px] bg-black rounded-full"></span>
          </span>
          <a
            :href="item.link"
            target="_blank"
            v-for="(item, i) in links"
            :key="i"
            ref="listItems"
            class="flex items-center justify-between py-[10px] border-y border-gray-100 text-sm xl:text-base text-black"
          >
            {{ item.title }}
            <span class="w-[6px] h-[6px] bg-black rounded-full"></span>
          </a>
        </div>
      </div>
      <div
        class="flex flex-col gap-5 sm:flex-row sm:justify-between text-gray-600 text-sm 2xl:text-base"
      >
        <a href="" target="_blank" ref="footerLinks"
          >Политика конфиденциальности</a
        >
        <span ref="footerLinks">© 2024 ИП Семин А. С.</span>
        <a href="https://serptop.ru" ref="footerLinks">Разработка: Serptop</a>
      </div>
    </a>
  </footer>
</template>

<script setup>
const list = [
  "ИП Семин Андрей Сергеевич",
  "+7 (831) 414 04 02",
  "+7 (903) 601 04 02",
  "Почта компании: oo@slf.expert",
  "Личная почта Андрея: as@slf.expert",
];
const links = [
  { title: "WhatsApp: +7 (903) 601 04 02", link: "https://wa.me/79036010402" },
  {
    title: "Telegram: +7 (903) 601 04 02",
    link: "https://t.me/+79036010402",
  },
];
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const header = ref(null);
const listItems = ref([]);
const footerLinks = ref([]);
const logo = ref(null);
const mediaQuery = window.matchMedia("(min-width: 1280px)");

onMounted(() => {
  if (mediaQuery.matches) {
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
          start: "top 80%",
          end: "top 60%",
          scrub: true,
          markers: false,
        },
      }
    );

    // Анимация логотипа
    gsap.fromTo(
      logo.value,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: logo.value,
          start: "top 80%",
          end: "top 60%",
          scrub: true,
          markers: false,
        },
      }
    );

    // Анимация элементов списка
    gsap.fromTo(
      listItems.value,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 4,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: listItems.value[0],
          start: "top 80%",
          end: "top 60%",
          scrub: true,
          markers: false,
        },
      }
    );

    // Анимация ссылок в нижней части
    gsap.fromTo(
      footerLinks.value,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 4,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: footerLinks.value[0],
          start: "top 75%",
          end: "top 55%",
          scrub: true,
          markers: false,
        },
      }
    );
  } else return;
});
</script>
