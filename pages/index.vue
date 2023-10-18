<template lang="pug">
div(data-page="index" class="page page-index index ")

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