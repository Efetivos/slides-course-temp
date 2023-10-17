<template lang="pug">
div(data-page="index" class="page page-index index ")

    //- template(v-for=" post in data.chapters_list")
    //-     p {{ post.chapter.uid }}
    h1 {{ data.title }}

    ul
        template(v-for=" post in data.chapters_list")
            template(v-for=" post_list in slides")
                li(v-if="post.chapter.uid === post_list.uid")
                        //- NuxtLink(:to="`/chapter/${post_list.uid}`") {{ post_list.data.page_title }}

    //- template(v-for="(slice, index) in data.body")
    //-     h1 - {{ slice.slice_type }}
</template>

<script setup>
    import navigations from "@/helpers/navigation.js";
    const { client } = usePrismic()
    const  { data } = await client.getSingle("homepage");
    const { data: slides } = await useAsyncData( async () => {
        const document = await client.getAllByType("slide")
        return document;
    });


    definePageMeta({
        pageTransition: navigations 
    })
    useHead({
        title: 'Home | ' + data.meta_title,
        bodyAttrs: {
            class: 'index'
        }
    })
</script>
<script>

    export default {
        methods: {
            scrollDown(event) {
                // window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
            }
        },
        mounted() {
            // console.log(this.data)
        }
    }
</script>