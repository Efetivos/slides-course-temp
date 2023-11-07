<template lang="pug">
div(data-page="index" class="page page-index e-flex-col e-wvw e-hvh")
    ul.course-list 
        template(v-for=" (course, index) in data.course_list" :key="'course-' + index")
            template(v-for=" pages_list in pages")
                li(v-if="course.course.uid === pages_list.uid")
                    a(:href="`/${ course.course.uid }`") {{ pages_list.data.title  }}

</template>

<script setup>
    import navigations from "@/helpers/navigation.js";
    const { client } = usePrismic()
    const  { data } = await client.getSingle("homepage");

    const { data: pages } = await useAsyncData( async () => {
        const document = await client.getAllByType("page")
        return document;
    });

    definePageMeta({
        pageTransition: navigations 
    })
    useHead({
        title: data.meta_title + ' | VWLab',
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