<template>
    <div ref="container" class="_container bg-[url('/images/andrey-mob.png')] sm:bg-[url('/images/andrey-tab.png')] xl:bg-[url('/images/andrey-desk.png')]
                 pt-[60px] pb-[380px] sm:bp-[564px] xl:py-[71px] 2xl:py-[140px] bg-no-repeat xl:grid xl:grid-cols-2">
        <div></div>
        <div>
            <h2 ref="title" class="text-white mb-3 sm:mb-4 2xl:mb-5">Семин Андрей Сергеевич</h2>
            <span ref="subtitle" class="text-blue-300 text-sm 2xl:text-base">Управляющий партнер</span>
            <ul ref="infoList" class="list-disc list-inside flex flex-col gap-4 2xl:gap-5 py-4 sm:py-6 xl:py-[30px] 2xl:py-10">
                <li v-for="(item, i) in info" :key="i" class="text-white text-sm 2xl:text-base">{{ item }}</li>
            </ul>
            <button ref="ctaButton" class="btn btn-white">записаться на консультацию</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const info = ['Помощник-эксперт Нижегородского бизнес-омбудсмена по вопросам таможни',
    'Аттестованный специалист по банкротству', 'Аттестованный специалист по таможенным операциям',
    'Аттестованный налоговый консультант', 'Активный участник деятельности Уполномоченного по защите прав предпринимателей в Нижегородской области',
    'Финалист конкурсов «Юрист – профессионал», «Лидеры России»', 'Master of Business Administration (ИБДА РАНХиГС «Операционный менеджмент»)']

const container = ref(null);
const title = ref(null);
const subtitle = ref(null);
const infoList = ref(null);
const ctaButton = ref(null);

onMounted(() => {
    // Анимация блока _container
    gsap.fromTo(container.value, 
        { x: '100%', opacity: 0 }, 
        {
            x: '0%',
            opacity: 1,
            duration: 3,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: container.value,
                start: 'top 80%',
                end: 'top 60%',
                scrub: true,
                markers: false,
                onEnter: () => {
                    animateElements();
                }
            }
        }
    );
});

function animateElements() {
    // Анимация заголовка
    gsap.fromTo(title.value, 
        { y: 50, opacity: 0 }, 
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title.value,
                start: 'top 75%',
                end: 'top 55%',
                scrub: true,
                markers: false,
            }
        }
    );

    // Анимация подзаголовка
    gsap.fromTo(subtitle.value, 
        { y: 50, opacity: 0 }, 
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: subtitle.value,
                start: 'top 70%',
                end: 'top 50%',
                scrub: true,
                markers: false,
            }
        }
    );

    // Анимация списка
    gsap.fromTo(infoList.value, 
        { y: 50, opacity: 0 }, 
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: infoList.value,
                start: 'top 65%',
                end: 'top 45%',
                scrub: true,
                markers: false,
                stagger: 0.1
            }
        }
    );

    // Анимация кнопки
    gsap.fromTo(ctaButton.value, 
        { y: 50, opacity: 0 }, 
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: ctaButton.value,
                start: 'top 65%',
                end: 'top 45%',
                scrub: true,
                markers: false,
            }
        }
    );
}
</script>