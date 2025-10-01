// JavaScript SECTION

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.padding = '0';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    }
});

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Benefit cards animation
    const benefitCards = document.querySelectorAll('.benefit-card');
    const ingredientItems = document.querySelectorAll('.ingredient-item');
    const freeFromItems = document.querySelectorAll('.free-from-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Set initial state and observe
    benefitCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(card);
    });
    
    ingredientItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s, transform 0.6s, border-left 0.3s';
        observer.observe(item);
    });
    
    freeFromItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(item);
    });

    // Add to cart functionality with premium notification
    const addToCartButtons = document.querySelectorAll('.btn');
    
    addToCartButtons.forEach(button => {
        if (button.textContent.includes('Shop') || button.textContent.includes('Discover')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create premium notification
                const notification = document.createElement('div');
                notification.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <i class="fas fa-check-circle" style="font-size: 24px; color: var(--gold);"></i>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 5px;">Added to Cart</div>
                            <div style="font-size: 14px; opacity: 0.8;">LUXE Hair Serum has been added to your shopping bag</div>
                        </div>
                    </div>
                `;
                
                notification.style.position = 'fixed';
                notification.style.top = '30px';
                notification.style.right = '30px';
                notification.style.backgroundColor = 'white';
                notification.style.color = 'var(--charcoal)';
                notification.style.padding = '20px 25px';
                notification.style.borderRadius = '0';
                notification.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                notification.style.zIndex = '1000';
                notification.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                notification.style.borderLeft = '4px solid var(--gold)';
                notification.style.maxWidth = '400px';
                notification.style.transform = 'translateX(100%)';
                notification.style.opacity = '0';
                
                document.body.appendChild(notification);
                
                // Animate in
                setTimeout(() => {
                    notification.style.transform = 'translateX(0)';
                    notification.style.opacity = '1';
                }, 100);
                
                // Remove notification after 4 seconds
                setTimeout(() => {
                    notification.style.transform = 'translateX(100%)';
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        if (document.body.contains(notification)) {
                            document.body.removeChild(notification);
                        }
                    }, 500);
                }, 4000);
            });
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});