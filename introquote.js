// introQuote.js

// Select the intro quote element
const quote = document.querySelector(".intro-quote");
if (quote) {
  const text = quote.textContent;
  quote.textContent = ""; // Clear original text

  // Split text into spans for typewriter effect
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.opacity = "0";
    span.style.transform = "translateY(10px)";
    quote.appendChild(span);
  });

  let typewriterStarted = false;

  // Function to trigger typewriter when quote enters viewport
  function typeWriterOnScroll() {
    const rect = quote.getBoundingClientRect();
    if (!typewriterStarted && rect.top < window.innerHeight - 100) {
      typewriterStarted = true;
      const letters = quote.querySelectorAll("span");
      letters.forEach((span, index) => {
        setTimeout(() => {
          span.style.opacity = "1";
          span.style.transform = "translateY(0)";
          span.style.transition = "opacity 0.03s ease, transform 0.03s ease";
        }, index * 30); // 30ms per letter
      });
      // Remove scroll listener after triggering
      window.removeEventListener("scroll", typeWriterOnScroll);
    }
  }

  // Add scroll listener
  window.addEventListener("scroll", typeWriterOnScroll);

  // Initial check in case element is already in view
  typeWriterOnScroll();
}
