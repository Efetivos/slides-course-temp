<template>
    <div data-page="chapter" class="page page-chapter chapter">
        <SlicesBlocks :slices="data.body" />
        
    </div>

</template>

<script setup>
    import navigations from "@/helpers/navigation.js";
    const { client } = usePrismic()
    const route = useRoute();

    var info = ref()
    const  { data } = await client.getByUID("slide", route.params.uid);

    definePageMeta({
        pageTransition: navigations 
    })
    useHead({
        title: data.meta_title,
        bodyAttrs: {
            class: 'chapter'
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