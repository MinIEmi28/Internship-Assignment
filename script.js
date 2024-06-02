const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

let scrollAmount = 0;
const cardWidth = 220; // Adjust this value based on your card width + margin
const maxScroll = slider.scrollWidth - slider.clientWidth;

//slidebar
function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    if (scrollAmount === 0) {
        dots[0].classList.add('active');
    } else if (scrollAmount >= maxScroll) {
        dots[2].classList.add('active');
    } else {
        dots[1].classList.add('active');
    }
}

nextButton.addEventListener('click', () => {
    scrollAmount += cardWidth;
    if (scrollAmount > maxScroll) {
        scrollAmount = maxScroll;
    }
    slider.style.transform = `translateX(-${scrollAmount}px)`;
    updateDots();
});

prevButton.addEventListener('click', () => {
    scrollAmount -= cardWidth;
    if (scrollAmount < 0) {
        scrollAmount = 0;
    }
    slider.style.transform = `translateX(-${scrollAmount}px)`;
    updateDots();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index === 0) {
            scrollAmount = 0;
        } else if (index === 1) {
            scrollAmount = Math.min(maxScroll / 2, maxScroll - cardWidth);
        } else if (index === 2) {
            scrollAmount = maxScroll;
        }
        slider.style.transform = `translateX(-${scrollAmount}px)`;
        updateDots();
    });
});
//buttons- new website
document.addEventListener('DOMContentLoaded', function() {
    const redirectPages = document.querySelectorAll('.fyle-redirect');
    redirectPages.forEach(function(redirectPage) {
        redirectPage.addEventListener('click', function() {
            window.location.href = 'https://www.fylehq.com/';
        });
    });
});


// Initialize dots on page load
updateDots();

//changeable section
function showImage(imageSrc, detailId) {
    // Change the displayed image
    document.getElementById('displayed-image').src = imageSrc;

    // Remove 'selected' class from all details
    const details = document.querySelectorAll('.detail');
    details.forEach(detail => {
        detail.classList.remove('selected');
    });

    // Add 'selected' class to the clicked detail
    document.getElementById(detailId).classList.add('selected');
}

// Default selection on page load
document.addEventListener('DOMContentLoaded', function() {
    showImage('images/image1.jpg', 'detail1');
});

//form 
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    const openFormButton = document.getElementById('openFormButton');
    const closeFormButton = document.getElementById('closeFormButton');
    const form = document.getElementById('form');

    // Show the overlay and form when the open button is clicked
    openFormButton.addEventListener('click', function() {
        overlay.style.display = 'flex';
    });

    // Hide the overlay and form when the close button is clicked
    closeFormButton.addEventListener('click', function() {
        overlay.style.display = 'none';
    });

    // Hide the overlay and form when clicking outside the form
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const termsCheckbox = document.getElementById('terms');

        if (termsCheckbox.checked) {
            const formData = new FormData(form);

            fetch('https://getform.io/f/pbqgldeb', {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                if (response.ok) {
                    // Redirect to the desired page after successful submission
                    window.location.href = 'https://getform.io/thank-you'; 
                } else {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting the form. Please try again.');
            });
        } else {
            alert('You must agree to the terms and conditions to submit the form.');
        }
    });
});
