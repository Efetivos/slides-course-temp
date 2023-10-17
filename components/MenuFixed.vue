<template>
	<div class="menu-ui">
        <div class="menu-ui__holder">
            <nuxt-link href="/" class="logo-main">
                <svg width="100%" viewBox="0 0 91 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L10.2084 30H18.007L28.2154 0H24.2284L14.1077 29.8261L3.98695 0H0Z" fill="var(--color)"></path><path d="M44.2097 0H37.594L35.0091 29.8261L30.8469 0H27.5171L31.6793 30H38.3388L40.9238 0.173913L44.4726 30H51.0445L54.5933 0.173913L57.1783 30H63.8378L68 0H64.6702L60.508 29.8261L57.9231 0H51.3074L47.7586 29.8261L44.2097 0Z" fill="var(--color)"></path><path d="M91 9C91 4.05634 86.9437 0 82 0C77.031 0 73 4.05634 73 9C73 13.9437 77.031 18 82 18C86.9437 18 91 13.9437 91 9ZM74.1662 9C74.1662 4.66479 77.6394 1.1662 82 1.1662C86.3606 1.1662 89.8338 4.66479 89.8338 9C89.8338 13.3352 86.3606 16.8338 82 16.8338C77.6394 16.8338 74.1662 13.3352 74.1662 9ZM79.9972 9.76056H81.7211C81.8732 9.76056 82.0254 9.76056 82.1775 9.76056L84.8394 14.3493H86.2338L83.4704 9.55775C85.093 9.17746 86.031 8.16338 86.031 6.66761C86.031 4.69014 84.3831 3.57465 81.7211 3.57465H78.7549V14.3493H79.9972V9.76056ZM79.9972 4.63944H81.8986C83.5718 4.63944 84.6873 5.24789 84.6873 6.66761C84.6873 8.08732 83.5718 8.69578 81.8986 8.69578H79.9972V4.63944Z" fill="var(--color)"></path></svg>
            </nuxt-link>

            <div class="menu-ui__items-right">
                <div class="menu-ui__scheme-trg" @click="toggleMode">
                    <div class="menu-ui__scheme-trg__mode menu-ui__scheme-trg__dark">
                        <svg width="100%" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.17432 11.8229C2.17432 17.9959 7.17846 23 13.3514 23C18.0547 23 22.0794 20.0949 23.7293 15.9814C22.4419 16.4988 21.0332 16.7904 19.5608 16.7904C13.3879 16.7904 8.3838 11.7863 8.3838 5.61335C8.3838 4.14786 8.6711 2.73112 9.18385 1.4487C5.07506 3.10082 2.17432 7.12312 2.17432 11.8229Z" stroke="var(--color)" stroke-width="2.48379" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                            </div>
                    <div class="menu-ui__scheme-trg__mode menu-ui__scheme-trg__light">
                        <svg width="100%" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 2.25V4M18 32V33.75M4 18H2.25M8.04971 8.04971L6.625 6.625M27.9503 8.04971L29.375 6.625M8.04971 27.9575L6.625 29.3752M27.9503 27.9575L29.375 29.3752M33.75 18H32M25 18C25 21.8659 21.8659 25 18 25C14.134 25 11 21.8659 11 18C11 14.134 14.134 11 18 11C21.8659 11 25 14.134 25 18Z" stroke="#ffc508" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>

                <ul class="menu-ui__nav no-mobile">
                    <li class="menu-ui__nav__item">
                        <nuxt-link href="#" class="menu-ui__nav__item__link">About</nuxt-link>
                    </li>
                    <li class="menu-ui__nav__item">
                        <nuxt-link href="#" class="menu-ui__nav__item__link">Work</nuxt-link>
                    </li>
                    <li class="menu-ui__nav__item">
                        <nuxt-link href="#" class="menu-ui__nav__item__link">Contact</nuxt-link>
                    </li>
                </ul>

                <div class="menu-ui__trg-menu no-desk" @click="toggleMenu">
                    <svg width="100%" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 9H16" stroke="var(--black)" stroke-width="2"/>
                        <path d="M0 5H16" stroke="var(--black)" stroke-width="2"/>
                        <path d="M0 1H16" stroke="var(--black)" stroke-width="2"/>
                    </svg>

                </div>
            </div>

            
        </div>
	</div>

</template>


<script>
    import SlideMode from '@/assets/js/utils/slide-mode'
    export default {
        methods: {
            toggleMenu(e) {
                document.querySelector('body').classList.toggle('is-menufs')
            },
            toggleMode(e) {
                document.querySelector('html').classList.toggle('dark-mode')
            }
        },

        mounted() {
            if(window.innerWidth > 1024) {
                new SlideMode()
            }
        }
    }
</script>

