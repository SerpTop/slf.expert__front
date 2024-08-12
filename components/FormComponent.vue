<template>
  <div class="bg-blue-100">
    <div
      class="_container flex flex-col gap-4 sm:gap-5 xl:gap-[30px] 2xl:gap-10 py-[60px] xl:py-20 2xl:py-[120px]"
    >
      <!-- Заголовок формы -->
      <h2 ref="formTitle" v-show="!isFormSent" class="text-white">
        Записаться на консультацию
      </h2>

      <!-- Форма -->
      <form
        ref="formElement"
        v-show="!isFormSent"
        action=""
        class="grid grid-cols-1 xl:grid-cols-2 gap-[30px]"
      >
        <input
          v-for="(item, i) in form"
          :key="i"
          :type="item.type"
          :placeholder="item.placeholder"
          :required="item.require"
          v-model="formData[i]"
          :rows="item.rows"
          class="bg-transparent border-b h-[54px] text-sm 2xl:text-base border-blue-400 text-white"
          :ref="`formInput_${i}`"
          :class="{ maskphone: item.type === 'tel' }"
          @input="handleInput($event, i)"
        />
        <select
          class="bg-transparent border-b h-[54px] text-sm 2xl:text-base border-blue-400 text-white -translate-x-1"
          name="practices"
          id="city-select"
        >
          <option value="">Выберите практику</option>
          <option
            v-for="(option, index) in selectOptions"
            :key="index"
            :value="option.value"
            class="bg-[#00113A] p-5"
          >
            {{ option.label }}
          </option>
        </select>
        <!-- <select
          name="practices"
          v-model="formData[i]"
          class="bg-transparent border-b text-sm 2xl:text-base border-blue-400 text-white"
          placeholder="Выберите практику"
        >
        <option value="">Выберите практику</option>
          <option
            v-for="(option, index) in selectOptions"
            :key="index"
            :value="option.value"
            class="bg-[#00113A] p-5"
          >
            {{ option.label }}
          </option>
        </select> -->

        <textarea
          class="bg-transparent border-b text-sm 2xl:text-base border-blue-400 text-white xl:col-span-2"
          rows="4"
        >
Комментарий
      </textarea
        >

        <label
          for=""
          class="xl:col-span-2 flex items-center justify-center gap-2 relative cursor-pointer"
        >
          <input type="file" class="opacity-0 absolute h-full cursor-pointer" />
          <div
            class="h-11 w-11 bg-blue-500 2xl:w-[54px] 2xl:h-[54px] rounded-full"
          >
            <svg
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="54" height="54" rx="27" fill="#182F58" />
              <path
                d="M25.1297 24.0003V30.7432C25.1375 31.2363 25.3388 31.7066 25.6903 32.0525C26.0417 32.3984 26.5151 32.5923 27.0082 32.5923C27.5013 32.5923 27.9747 32.3984 28.3261 32.0525C28.6776 31.7066 28.8789 31.2363 28.8867 30.7432L28.8928 21.905C28.8979 21.4835 28.8193 21.0653 28.6616 20.6744C28.5039 20.2836 28.2701 19.9279 27.9739 19.6281C27.6777 19.3283 27.3249 19.0902 26.936 18.9278C26.5471 18.7653 26.1298 18.6816 25.7084 18.6816C25.2869 18.6816 24.8696 18.7653 24.4807 18.9278C24.0918 19.0902 23.739 19.3283 23.4428 19.6281C23.1466 19.9279 22.9129 20.2836 22.7551 20.6744C22.5974 21.0653 22.5188 21.4835 22.5239 21.905V30.8028C22.5153 31.3961 22.6248 31.9852 22.8459 32.5359C23.067 33.0865 23.3954 33.5877 23.8119 34.0103C24.2284 34.4329 24.7248 34.7685 25.2722 34.9976C25.8196 35.2266 26.4071 35.3446 27.0005 35.3446C27.5939 35.3446 28.1813 35.2266 28.7287 34.9976C29.2761 34.7685 29.7725 34.4329 30.189 34.0103C30.6056 33.5877 30.9339 33.0865 31.1551 32.5359C31.3762 31.9852 31.4856 31.3961 31.477 30.8028V22.4881"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-sm text-blue-300 2xl:text-base"
              >Подгрузить документ</span
            >
            <span class="text-blue-400 text-sm 2xl:text-base"
              >Не более [20 MB]</span
            >
          </div>
        </label>

        <label
          class="flex items-center gap-2 text-sm 2xl:text-base xl:col-span-2 justify-center"
        >
          <input type="checkbox" class="accent-blue-100" />
          <span class="text-white"> Я согласен на обработку</span>
          <a href="" class="text-blue-300"> Персональных данных.</a>
        </label>
        <div class="w-full flex justify-center xl:col-span-2">
          <button
            class="btn btn-white xl:max-w-[436px] w-full"
            :disabled="isFormInvalid"
            @click.prevent="isFormSent = true"
          >
            отправить
          </button>
        </div>
      </form>

      <!-- Сообщение после отправки формы -->
      <div
        v-show="isFormSent"
        class="flex flex-col items-center justify-center gap-5 sm:gap-[30px] 2xl:gap-10 w-full max-w-[360px,904px] mx-auto"
      >
        <h2 class="text-white text-center" :class="{ 'text-start': modal }">
          Спасибо, данные успешно <br />
          отправлены!
        </h2>
        <span class="text-base 2xl:text-xl text-white text-center" :class="{ 'text-start': modal }">
          Ваша заявка успешно отправлена, и мы уже приступаем к ее рассмотрению.
          В ближайшее время мы свяжемся с вами, чтобы обсудить ваш вопрос. Мы
          отвечаем на заявки не позднее двух дней — по возможности раньше.
        </span>
        <span class="text-base 2xl:text-xl text-white text-center" :class="{ 'text-start': modal }">
          Если у вас срочный вопрос вы можете связаться с нами прямо сейчас по
          контактам ниже:
        </span>
        <div
          class="grid grid-cols-2 sm:grid-cols-4 w-full gap-[9px] sm:gap-4 xl:gap-6 2xl:gap-8"
        >
          <a
            :href="item.link"
            v-for="(item, i) in links"
            :key="i"
            class="text-white text-sm 2xl:text-base w-full h-11 sm:h-[54px] 2xl:h-[64px] border-white border rounded-full flex items-center justify-center gap-2.5"
          >
            <img :src="item.icon" />
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import telegramIcon from "assets/icons/tg-icon.svg";
import WhatsAppIcon from "assets/icons/wa-icon.svg";

defineProps({
  modal: Boolean,
});

gsap.registerPlugin(ScrollTrigger);

const isFormSent = ref(false);
const form = [
  { type: "text", placeholder: "Имя*", require: true },
  { type: "tel", placeholder: "Телефон*", require: true },
  { type: "email", placeholder: "E-mail", require: false },
];
const links = [
  { title: "+8 (831) 414 04 02", link: "" },
  { title: "+7 (903) 601 04 02", link: "" },
  { title: "slf.expert", link: "", icon: WhatsAppIcon },
  { title: "slf.expert", link: "", icon: telegramIcon },
];
const selectOptions = [
  { value: "practice1", label: "Таможня " },
  { value: "practice2", label: "Налоги" },
  { value: "practice3", label: "Арбитражные споры" },
  { value: "practice4", label: "На Споры по исполнению госконтрактовлоги" },
  {
    value: "practice4",
    label: "Аудит юридических бизнес-процессов в компании",
  },
];
const formData = ref(Array(form.length).fill(""));
const isFormInvalid = computed(() => {
  return form.some((item, i) => item.require && !formData.value[i]);
});

const formTitle = ref(null);
const formElement = ref(null);

function maskPhone(value) {
  var blank = "+_ (___) ___-__-__";
  var i = 0;
  var val = value.replace(/\D/g, "").replace(/^8/, "7");
  return blank.replace(/./g, function (char) {
    if (/[_\d]/.test(char) && i < val.length) return val.charAt(i++);
    return i >= val.length ? "" : char;
  });
}

function handleInput(event, index) {
  if (form[index].type === "tel") {
    formData.value[index] = maskPhone(event.target.value);
  }
}

onMounted(async () => {
  await nextTick(); // Дожидаемся обновления DOM

  // Анимация заголовка формы
  gsap.fromTo(
    formTitle.value,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: formTitle.value,
        start: "top 80%",
        end: "top 60%",
        scrub: true,
        markers: false,
      },
    }
  );

  // Анимация элементов формы
  gsap.fromTo(
    formElement.value,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 3,
      ease: "power3.out",
      stagger: 0.3, // Задержка между анимацией элементов
      scrollTrigger: {
        trigger: formElement.value,
        start: "top 70%",
        end: "top 50%",
        scrub: true,
        markers: false,
      },
    }
  );
});
</script>
