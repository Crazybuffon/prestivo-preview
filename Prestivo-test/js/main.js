document.addEventListener("DOMContentLoaded", function () {
    // Background layers
    const bgVideo  = document.querySelector(".bg-video");
    const bgCellar = document.querySelector(".bg-cellar");
  
    // Section for determining transition
    const aboutSection = document.getElementById("about");
  
    // Fade-in/fade-out content blocks
    const slideUpSections = document.querySelectorAll(".slide-up");
    const ioOptions = {
      root: null,
      threshold: 0.15
    };
  
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear");
        } else {
          // remove to fade out again
          entry.target.classList.remove("appear");
        }
      });
    }, ioOptions);
  
    slideUpSections.forEach(sec => fadeObserver.observe(sec));
  
    // Calculate where #about starts to fade background
    function getAboutStart() {
      return aboutSection.offsetTop;
    }
  
    let aboutStart = getAboutStart();
    window.addEventListener("resize", () => {
      aboutStart = getAboutStart();
    });
  
    // UI effects for hero elements: logo, title, subtitle, email, and button
    const heroEffectElements = document.querySelectorAll(
      '.hero-logo, .hero-title, .hero-subtitle, .hero-form input[type="email"], .hero-form button, .scroll-indicator'
    );
  
    // Scroll event
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
  
      // Fade from video to cellar from 0..aboutStart
      // t in [0..1], video -> (1 - t), cellar -> t
      if (scrollY < aboutStart) {
        let t = scrollY / aboutStart;
        t = clamp(t, 0, 1);
  
        bgVideo.style.opacity  = (1 - t).toString();
        bgCellar.style.opacity = t.toString();
      } else {
        // once past the "About" start, fully cellar
        bgVideo.style.opacity  = "0";
        bgCellar.style.opacity = "1";
      }
  
      // Apply UI effects to hero elements
      if (scrollY < aboutStart) {
        let t = scrollY / aboutStart;
        t = clamp(t, 0, 1);
        heroEffectElements.forEach(el => {
          el.style.opacity = (1 - t*5).toString();
          el.style.transform = `translateY(-${t * 100}px)`;
        });
      } else {
        heroEffectElements.forEach(el => {
          el.style.opacity = "0";
          el.style.transform = "translateY(-100px)";
        });
      }
  
      // Make the scroll indicator disappear faster (fades out by half the scroll distance)
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) {
        let indicatorT = scrollY / (aboutStart * 0.5);
        indicatorT = clamp(indicatorT, 0, 1);
        scrollIndicator.style.opacity = (1 - indicatorT).toString();
        scrollIndicator.style.transform = `translateY(-${indicatorT * 50}px)`;
      }
    });
  });
  