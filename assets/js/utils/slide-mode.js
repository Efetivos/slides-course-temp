import { gsap } from 'gsap'

export default class SlideMode {
    constructor() {
        this.$html = document.querySelector('html')
        this.$body = document.querySelector('body')

        this.bindEvetns()
    }


    onSlideMode() {
        this.$html.classList.toggle('slide-mode')
        
        this.$html.classList.contains('slide-mode') ? this.$html.classList.add('dark-mode') : this.$html.classList.remove('dark-mode')
    }
    bindEvetns() {
        let that = this
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (evt.keyCode == 27) {
                that.onSlideMode()
            }
        };
    }
}