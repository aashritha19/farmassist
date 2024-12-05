// Page Navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = this.getAttribute('href').substring(1);

        // Hide all sections and show only the selected section
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        document.getElementById(targetSection).classList.add('active');
    });
});

// Toggle Login and Register forms
function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

// Simulated Login/Register for demonstration purposes
let users = [];

function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Check if user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert("User already exists. Please login.");
        return;
    }

    // Register user
    users.push({ username, email, password });
    alert("Registration successful. You can now login.");
    showLoginForm();
}

function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Check credentials
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        alert("Login successful!");
        document.querySelector('.auth-section').style.display = 'none';
        document.querySelector('.dashboard').classList.add('active');
    } else {
        alert("Invalid email or password.");
    }
}

// Function to load weather alerts
function getWeatherAlerts() {
    const alertsDiv = document.getElementById('weather-alerts');
    alertsDiv.innerHTML = "Loading weather alerts...";

    // Replace with real weather API fetch
    setTimeout(() => {
        alertsDiv.innerHTML = "<p>Sunny and dry today. Light rain expected tomorrow in your area.</p>";
    }, 2000);
}
getWeatherAlerts();

// Function to load educational content
function loadEducationalContent() {
    const resourcesDiv = document.getElementById('educational-resources');
    resourcesDiv.innerHTML = "<p>Loading educational content...</p>";

    setTimeout(() => {
        resourcesDiv.innerHTML = `
            <ul>
                <li><a href="https://www.researchgate.net/publication/360265780_Enhancing_Climate_Change_Education_through_Links_to_Agriculture">Climate-Resilient farming</a></li>
                <li><a href="#">Soil Health and Management</a></li>
                <li><a href="#">Irrigation Techniques</a></li>
                <li><a href="#">New Pest Management Strategies</a></li>
            </ul>
        `;
    }, 1500);
}

// Function to connect with experts (mocked for demonstration)
function connectWithExperts() {
    const assistanceContent = document.getElementById('assistance-content');
    assistanceContent.innerHTML = "<p>Connecting to experts...</p>";

    setTimeout(() => {
        assistanceContent.innerHTML = `
            <p>Contact experts via email: <a href="mailto:expert@farmassist.com">expert@farmassist.com</a></p>
        `;
    }, 1500);
}

// Dashboard function to update farmer's crop data
function updateDashboard() {
    const cropType = document.getElementById('crop-type').value;
    const cropArea = document.getElementById('crop-area').value;
    const expectedProfit = document.getElementById('expected-profit').value;

    if (cropType && cropArea && expectedProfit) {
        const totalProfit = cropArea * expectedProfit;
        document.getElementById('dashboard-summary').innerHTML = `
            <p><strong>Crop:</strong> ${cropType}</p>
            <p><strong>Area:</strong> ${cropArea} acres</p>
            <p><strong>Expected Profit:</strong> ₹${totalProfit}</p>
        `;
    } else {
        alert("Please fill out all fields.");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    // Get all navigation links
    const navLinks = document.querySelectorAll("nav ul.nav-links li a");
    // Get all sections
    const sections = document.querySelectorAll(".section");

    // Function to hide all sections
    function hideAllSections() {
        sections.forEach(section => {
            section.style.display = "none";
        });
    }

    // Function to show the clicked section
    function showSection(id) {
        document.getElementById(id).style.display = "block";
    }

    // Set up click event listeners for each nav link
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();  // Prevent default anchor behavior

            // Hide all sections
            hideAllSections();

            // Get the target section ID from the link's href attribute (remove the #)
            const targetId = link.getAttribute("href").substring(1);

            // Show the target section
            showSection(targetId);
        });
    });

    // Show the home section by default on page load
    hideAllSections();
    showSection("home");
});
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelector(".nav-links");
    const toggleButton = document.createElement("div");

    toggleButton.classList.add("toggle-button");
    toggleButton.innerHTML = "☰"; // Simple hamburger icon
    document.querySelector("header").appendChild(toggleButton);

    toggleButton.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });
});
// Function to fetch weather data
async function fetchWeatherData(city = "Hyderabad") {
    const apiKey = "43fbd1b958cb488da3183530241011"; // Replace with your WeatherAPI key
    const apiUrl = 'https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=Hyderabad&aqi=no';
    

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch weather data.");

        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Function to display weather data in the alerts section
function displayWeatherData(data) {
    const alertsDiv = document.getElementById("alerts-list");
    alertsDiv.innerHTML = `
        <h3>Weather for ${data.location.name}</h3>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
        <img src="${data.current.condition.icon}" alt="Weather icon">
    `;
}

// Call the function to load weather data when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchWeatherData();
});
