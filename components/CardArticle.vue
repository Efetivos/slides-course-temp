<template lang="pug">
.article__each
    .article__hold

        .article__img
            .article__imgs
                NuxtLink.article__imgs-hold.e-wp.e-hp.img-hover(:to="'/'+type +'/'+uid " :title="postData.title ")
                    AppImage(:img="postData.img")


        .article__infos
            .article__title
                NuxtLink.title-prod(:to="'/'+type +'/'+uid " :title="postData.title ")
                    h1.t-heading {{ postData.title }}
            .article-card__exceprt
                prismic-rich-text(class="rich-t subt-title excerpt" :field="postData.excerpt")



        NuxtLink.article__read(:to="'/'+type +'/'+uid " :title="postData.title ")  READ ARTICLE
</template>

<script>
    export default {
        props: ['postData', 'type', 'uid'],
        mounted() {
            // console.log(this.postData)
            //console.log([this.uid, this.type])
        },
    }
</script>