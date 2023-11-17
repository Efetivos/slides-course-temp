

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { smooth_scroll } from './smooth-scroll';
import Time from '@/assets/js/utils/time';
gsap.registerPlugin(ScrollTrigger)



import { home } from '../pages/home';
import { chapter } from '../pages/chapter';
class Transitions {
    constructor() {
        return;
    }

    init(isPage, DOM) {
        this.body = document.querySelector('body')
        this.$current = DOM
        this.current_page_name = isPage
        this.$old = null
        this.old_page_name = null
    }








    //? - =========================  first  ========================= -//
    //? - =========================  first  ========================= -//
    instancingPages($current, pageName) {
        ScrollTrigger.getAll().forEach(st => st.kill())
        if (pageName == 'index')  {
            home.init($current)
        }        
        if (pageName == 'chapter' || pageName == 'page')  {
            chapter.init($current)
        }
    }







    //? - =========================  on leave  ========================= -//
    //? - =========================  on leave  ========================= -//
    onLeave($old, done) {
        this.$old = $old
        this.old_page_name = this.$old.dataset.page
        done() 
        // gsap.to(this.$old, { opacity: 0, duration: 1.2, ease: 'power3.inOut', onComplete: () =>{  
        // } })

    }






    //? - =========================  before  ========================= -//
    //? - =========================  before  ========================= -//
    beforeEnter($current) {
        this.$current = $current
        this.current_page_name = this.$current.dataset.page
        // gsap.set(this.$current, {  opacity: 0 })
    }







    //? - =========================  enter ========================= -//
    //? - =========================  enter ========================= -//
    onEnter($current, done) {
        history.scrollRestoration = "manual";
        this.$current = $current
        this.instancingPages($current, this.current_page_name)
        done()
		// gsap.to(this.$current, { opacity: 1, duration: 1.2, ease: 'power3.out', onComplete: () =>{   } })
        //done()
    }








    //? - =========================  first  ========================= -//
    //? - =========================  first  ========================= -//
    firstEntrance() {
        this.body = document.querySelector('body')
        this.time = new Time()
        // smooth_scroll.setLenis(this.time)
    }

}
export const transitions = new Transitions()