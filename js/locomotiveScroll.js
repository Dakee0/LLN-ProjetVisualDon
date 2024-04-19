
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import LocomotiveScroll from 'locomotive-scroll';
gsap.registerPlugin(ScrollTrigger,MotionPathPlugin);

const locoScroll = new LocomotiveScroll({
    el: document.querySelector('body'),
    smooth: true
});

locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("body", {
    scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) : 		locoScroll.scroll.instance.scroll.y;
},
getBoundingClientRect() {
return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
},
pinType: document.querySelector("body").style.transform ? "transform" : "fixed"
});

gsap.set('#monChemin',{
    xPercent:30,
})
gsap.to("#monCercle", {
    scrollTrigger: {
        trigger: "#sec1",
        start: "top top",
        scroller:'body',
        endTrigger: "footer",
        end: "bottom bottom",
        scrub: true,
    },
    motionPath: {
        path: "#monChemin",
        align:"#monChemin",
        alignOrigin: [0.5, 0.5],    
    },
    duration: 1
});
gsap.set('#montPath',{
    xPercent:-60,
    yPercent:10,
})
gsap.to("#montCercle", {
    scrollTrigger: {
        trigger: "header",
        start: "top top",
        end: "bottom +=10",
        scrub: true,
    },
    motionPath: {
        path: "#montPath",
        align:"#montPath",
        alignOrigin: [0.5, 0.5],    
    },
    duration: 3
});

gsap.utils.toArray('strong').forEach((strong)=>{
    ScrollTrigger.create({
        trigger:strong,
        start: "top bottom-=200px",
        toggleClass:"active",
    })
})

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();
