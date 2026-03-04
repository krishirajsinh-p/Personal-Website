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

document.getElementById("profile-content").style.display = "block";
