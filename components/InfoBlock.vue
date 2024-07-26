<template>
    <div class="_container bg-[url('/images/andrey-mob.png')] sm:bg-[url('/images/andrey-tab.png')] xl:bg-[url('/images/andrey-desk.png')]
                 pt-[60px] pb-[380px] sm:bp-[564px] xl:py-[71px] 2xl:py-[140px] bg-no-repeat xl:grid xl:grid-cols-2">
        <div></div>
        <div>
            <h2 class="text-white mb-3 sm:mb-4 2xl:mb-5">Семин Андрей Сергеевич</h2>
            <span class="text-blue-300 text-sm 2xl:text-base ">Управляющий партнер</span>
            <ul class="list-disc list-inside flex flex-col gap-4 2xl:gap-5 py-4 sm:py-6 xl:py-[30px] 2xl:py-10">
                <li v-for="(item, i) in info" :key="i" class="text-white text-sm 2xl:text-base">{{ item }}</li>
            </ul>
            <button class="btn btn-white">записаться на консультацию</button>
        </div>
    </div>
</template>

<script setup>
const info = ['Помощник-эксперт Нижегородского бизнес-омбудсмена по вопросам таможни',
    'Аттестованный специалист по банкротству', 'Аттестованный специалист по таможенным операциям',
    'Аттестованный налоговый консультант', 'Активный участник деятельности Уполномоченного по защите прав предпринимателей в Нижегородской области',
    'Финалист конкурсов «Юрист – профессионал», «Лидеры России»', 'Master of Business Administration (ИБДА РАНХиГС «Операционный менеджмент»)']
</script>