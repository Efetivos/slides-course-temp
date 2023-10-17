import { gsap } from 'gsap'

class Chapter {
    constructor() {
        return;
    }

    init(thisContent) {
        let doc = thisContent
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

    }
}

export const chapter = new Chapter()