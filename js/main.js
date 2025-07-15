// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add loading spinner
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    document.body.appendChild(spinner);

    // Remove spinner after page load
    window.addEventListener('load', function() {
        spinner.remove();
    });

    // Order form WhatsApp redirect
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('fullName').value.trim();
            const address = document.getElementById('address').value.trim();
            const details = document.getElementById('orderDetails').value.trim();
            if (!name || !address || !details) {
                alert('Please fill in all fields.');
                return;
            }
            const message = `Hello Aamir Rajput, I want to place an order.%0AName: ${encodeURIComponent(name)}%0AAddress: ${encodeURIComponent(address)}%0AOrder Details: ${encodeURIComponent(details)}`;
            const whatsappUrl = `https://wa.me/923202228880?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});

// Initialize map if we're on the contact page
if (document.getElementById('map')) {
    // Use actual coordinates for Rajput Industrial Mart
    const coordinates = [31.5204, 74.3587]; // Lahore coordinates - please update with exact location
    const map = L.map('map').setView(coordinates, 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add marker with custom popup
    const marker = L.marker(coordinates).addTo(map);
    marker.bindPopup(`
        <strong>Rajput Industrial Mart</strong><br>
        Your Complete Address Here<br>
        <a href="https://g.co/kgs/z8rH4Ck" target="_blank">Get Directions</a>
    `).openPopup();

    // Make map responsive
    window.addEventListener('resize', function() {
        map.invalidateSize();
    });
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced navbar scroll behavior
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.classList.add('navbar-scrolled');
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.classList.remove('navbar-scrolled');
        navbar.style.padding = '1rem 0';
    }
});

// Add WhatsApp click tracking
const whatsappButton = document.querySelector('a[href*="wa.me"]');
if (whatsappButton) {
    whatsappButton.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
        // You can add analytics tracking here
    });
}

// Add image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Add service card hover effects
document.querySelectorAll('.service-card, .product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}); 