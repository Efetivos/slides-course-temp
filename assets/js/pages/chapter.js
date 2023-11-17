import { gsap } from 'gsap'

class Chapter {
    constructor() {
        return;
    }

    init(thisContent) {
        let doc = thisContent
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        let that = this
        this.page_url = window.location.href.split("#")[0];
        this.chapter = {
            $el: thisContent,
            $each: this.qsa('.slice-docitem')
        }

        
        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) { return; }
                let $chapter = entry.target
                let chapterId = $chapter.dataset.id
                if(!chapterId) {
                    history.pushState({}, null, `${that.page_url}`);
                } else {
                    history.pushState({}, null, `${that.page_url}#${chapterId}`);
                    that.chapter.$el.setAttribute("data-chapter", `${chapterId}`); 
                }
            })

        }, { threshold: .65 })

        this.chapter.$each.forEach(el => observer.observe(el))
    }
}

export const chapter = new Chapter()