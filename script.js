let tl = gsap.timeline();

tl.from(".link h1", {
    y: 100,
    stagger: 0.25,
    duration: 0.4,
    delay: 0.5
})

tl.from("#link1-part1, .link h2", {
    opacity: 0,
    onStart: function () {
        let h5Timer = document.querySelector("#link1-part1 h5");
        let grow = 0;
        let timer = setInterval(() => {
            if (grow < 100) {
                h5Timer.textContent = grow++;
            } else {
                h5Timer.textContent = grow;
                clearInterval(timer)
            }
        }, 33);
    }
})

tl.to(".link h2",{
    animationName: "anime",
    opacity: 1,
    duration: 2
})

tl.to("#loader", {
    opacity: 0,
    delay: 1.25,
    duration: 0.2
})

tl.from("#page1",{
    opacity: 0,
    delay: 0.2,
    y: 1600,
    duration: 0.5,
    ease: "power4.out"
})

tl.to("#loader", {
    display: "none"
})