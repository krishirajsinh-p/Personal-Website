// Mobile Script - Handle app icon interactions and bottom sheet display

const SECTIONS = {
	cv: { icon: "📃", title: "CV" },
	profile: { icon: "👤", title: "Profile" },
	experience: { icon: "💼", title: "Experience" },
	education: { icon: "🎓", title: "Education" },
	skills: { icon: "🛠️", title: "Skills" },
	projects: { icon: "🏗️", title: "Projects" },
	certificates: { icon: "📜", title: "Certificates" },
	hackathons: { icon: "💡", title: "Hackathons" },
	contact: { icon: "🌐", title: "Contact" },
};

function openSection(sectionId) {
	const template = document.getElementById(`${sectionId}-content`);
	if (!template) return;

	const meta = SECTIONS[sectionId] || { icon: "", title: sectionId };

	// Populate sheet title
	document.getElementById("modal-icon").textContent = meta.icon;
	document.getElementById("modal-title").textContent = meta.title;

	// Populate sheet body
	const sheetBody = document.getElementById("modal-content");
	sheetBody.innerHTML = "";
	sheetBody.appendChild(template.content.cloneNode(true));

	// Open sheet
	const sheet = document.getElementById("content-modal");
	const backdrop = document.getElementById("modal-backdrop");
	sheet.classList.add("open");
	backdrop.classList.add("open");

	// Prevent body scroll
	document.body.style.overflow = "hidden";

	// Push history state so back button closes sheet
	history.pushState({ sheet: sectionId }, "");

	// Scroll sheet body to top
	setTimeout(() => { sheetBody.scrollTop = 0; }, 0);
}

function closeSection() {
	const sheet = document.getElementById("content-modal");
	const backdrop = document.getElementById("modal-backdrop");
	sheet.classList.remove("open");
	backdrop.classList.remove("open");
	document.body.style.overflow = "";
}

// Android back button
window.addEventListener("popstate", function () {
	const sheet = document.getElementById("content-modal");
	if (sheet.classList.contains("open")) {
		closeSection();
	}
});

// Keyboard escape
document.addEventListener("keydown", function (e) {
	if (e.key === "Escape") {
		const sheet = document.getElementById("content-modal");
		if (sheet.classList.contains("open")) {
			closeSection();
		}
	}
});
