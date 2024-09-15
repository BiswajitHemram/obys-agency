function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });




    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

function loaderanimation() {
    let tl = gsap.timeline();

    tl.to("#main", {
        opacity: 0
    })

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

    tl.to(".link h2", {
        animationName: "anime",
        opacity: 1,
        duration: 2
    })

    tl.to("#main", {
        opacity: 1,
    });


    tl.to("#loader", {
        opacity: 0,
        delay: 1.25,
        duration: 0.2
    })



    tl.from("#page1", {
        opacity: 0,
        delay: 0.2,
        y: 1600,
        duration: 0.5,
        ease: "power4.out",

    })

    tl.to("#main", {
        backgroundColor: "#151515"
    })

    tl.from("#nav", {
        opacity: 0,
    })

    tl.from(".hero h1, .hero h2", {
        y: 120,
        stagger: 0.2
    })
    tl.from(".hero-before", {
        opacity: 0
    })
    tl.to("#loader", {
        display: "none"
    })

    tl.to("#cursor", {
        display: "block",
    })

}

function cursorAnimation() {
    document.addEventListener('mousemove', (e) => {
        const cursor = document.getElementById('cursor');
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    Shery.makeMagnet("#nav-part2 h4");

    const videoContainer = document.querySelector("#video-container");
    const video = document.querySelector("#video-container video");
    const img = document.querySelector("#video-container img");
    videoContainer.addEventListener("mouseenter", () => {
        gsap.to("#cursor", {
            opacity: 0
        })
        videoContainer.addEventListener("mousemove", (e) => {
            gsap.to("#video-container #video-cursor", {
                left: e.clientX - 460,
                top: e.clientY - 200
            })
        })
    })

    videoContainer.addEventListener("mouseleave", () => {
        gsap.to("#video-container #video-cursor", {
            left: "70%",
            top: "-15%"
        })
        gsap.to("#cursor", {
            opacity: 1
        })
    })

    videoContainer.addEventListener("click", () => {
        // Select the cursor and icons for play/pause
        const cursor = document.querySelector("#video-container #video-cursor");
        const pauseIcon = document.querySelector("#video-cursor .ri-pause-circle-line");
        const playIcon = document.querySelector("#video-cursor .ri-play-fill");

        // Check if the video is paused or playing
        if (video.paused) {
            // When the video is paused, switch to play state
            cursor.style.width = "6vw";
            cursor.style.height = "12vh";
            playIcon.style.display = "none";   // Hide the play icon
            pauseIcon.style.display = "block"; // Show the pause icon
            img.style.opacity = 0;             // Hide the background image
            video.play();                      // Play the video
            video.style.opacity = 1;           // Make the video visible
        } else {
            // When the video is playing, switch to pause state
            cursor.style.width = "10vw";
            cursor.style.height = "22vh";
            playIcon.style.display = "block";  // Show the play icon
            pauseIcon.style.display = "none";  // Hide the pause icon
            img.style.opacity = 1;             // Show the background image
            video.pause();                     // Pause the video
            video.style.opacity = 0;           // Make the video invisible
        }
    });


}

function sheryjsAnimation() {
    Shery.imageEffect(".image-div #img", {
        style: 5,
        config: { "a": { "value": 2, "range": [0, 30] }, "b": { "value": 0.75, "range": [-1, 1] }, "zindex": { "value": "9996999", "range": [-9999999, 9999999] }, "aspect": { "value": 0.7412537988550427 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": true }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.4, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 1 }, "noise_speed": { "value": 0.2, "range": [0, 10] }, "metaball": { "value": 0.41, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.5, "range": [0, 2] }, "noise_scale": { "value": 10, "range": [0, 100] } },
        gooey: true

    })
}

function flagAnimation() {
    const page1 = document.querySelector("#page1");
    page1.addEventListener("mousemove", (e) => {
        gsap.to("#flag", {
            x: e.clientX,
            y: e.clientY
        })
    })

    const hero3 = document.querySelector("#hero3");
    hero3.addEventListener("mouseenter", () => {
        gsap.to("#flag", {
            opacity: 1
        })
    })
    hero3.addEventListener("mouseleave", () => {
        gsap.to("#flag", {
            opacity: 0
        })
    })
}

function textAnimation() {
    $(function () {
        const h1 = document.querySelector("#footer-hero h1");
        h1.addEventListener("mouseenter", () => {
            h1.classList.remove("default");
            h1.classList.add("non-default");
            $('#footer-hero h1').textillate({
                in: { effect: "fadeIn" },
            })
            $('#footer-hero h1').textillate('start');

        });
        h1.addEventListener("mouseleave", () => {
            h1.classList.remove("non-default");
            h1.classList.add("default");
            $('#footer-hero h1').textillate({
                in: { effect: "fadeIn" },
            })
            $('#footer-hero h1').textillate('start');
        });
    });
}

locomotiveAnimation()
loaderanimation()
cursorAnimation()
flagAnimation()
sheryjsAnimation()
textAnimation()