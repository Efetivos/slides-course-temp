<template>

    <MenuFixed/>
	<div data-page="404" class="page page-404">
        <div class="error">
            <div class="error__content">
                <div class="error__texts">
                    <h1 class="error__title">404</h1>
                    <p class="error__text">
                        <span class="error__subt">Something went wrong</span>
                        <span class="error__wrong">Page not found</span>
                    </p>
                </div>
                <nuxt-link href="/" class="error__link">Go back home</nuxt-link>
            </div>
        </div>
	</div>
</template>
<script setup>
    useHead({
        title: 'Page not found | VWLAB Slides',
        bodyAttrs: {
            class: 'index'
        }
    })
</script>

<script>
	import { transitions } from "assets/js/utils_global/transitions";
	import { Console } from "assets/js/utils_global/console";

	export default {
		mounted() {
			const $current = document.querySelector('.page')
			transitions.firstEntrance()
			transitions.instancingPages($current, $current.dataset.page)
			new Console()
		}
	}
</script>