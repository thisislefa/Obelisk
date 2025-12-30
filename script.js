document.addEventListener('DOMContentLoaded', () => {
            const track = document.getElementById('sliderTrack');
            const slides = Array.from(track.children);
            const nextBtn = document.getElementById('nextBtn');
            const prevBtn = document.getElementById('prevBtn');
            const sliderContainer = document.querySelector('.slider-container');

            let currentIndex = 0;

            const updateSlider = () => {
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
            };

            const nextSlide = () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
            };

            const prevSlide = () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlider();
            };

            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);

            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') nextSlide();
                if (e.key === 'ArrowLeft') prevSlide();
            });

            // --- TOUCH SWIPE FUNCTIONALITY (Crucial for Mobile) ---
            let touchStartX = 0;
            let touchEndX = 0;
            const minSwipeDistance = 50; // Required distance to register swipe

            sliderContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            sliderContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });

            const handleSwipe = () => {
                const distance = touchStartX - touchEndX;
                
                if (Math.abs(distance) > minSwipeDistance) {
                    if (distance > 0) {
                        // Swiped Left -> Next Slide
                        nextSlide();
                    } else {
                        // Swiped Right -> Prev Slide
                        prevSlide();
                    }
                }
            };
        });