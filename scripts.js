/* Global JS for page interactions, slider, lightbox, chatbot, EmailJS, and responsive mobile nav */

function openZoom(img) {
    const modal = document.getElementById('zoomModal');
    const modalImage = document.getElementById('zoomedImage');
    if (!modal || !modalImage) return;
    modal.style.display = 'flex';
    modalImage.src = img.src;
}

function closeZoom() {
    const modal = document.getElementById('zoomModal');
    if (!modal) return;
    modal.style.display = 'none';
}

if (document.getElementById('zoomModal')) {
    document.getElementById('zoomModal').addEventListener('click', function (event) {
        if (event.target === this) closeZoom();
    });
}

(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('FCafLz6qa0cH8Ro2F');
    }
})();

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const serviceID = 'service_91vlbsa';
        const templateID = 'template_d0fwrij';
        emailjs.sendForm(serviceID, templateID, this)
            .then(function () {
                alert('✅ Message sent successfully!');
                contactForm.reset();
            }, function (error) {
                alert('❌ Failed to send message. Please try again later.');
                console.error('FAILED', error);
            });
    });
}

const chatbotFloat = document.getElementById('chatbot-float');
const chatbot = document.getElementById('chatbot');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatMessages = document.getElementById('chatbot-messages');
const userInput = document.getElementById('chatbot-input');
const sendButton = document.getElementById('chatbot-send');
const scrollBtn = document.getElementById('scrollTopBtn');

if (chatbotFloat && chatbot) {
    chatbotFloat.addEventListener('click', function () {
        chatbot.style.display = 'flex';
        chatbotFloat.style.display = 'none';
    });
}

if (chatbotToggle && chatbotFloat && chatbot) {
    chatbotToggle.addEventListener('click', function () {
        chatbot.style.display = 'none';
        chatbotFloat.style.display = 'flex';
    });
}

if (sendButton) {
    sendButton.addEventListener('click', sendMessage);
}

if (userInput) {
    userInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
}

function addMessage(message, sender) {
    if (!chatMessages) return;
    const messageElement = document.createElement('div');
    messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botReply(message) {
    const responses = {
        'hello': 'Hello! How can I assist you today? 😊',
        'hi': 'Hello! How can I assist you today? 😊',
        'can i get a brochure': 'Yes, you can download the brochure from the "Brochure" section on the page.',
        'yes': 'Great! Let me know if you want the program details or admission process.',
        'no': 'No problem. Let me know if you have any other questions.',
        'brochure': 'Sure! Please click the brochure download button from the website section.',
        'contact': 'You can use the contact form or call the phone number listed in the top bar.',
        'what programs do you offer': 'We offer a wide range of programs in computer science, data science, and allied fields.',
        'admission': 'Admissions are open. Please fill the contact form and we will reach out to you soon.',
        'who is the hod': 'The HOD information is in the HOD section on the page.',
        '': 'Please type a question, and I will assist you.'
    };
    const normalizedMessage = message.toLowerCase();
    let reply = responses[normalizedMessage] || 'I am not sure I understand. Please ask something else or use the quick reply buttons below.';
    addMessage(reply, 'bot');
}

function quickReply(text) {
    if (!userInput) return;
    userInput.value = text;
    sendMessage();
}

function sendMessage() {
    if (!userInput) return;
    const message = userInput.value.trim();
    if (!message) return;
    addMessage(message, 'user');
    userInput.value = '';
    setTimeout(function () {
        botReply(message);
    }, 500);
}

if (scrollBtn) {
    window.addEventListener('scroll', function () {
        if (document.documentElement.scrollTop > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
}

function scrollToQuickAccess() {
    const element = document.getElementById('wedges');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

window.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }

    const slides = Array.from(document.querySelectorAll('.slide'));
    let currentSlide = 0;
    const slideInterval = 7000;
    const intervalTime = 1500;

    function showSlide(index) {
        slides.forEach(function (slide, idx) {
            slide.classList.toggle('active', idx === index);
        });
    }

    function showNextSlide() {
        if (slides.length === 0) return;
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    if (slides.length > 0) {
        showSlide(0);
        setInterval(showNextSlide, slideInterval);
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    window.openLightbox = function (element) {
        if (!lightbox || !lightboxImg) return;
        lightbox.style.display = 'flex';
        lightboxImg.src = element.dataset.src || element.src;
    };

    window.closeLightbox = function () {
        if (!lightbox) return;
        lightbox.style.display = 'none';
    };

    if (lightbox) {
        lightbox.addEventListener('click', function (event) {
            if (event.target === lightbox) {
                window.closeLightbox();
            }
        });
    }
});
