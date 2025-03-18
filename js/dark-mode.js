document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const isDarkMode = localStorage.getItem("darkMode") === "enabled";

    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        document.querySelector(".navbar").classList.add("dark-mode");
        document.querySelectorAll(".card").forEach(card => card.classList.add("dark-mode"));
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            document.querySelector(".navbar").classList.toggle("dark-mode");
            document.querySelectorAll(".card").forEach(card => card.classList.toggle("dark-mode"));

            localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
        });
    }
});
