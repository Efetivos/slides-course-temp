<template lang="pug">
div.slice-docitem(:data-id="slice.primary.identifier" :id="slice.primary.identifier")
    h1(v-if="slice.primary.section_title") {{ slice.primary.section_title }}
    
    .slice-docitem__texts
        ul.slice-docitem__texts__list
            template(v-for="item in slice.items").slice-docitem__texts__each
                li(v-bind:class="[item.is_anchor? `sub-item ${item.class}` : item.class ]" :id="item.class")

                    //? ________ title
                    h1.slice-docitem__texts__each__title(v-if="item.title") {{ item.title }}

                    //? ________ path
                    //- .slice-docitem__path(v-if="item.path") {{ item.path }}


                    //? ________ video
                    template(v-if="item.video.url")
                        video.slice-docitem__video(muted  controls height='fit-content').lazyvideo
                            source(:src="item.video.url", type='video/mp4')

                    //? ________ rich / parag
                    
                    prismic-rich-text(v-if="item.rich.length > 0" class="rich-t subt-title" :field="item.rich").slice-docitem__parag {{ item.rich }}


                    //? ________ code


                    //? ________ code
                    template(v-if="item.code")
                        .slice-docitem__code(v-bind:class="[item.path? 'has-path' : null ]")
                            .slice-docitem__code__path(v-if="item.path") {{ item.path }}
                            pre
                                code(:class="`language-${item.code_lang}`").code {{ item.code }}
                            
                            .slice-docitem__code__copy.e-flex(@click="copyClipboard")
                                //- span.no.copy COPY IT
                                //- span.no.copied COPIED!
                                .slice-docitem__code__copy__svg 
                                    <svg width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 460" style="enable-background:new 0 0 460 460" xml:space="preserve"><path d="M425.93 0H171.66a32.9 32.9 0 0 0-32.86 32.86V110h30V32.86a2.87 2.87 0 0 1 2.86-2.86h254.27a2.87 2.87 0 0 1 2.87 2.86v254.28a2.87 2.87 0 0 1-2.87 2.86H351.2v30h74.73a32.9 32.9 0 0 0 32.87-32.86V32.86A32.9 32.9 0 0 0 425.93 0z"/><path d="M288.34 140H34.07A32.9 32.9 0 0 0 1.2 172.86v254.27A32.9 32.9 0 0 0 34.07 460h254.27a32.9 32.9 0 0 0 32.87-32.86V172.86A32.9 32.9 0 0 0 288.33 140zm0 290H34.07a2.87 2.87 0 0 1-2.87-2.86V172.86a2.87 2.87 0 0 1 2.87-2.86h254.27a2.87 2.87 0 0 1 2.87 2.86v254.28a2.87 2.87 0 0 1-2.87 2.86z"/></svg>

</template>

<script>
    export default {
        name:'slice-docitem',
        props: ['slice'],
		methods: {
			copyClipboard(event) {
				const $btnCopy = event.target.closest('.slice-docitem__code__copy')
				const $code = event.target.closest('.slice-docitem__code').querySelector('.code')
				$btnCopy.classList.add('is-copied')
				navigator.clipboard.writeText($code.textContent);

				
				const removeCopied = setTimeout(()=> {
                    $btnCopy.classList.remove('is-copied')
					clearTimeout(removeCopied);
                }, 1500);
			}
		},
        mounted() {
            //console.log(this.slice)
        }
    }
</script>

