import { gsap } from "gsap"

export class MenuFS {
    constructor() {
        this.body = document.querySelector('body')
        this.menufs = {
            $el: document.querySelector('.menu-fs'),
        }
        this.time = 1
        this.animating = false
        this.setters()
        this.bindEvents()
    }


    setters() {  
    }

    bindEvents() { 
    }
}