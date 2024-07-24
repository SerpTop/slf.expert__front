<template>
    <header class="flex justify-between items-center _container py-4">
        <div>
            <IconComponent name="logo-icon"/>
        </div>
        <div class="flex gap-[30px] bg-white-o2 rounded-full  xl:py-5 xl:px-8">
            <a v-for="(item, i) in headerLinks" :key="i" :href="item.link" class="text-white uppercase text-xs 2xl:text-sm">
                {{ item.title }}
            </a>
        </div>
        <div class="flex gap-5">
            <a href="" class="btn btn-white-02">+8 (831) 414 04 02  </a>
            <button class="btn btn-white">
                <IconComponent name="arrow-right"/>
                решить проблему
            </button>
        </div>
    </header>
</template>

<script setup>
const headerLinks = [
    {
        title: "практики",
        link: "",
    },
    {
        title: "цифры",
        link: "",
    },
    {
        title: "кейсы",
        link: "",
    },
    {
        title: "нас",
        link: "",
    },
    {
        title: "сертификаты",
        link: "",
    },
    {
        title: "контакты",
        link: "",
    }
]
</script>