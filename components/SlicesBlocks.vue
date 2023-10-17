<template lang="pug">
main.slices 
    template(v-for="(slice, index) in slices")
            template(v-if="slice.slice_type === 'doc_item'")
                SliceDocItem(:slice="slice")

</template>
    

<script>
import {  SliceDocItem } from '~/components/exporting.js'
    
    export default {
        props: ['slices'],
        name: 'slice-blocks', 
        components: { SliceDocItem },
        mounted() {
        },
    }
</script>