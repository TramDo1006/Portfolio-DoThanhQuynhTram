// Select all planes
const planes = document.querySelectorAll(".plane");

// Array of random phrases or words
const phrases = [
  "Design",
  "Innovation",
  "Creativity",
  "Pixels orbit like planets",
  "Branding",
  "Curiosity",
  "Think like a designer",
  "Explore",
  "Imagination",
  "Cosmic ideas",
  "Storytelling",
  "Vision",
  "Code",
  "Graphics",
  "UI/UX",
  "Ideas",
  "Inspiration",
];

// Function to generate random text
function getRandomText() {
  const length = Math.floor(Math.random() * 6) + 3; // 3–8 phrases
  let text = "";
  for (let i = 0; i < length; i++) {
    text += phrases[Math.floor(Math.random() * phrases.length)] + " ";
  }
  return text;
}

// Update each plane randomly every 300ms
planes.forEach((plane) => {
  setInterval(() => {
    plane.textContent = getRandomText();
  }, 800); // change speed if needed
});
