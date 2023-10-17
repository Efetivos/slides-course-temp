import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
class SmoothScroll {
    constructor() {
        return;
    }


    // ________________ SET LENIS
    // ________________ SET LENIS
    setLenis(time) {
        if(window.innerWidth < 1025) return
        this.time = time
        this.lenis = new Lenis({
            duration: 1.75,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical', 
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: .85,
            smoothTouch: false,
            touchMultiplier: 1,
            normalizeawards: true,
            // infinite: true,
        })
        


        this.onRaf()
    }

    // ________________ SET RAF
    // ________________ SET RAF
    onRaf() {
        let that = this
        this.time.on("tick", () => {
            that.lenis.raf(that.time.elapsed)
        }); 
    }

}


export const smooth_scroll = new SmoothScroll()