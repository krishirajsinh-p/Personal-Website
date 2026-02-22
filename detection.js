// Mobile Device Detection & Routing
(function() {
	// Check if device is mobile or tablet
	function isMobileDevice() {
		// Check viewport width first (mobile-first)
		if (window.innerWidth <= 768) {
			return true;
		}

		// Fallback: User agent detection for devices that might slip through
		const ua = navigator.userAgent || navigator.vendor || window.opera;

		// Mobile user agents
		const mobileRegex =
			/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|touch/i;

		return mobileRegex.test(ua.toLowerCase());
	}

	// Check if user has manually switched view
	function hasViewPreference() {
		return localStorage.getItem("viewPreference");
	}

	// Get current view preference
	function getViewPreference() {
		return localStorage.getItem("viewPreference") || "auto";
	}

	// Perform routing logic
	function routeUser() {
		const currentPage = window.location.pathname;
		const viewPreference = getViewPreference();
		let shouldBeMobile = false;

		// Determine if user should see mobile version
		if (viewPreference === "mobile") {
			shouldBeMobile = true;
		} else if (viewPreference === "desktop") {
			shouldBeMobile = false;
		} else {
			// Auto detection
			shouldBeMobile = isMobileDevice();
		}

		// Don't redirect if already on the correct page
		const isOnMobile =
			currentPage.includes("mobile.html") || currentPage.includes("mobile/");
		const isOnDesktop =
			currentPage.includes("index.html") ||
			currentPage.endsWith("/") ||
			(currentPage === "/" && !currentPage.includes("mobile"));

		if (shouldBeMobile && !isOnMobile) {
			// Redirect to mobile version
			window.location.href = "./mobile.html";
		} else if (!shouldBeMobile && isOnMobile) {
			// Redirect to desktop version
			window.location.href = "./index.html";
		}
	}

	// Set view preference and reload
	window.setViewPreference = function(preference) {
		localStorage.setItem("viewPreference", preference);
		routeUser();
	};

	// Make device detection available globally for debugging
	window.isMobileDevice = isMobileDevice;

	// Route on page load (only if not already being redirected)
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", routeUser);
	} else {
		routeUser();
	}
})();
