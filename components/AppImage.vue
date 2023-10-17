<template lang="pug">
picture
    //- img(:src='img.url' loading='lazy' :srcset='`${img.mobile.url} 500w, ${img.url} 501w`' sizes='100vw' :alt='img.alt')
    img(:src='img.url' loading='lazy' sizes='100vw' :alt='img.alt')
</template>
    

<script>
    export default {
        props: ['img'],
        mounted() {
        },
    }
</script>