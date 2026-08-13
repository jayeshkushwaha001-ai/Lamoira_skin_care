document.addEventListener("DOMContentLoaded", () => {

    // 1. Mobile Drawer Navigation
    const menuBtn = document.getElementById("menuBtn");
    const mobileDrawer = document.getElementById("mobileDrawer");

    const toggleDrawer = (open) => {
        if (open) {
            mobileDrawer.classList.add("active");
            pushStateForBackHandler("drawer");
        } else {
            mobileDrawer.classList.remove("active");
        }
    };

    if (menuBtn && mobileDrawer) {
        menuBtn.addEventListener("click", () => {
            const isOpen = mobileDrawer.classList.contains("active");
            toggleDrawer(!isOpen);
        });

        document.querySelectorAll(".drawer-link, .drawer-wa-btn").forEach(link => {
            link.addEventListener("click", () => {
                toggleDrawer(false);
            });
        });
    }

    // 2. Booking Modal Logic
    const bookingModal = document.getElementById("bookingModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const pConcernInput = document.getElementById("pConcern");

    window.openBookingModal = (treatmentName = "General Consultation") => {
        if (bookingModal) {
            bookingModal.classList.add("active");
            pushStateForBackHandler("modal");

            if (pConcernInput) {
                pConcernInput.value = treatmentName;
            }
        }
    };

    const closeBookingModal = () => {
        if (bookingModal && bookingModal.classList.contains("active")) {
            bookingModal.classList.remove("active");
        }
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeBookingModal);
    }

    if (bookingModal) {
        bookingModal.addEventListener("click", (e) => {
            if (e.target === bookingModal) {
                closeBookingModal();
            }
        });
    }

    // 3. Hardware Back Button Handling for Mobile
    function pushStateForBackHandler(type) {
        if (window.history && window.history.pushState) {
            window.history.pushState({ popupOpen: type }, "");
        }
    }

    window.addEventListener("popstate", () => {
        if (bookingModal && bookingModal.classList.contains("active")) {
            closeBookingModal();
        }
        if (mobileDrawer && mobileDrawer.classList.contains("active")) {
            mobileDrawer.classList.remove("active");
        }
    });

    // 4. Form Submission & Structured WhatsApp Redirect
    const appointmentForm = document.getElementById("appointmentForm");
    if (appointmentForm) {
        appointmentForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("pName").value.trim();
            const phone = document.getElementById("pPhone").value.trim();
            const ageGender = document.getElementById("pAgeGender").value.trim();
            const concern = document.getElementById("pConcern").value.trim();
            const slot = document.getElementById("pSlot").value.trim() || "Not specified";

            const message = `*NEW APPOINTMENT BOOKING REQUEST*\n` +
                `-----------------------------------\n` +
                `👤 *Patient Name:* ${name}\n` +
                `📞 *Phone Number:* ${phone}\n` +
                `🩺 *Age / Gender:* ${ageGender}\n` +
                `🔬 *Concern/Treatment:* ${concern}\n` +
                `📅 *Preferred Slot:* ${slot}\n` +
                `-----------------------------------\n` +
                `Please confirm my consultation booking slot.`;

            const doctorPhoneNumber = "918955328904";
            window.open(`https://wa.me/${doctorPhoneNumber}?text=${encodeURIComponent(message)}`, "_blank");

            closeBookingModal();
            appointmentForm.reset();
        });
    }

    // 5. Scroll & Reveal IntersectionObserver (Zig-Zag Entrance Animations)
    const revealElements = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // 6. Typewriter Effect IntersectionObserver
    const typewriterTargets = document.querySelectorAll(".tw-target");

    const typeWriter = (element, text, speed = 40) => {
        let i = 0;
        element.textContent = "";
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                element.classList.add("tw-done");
            }
        }, speed);
    };

    const typewriterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const fullText = target.getAttribute("data-text");
                if (fullText) {
                    typeWriter(target, fullText);
                }
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.3 });

    typewriterTargets.forEach(el => typewriterObserver.observe(el));

    // 7. Dynamic Counter Statistics
    const counters = document.querySelectorAll(".counter");
    let hasCounted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            let count = 0;
            const increment = target / 40;

            const updateNumber = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateNumber, 35);
                } else {
                    counter.innerText = target;
                }
            };
            updateNumber();
        });
    };

    const statsStrip = document.querySelector(".stats-strip");
    if (statsStrip) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                hasCounted = true;
                startCounters();
            }
        }, { threshold: 0.3 });

        statsObserver.observe(statsStrip);
    }
});


const topBannerSwiper = new Swiper('.top-banner-swiper', {
    loop: true,
    speed: 400, 
    autoplay: {
        delay: 2000, 
        disableOnInteraction: false,
        pauseOnMouseEnter: true, 
    },
    pagination: {
        el: '.top-banner-pagination',
        clickable: true,
    },
    effect: 'slide',
});