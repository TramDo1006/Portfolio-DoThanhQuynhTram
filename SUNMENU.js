document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdown = document.querySelector(".dropdown");

  // Toggle dropdown on button click
  dropdownBtn.addEventListener("click", () => {
    dropdown.classList.toggle("active");
  });

  // Optional: close dropdown if user clicks outside
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !dropdownBtn.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});
