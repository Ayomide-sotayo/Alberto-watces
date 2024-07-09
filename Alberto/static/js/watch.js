
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    event.preventDefault();
    document.querySelector(event.target.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

 // JavaScript to change navbar background color on scroll
 window.onscroll = function() {
  var navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
      navbar.classList.add('sticky');
  } else {
      navbar.classList.remove('sticky');
  }
};


const welcomeMessage = document.getElementById('welcome-message');
const homeCount = document.getElementById('home-count');

// Get usernames from local storage or initialize an empty array
let loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || [];

// Update Welcome Message (Option 1: Display only new user)
// if (loggedInUsers.length > 0) {
//   const username = loggedInUsers[loggedInUsers.length - 1]; // Get the latest username (optional)
//   welcomeMessage.textContent = username; // Uncomment for option 1
// }

// Update Welcome Message (Option 2: Display user from form data)
const usernameFromStorage = localStorage.getItem('latestUsername');
if (usernameFromStorage) {
  welcomeMessage.textContent = usernameFromStorage;
  localStorage.removeItem('latestUsername'); // Remove temporary storage
}

// Update Count on Every Login
let totalLogins = localStorage.getItem('totalLogins') ? parseInt(localStorage.getItem('totalLogins')) : 0;

totalLogins++;
localStorage.setItem('totalLogins', totalLogins);
homeCount.textContent = totalLogins;


// Update User Count
homeCount.textContent = loggedInUsers.length;

 // scroll ticker
function updateTicker() {
  const tickerContent = document.getElementById("ticker-content");
  console.log(tickerContent);
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Use a reverse geocoding service to get a user-friendly location
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          const userFriendlyLocation = data.display_name;
          tickerContent.textContent = `Current Date/Time: ${formattedDate} | Location: ${userFriendlyLocation}`;
        })
        .catch((error) => {
          tickerContent.textContent = `Current Date/Time: ${formattedDate} | Location not available`;
        });
    });
  } else {
    tickerContent.textContent = `Current Date/Time: ${formattedDate} | Geolocation not supported`;
  }
}
updateTicker();

