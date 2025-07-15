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
});

// Handle contact form submission with validation and feedback
function sendEmail(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return false;
    }

    // Validate phone format (international format)
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    if (!phoneRegex.test(phone)) {
        showAlert('Please enter a valid phone number', 'danger');
        return false;
    }

    // Create mailto link with form data
    const mailtoLink = `mailto:aamirfaryad@hotmail.com?subject=Contact from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showAlert('Message sent successfully!', 'success');
    
    // Clear form
    form.reset();
    
    return false;
}

// Alert function for form feedback
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form.nextSibling);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

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