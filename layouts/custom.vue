<template>
	<div>
		<MenuFixed/>
		<NumbIndicatorSlider/>
		<NuxtPage />
		<Preloader/>
		<ListDoc/>
	</div>
</template>
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
