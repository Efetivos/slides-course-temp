<template lang="pug">
.list-doc
    .list-doc__hold
        .list-doc__ul
            ul.list-doc__each(v-for=" (post, index) in data.chapters_list" :key="'slice-' + index")
                template(v-for=" post_list in slides")
                    li(v-if="post.chapter.uid === post_list.uid")
                        details(open)
                            summary
                                NuxtLink(:to="`/chapter/${post_list.uid}`") {{ post_list.data.page_title }}
                                .icon-arrow <svg width="100%" viewBox="0 0 72 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M52.65 60.0106L0.486572 9.67753L9.51337 0.322479L71.35 59.9894L9.7831 119.667L0.735026 110.333L52.65 60.0106Z" fill="var(--black)"/></svg>




                            // ______childs
                            .list-doc__childs
                                template(v-for=" item in post_list.data.body ")
                                    template(v-if="item.slice_type === 'doc_item'")
                                        template(v-for="child in item.items")
                                            .list-doc__childs__each( v-if="child.is_anchor" :class="child.class")
                                                NuxtLink(:to="`/chapter/${post_list.uid}#${child.class}`" :data-anchor="`#${child.class}`" ).anchor {{ child.title }}


</template>
<script setup>
    const { client } = usePrismic()
    const  { data } = await client.getSingle("homepage");
    const { data: slides } = await useAsyncData( async () => {
        const document = await client.getAllByType("slide")
        return document;
    });
</script>


<script>
    export default {
        props: ['slices'],
        name: 'list-doc',
        methods: {
            scrollToAnchor(e) {
                let $click = e.target.closest('.anchor')
                console.log($click)
                let anchor = $click.dataset.anchor
                let $target = document.querySelector(`${anchor}`)
                let offset = parseInt($target.offsetTop) + window.innerWidth * 0.08
                if(window.innerWidth > 700 && window.innerWidth < 1025) {
                    offset = parseInt($target.offsetTop) + window.innerWidth * 0.02
                }
                else if(window.innerWidth > 1024 && window.innerWidth < 1600) {
                    offset = parseInt($target.offsetTop) + window.innerWidth * 0.1
                }
                else if(window.innerWidth > 1599) {
                    offset = parseInt($target.offsetTop) + window.innerWidth * 0.07
                }
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        },
        mounted() {
            // console.log(this.slices)
        },
    }
</script>