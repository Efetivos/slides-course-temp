<template>
	<div class="menu-fs e-wvw e-hvh">
		<div class="menu-fs__hold e-wp e-hp e-flex">
			
		</div>
	</div>
</template>


<script>
	import { MenuFS } from '@/assets/js/components/menufs'
	

    export default {

		methods: {
			onClick(event) {
				// console.log(event)
            },
		},
        mounted() {
			new MenuFS()
        }
    }
</script>


