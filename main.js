class MultipleCounters {
    constructor() {
        this.counters = [
            { id: 'counter1', target: 840, duration: 2800 },
            { id: 'counter2', target: 900, duration: 2500 },
            { id: 'counter3', target: 450, duration: 2200 }
        ];
        this.animated = false;
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.startAllAnimations();
                    this.animated = true;
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.counter-section'));
    }
    
    startAllAnimations() {
        this.counters.forEach(counter => {
            this.animateCounter(counter.id, counter.target, counter.duration);
        });
    }
    
    animateCounter(elementId, target, duration) {
        const element = document.getElementById(elementId);
        let start = 0;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function для плавности
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const current = Math.floor(easeOut * target);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    new MultipleCounters();
});


document.addEventListener('DOMContentLoaded', function() {
    // Обработчик для всех ссылок "прочитайте больше"
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Отменяем переход по ссылке
            
            const title = this.getAttribute('data-title');
            const content = this.getAttribute('data-content');
            const image = this.getAttribute('data-image');
            
            Swal.fire({
                title: title,
                html: `
                    <div class="modal-content-wrapper">
                        ${image ? `<img src="${image}" alt="${title}" class="modal-image">` : ''}
                        <div class="modal-text-content">
                            ${content}
                        </div>
                        <div class="modal-contact-info">
                            <h4 class="modal-contact-title">📞 Хотите узнать больше?</h4>
                            <p class="modal-contact-text">Посетите нас лично или свяжитесь по телефону: <strong>+7 (999) 123-45-67</strong></p>
                        </div>
                    </div>
                `,
                width: 700,
                padding: '30px',
                background: '#fff',
                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonText: 'Закрыть',
                confirmButtonColor: '#000',
                customClass: {
                    popup: 'custom-popup',
                    title: 'swal-title-custom'
                }
            });
        });
    });
});