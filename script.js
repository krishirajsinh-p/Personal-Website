// Tab Switching Logic
function showSection(sectionId) {
	// Hide all sections
	const sections = document.querySelectorAll(".section");
	sections.forEach((sec) => sec.classList.add("hidden-section"));

	// Show selected section
	document.getElementById(sectionId).classList.remove("hidden-section");

	// Update active sidebar item
	const navItems = document.querySelectorAll(".nav-item");
	navItems.forEach((item) => item.classList.remove("active"));

	// Simple mapping based on click index or logic could be added,
	// but for simplicity we rely on the onclick binding in HTML
	event.currentTarget.classList.add("active");
}

// Typewriter Effect
const text = "cat profile.json";
const speed = 50; // ms per char
let i = 0;

function typeWriter() {
	if (i < text.length) {
		document.getElementById("typewriter").innerHTML += text.charAt(i);
		i++;
		setTimeout(typeWriter, speed);
	} else {
		setTimeout(() => {
			document.getElementById("profile-content").style.display = "block";
		}, 500);
	}
}

// Start typing on load
window.onload = typeWriter;
