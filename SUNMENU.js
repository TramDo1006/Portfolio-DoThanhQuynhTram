document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdownContent = document.querySelector(".dropdown-content");

  dropdownBtn.addEventListener("click", () => {
    dropdownContent.classList.toggle("show");
  });
});
