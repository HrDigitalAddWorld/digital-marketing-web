// navbar-loader.js - Load navbar on all pages

document.addEventListener('DOMContentLoaded', function() {
  // Create a div for navbar if it doesn't exist
  let navbarContainer = document.getElementById('navbar-container');
  
  if (!navbarContainer) {
    navbarContainer = document.createElement('div');
    navbarContainer.id = 'navbar-container';
    document.body.insertBefore(navbarContainer, document.body.firstChild);
  }

  // Fetch and load navbar
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      navbarContainer.innerHTML = data;
      
      // Initialize hamburger menu after navbar is loaded
      initHamburgerMenu();
      
      // Initialize login/logout functionality
      initAuthNavbar();
    })
    .catch(error => {
      console.error('Error loading navbar:', error);
    });
});

// Initialize Hamburger Menu
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');

  if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navbar.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbar.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navbar.classList.remove('active');
      }
    });
  }
}

// Initialize Authentication Navbar
function initAuthNavbar() {
  const navLinks = document.querySelector("nav ul");
  const loggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const userEmail = localStorage.getItem("userEmail");

  console.log(
    "Navbar Load - Logged in?",
    loggedIn,
    "| Admin?",
    isAdmin,
    "| Email:",
    userEmail
  );

  if (loggedIn && navLinks) {
    // Hide Login and Register links
    navLinks
      .querySelectorAll('a[href="login.html"], a[href="register.html"]')
      .forEach((link) => {
        if (link.parentElement) {
          link.parentElement.style.display = "none";
        }
      });

    // Add Logout link if not exists
    if (!navLinks.querySelector('a[href="#logout"]')) {
      const logoutLi = document.createElement("li");
      const logoutLink = document.createElement("a");
      logoutLink.href = "#logout";
      logoutLink.textContent = "Logout";
      logoutLink.classList.add("nav-link");
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("isAdmin");
        console.log("🔒 User logged out!");
        window.location.href = "index.html";
      });
      logoutLi.appendChild(logoutLink);
      navLinks.appendChild(logoutLi);
    }

    // Add Admin link if admin
    if (isAdmin && !navLinks.querySelector('a[href="admin.html"]')) {
      const adminLi = document.createElement("li");
      const adminLink = document.createElement("a");
      adminLink.href = "admin.html";
      adminLink.textContent = "Admin";
      adminLink.classList.add("nav-link");
      adminLi.appendChild(adminLink);
      navLinks.appendChild(adminLi);
    }
  }
}