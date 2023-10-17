<template lang="pug">
div(data-page="about" class="page page-about about")


    <h1>About Page</h1>
    template(v-for="(slice, index) in data.body")
        h1 - {{ slice.slice_type }}
    <nuxt-link to="/"> Go to home Page </nuxt-link>


</template>

<script setup>
    import navigations from "@/helpers/navigation.js";
    const { client } = usePrismic()
    const  { data } = await client.getSingle("about");

    definePageMeta({
        pageTransition: navigations 
    })
    useHead({
        title: 'About | Boiler Nuxt & Prismic',
        bodyAttrs: {
            class: 'about'
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
        }
    }
</script>