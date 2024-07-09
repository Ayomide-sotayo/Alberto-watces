var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 15,
      stretch: 0,
      depth: 300,
      modifier: 1,
      slideShadows: false,
    },
    loop: true,
    autoplay: {
      delay: 2000, // delay between slides
      disableOnInteraction: false,
    },
  });

  const userForm = document.getElementById('user-form');
let loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || []; // Initialize empty array

userForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const username = document.getElementById('username').value.trim();

  if (username) {
    // Check if username already exists
    if (!loggedInUsers.includes(username)) {
      loggedInUsers.push(username); // Add username only if new
    }

    localStorage.setItem('loggedInUsers', JSON.stringify(loggedInUsers));
    window.location.href = 'watch.html';
  } else {
    alert('Please enter your full name to login.');
  }
});

  