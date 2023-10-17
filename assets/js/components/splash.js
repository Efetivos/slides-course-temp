import gsap from "gsap";
class Splash {
	constructor() {
		return;
	}


	setters(World) {
		this.$html = document.querySelector('html')
		this.$body = document.querySelector('body')
		this.time = 1
		this.$preloader = document.querySelector('.preloader')
		this.World = World
		this.bindEvents()
    }




	//? - =========================  enter  ========================= -//
	completed() {
	}



	//? - =========================  enterPage  ========================= -//
	onEnterPage() {
	}




	//? - =========================  enterSplash  ========================= -//
	anima() {
	}


	bindEvents() {

        // this.splash.$el.addEventListener("mousemove", (e) => this.onMouseMove(e), { passive: true });
	}



    onMouseMove(e) {
        let x = e.clientX
        let y = e.clientY
    }

}

export const splash = new Splash();
