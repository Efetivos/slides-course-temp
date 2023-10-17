import { gsap } from 'gsap'

export default class SlideMode {
    constructor() {
        this.$html = document.querySelector('html')
        this.$body = document.querySelector('body')
        this.counter = {
            $current: document.querySelector('.slide-counter__current'),
            $total: document.querySelector('.slide-counter__total')
        }
        this.bindEvetns()
    }

    getChapter() {
        this.$chapter = document.querySelector('.page-chapter')
        this.anchor = window.location.hash.replace("#", "");
        this.$destination = document.getElementById(`${this.anchor}`)
        if(!this.$destination) return


        // _____ 
        this.$each_chapter = this.$chapter.querySelectorAll('.slice-docitem')
        this.chapters_length = this.$each_chapter.length
        this.current_index = Array.from(this.$each_chapter).findIndex((chapter) => chapter.dataset.id === this.anchor);
        this.moveSlide()

    }
    
    moveSlide() {
        this.$each_chapter[this.current_index].scrollIntoView()
        this.counter.$current.innerHTML = this.current_index + 1
        this.counter.$total.innerHTML = this.chapters_length
    }


    changeNnumbers () {
        
    }


    prevSlide() {
        if(!this.$html.classList.contains('slide-mode')) return
        if(!this.$body.classList.contains('chapter') ) return
        if(this.current_index <= 0) return
        this.current_index--
        console.log(this.current_index)
        this.moveSlide()
    }

    nextSlide() {
        if(!this.$html.classList.contains('slide-mode')) return
        if(!this.$body.classList.contains('chapter') ) return
        if(this.current_index >= this.chapters_length - 1) return
        this.current_index++
        this.moveSlide()
    }


    onSlideMode() {
        if(!this.$body.classList.contains('chapter') ) return
        this.$html.classList.toggle('slide-mode')
        
        if(this.$html.classList.contains('slide-mode')) {
            this.getChapter()
            this.$html.classList.add('dark-mode') 
        } else {
            this.$html.classList.remove('dark-mode')
        }
    }
    bindEvetns() {
        let that = this

        // esc event
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (evt.keyCode == 27) {
                that.onSlideMode()
            }

            if (evt.keyCode == 37) {
                that.prevSlide()
            }

            if (evt.keyCode == 39) {
                that.nextSlide()
            }
        }
    }
}