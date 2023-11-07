<template>
    <div class="e-hvh e-wvw e-flex-col">

        <h1> This is course:  {{ data.title }}</h1>
        <!-- <h1> UID:  {{ route.params.uid }}</h1> -->
        <!-- <nuxt-link :to="`/${route.params.uid}/oi`"> lin</nuxt-link> -->
        
    </div>

</template>


<script setup>
    import navigations from "@/helpers/navigation.js";
    const { client } = usePrismic()
    const route = useRoute();

    var info = ref()
    const  { data } = await client.getByUID("page", route.params.uid);

    definePageMeta({
        pageTransition: navigations,
        layout: 'custom' 
    })
    useHead({
        title: data.meta_title + ' | VWLab',
        bodyAttrs: {
            class: 'page'
        }
    })
</script>
<script>

    import Prism from 'prismjs'
    import 'prismjs/themes/prism-tomorrow.css'
    import 'prismjs/components/prism-json'
    import 'prismjs/components/prism-pug'
    export default {
        methods: {
            scrollDown(event) {
                // window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
            }
        },
        
        mounted() {
            Prism.highlightAll()
        }
    }
</script>