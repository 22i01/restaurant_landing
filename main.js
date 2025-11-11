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