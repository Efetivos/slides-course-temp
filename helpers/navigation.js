import { transitions } from '~/assets/js/utils_global/transitions'
import { gsap } from "gsap"
const pageTransition = {
	name: 'navigations',
	appear: true,
	css: false,
	mode: "out-in",

	//onLeave
	onLeave: (el, done) => {
		transitions.onLeave(el, done)
		// done()
	},



	//onBeforeEnter
	onBeforeEnter: (el) => {
		transitions.beforeEnter(el)
	},

	//onEnter
	onEnter: (el, done) => {
		transitions.onEnter(el, done)
		// done()
	},




	//onAfterEnter
	onAfterEnter: (el) => {
	},

}

export default pageTransition;