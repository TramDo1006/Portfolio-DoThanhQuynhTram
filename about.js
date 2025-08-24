const circleImage = document.querySelector(".about-image img");
const imageContainer = document.querySelector(".about-image");
const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

const words = [
  "Illustration",
  "Graphic Design",
  "Branding",
  "Handcraft",
  "Video Editing",
  "Brochure",
  "Cataloque",
  "Animation",
  "Coding",
  "Creative Directing",
];

let intervalId;

// ✅ Rotation + inertia vars
let rotation = 0;
let rotationSpeed = 0;
let isHovering = false;
let scale = 1;
let targetScale = 1;

function resizeCanvas() {
  canvas.width = imageContainer.offsetWidth;
  canvas.height = imageContainer.offsetHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function spawnWords() {
  // Clear old words + canvas
  document.querySelectorAll(".word-container").forEach((el) => el.remove());
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const positions = [];
  const imgWidth = circleImage.offsetWidth;
  const imgHeight = circleImage.offsetHeight;

  // 🔑 Adjusted circle
  let centerX = imgWidth / 2;
  let centerY = imgHeight / 2;
  let radius = Math.min(imgWidth, imgHeight) / 2;

  radius *= 0.7; // shrink circle
  centerX -= imgWidth * 0.15; // shift left
  centerY -= imgHeight * 0.1; // shift up

  for (let i = 0; i < words.length; i++) {
    let top, left;
    let overlap, insideCircle;

    do {
      top = Math.random() * imgHeight;
      left = Math.random() * imgWidth;

      const dx = left - centerX;
      const dy = top - centerY;
      insideCircle = dx * dx + dy * dy <= radius * radius;

      overlap = positions.some((pos) => {
        return Math.hypot(pos.left - left, pos.top - top) < 60;
      });
    } while (!insideCircle || overlap);

    positions.push({ top, left });

    const wordEl = document.createElement("div");
    wordEl.className = "word-container";
    wordEl.style.top = `${top}px`;
    wordEl.style.left = `${left}px`;

    // 🎲 Random font size (between 14px – 28px)
    const fontSize = Math.floor(Math.random() * 14) + 14;
    wordEl.style.fontSize = `${fontSize}px`;

    // 🌟 Star-glow effect
    wordEl.textContent = words[i];
    wordEl.style.color = "white";
    wordEl.style.textShadow =
      "0 0 6px rgba(255,255,255,0.9), 0 0 12px rgba(200,200,255,0.6)";

    imageContainer.appendChild(wordEl);
  }

  // 🎨 draw connections
  drawConnections(positions);
}

function drawConnections(positions) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"; // brighter white
  ctx.lineWidth = 1; // thicker lines
  ctx.shadowBlur = 8; // glow intensity
  ctx.shadowColor = "rgba(255, 255, 255, 0.9)"; // glow color

  positions.forEach((pos, i) => {
    // Each word connects to 1–2 random others
    const numConnections = Math.floor(Math.random() * 2) + 1;
    for (let j = 0; j < numConnections; j++) {
      const targetIndex = Math.floor(Math.random() * positions.length);
      if (targetIndex !== i) {
        const target = positions[targetIndex];
        ctx.beginPath();
        ctx.moveTo(pos.left, pos.top);
        ctx.lineTo(target.left, target.top);
        ctx.stroke();
      }
    }
  });

  // Reset glow so it won’t affect other drawings
  ctx.shadowBlur = 0;
}

// 🌀 Rotation + inertia animation
function animateRotation() {
  if (isHovering) {
    rotationSpeed += 0.0005;
    if (rotationSpeed > 0.002) rotationSpeed = 0.002;
    targetScale = 1.15; // scale up when hover
  } else {
    rotationSpeed *= 0.98;
    if (rotationSpeed < 0.0001) rotationSpeed = 0;
    targetScale = 1; // shrink back
  }

  rotation += rotationSpeed;

  // smooth scale interpolation
  scale += (targetScale - scale) * 0.02;

  circleImage.style.transform = `rotate(${rotation}rad) scale(${scale})`;

  requestAnimationFrame(animateRotation);
}
animateRotation();

circleImage.addEventListener("mouseenter", () => {
  isHovering = true;
  spawnWords();
  intervalId = setInterval(spawnWords, 1500);
});

circleImage.addEventListener("mouseleave", () => {
  isHovering = false;
  clearInterval(intervalId);
  document.querySelectorAll(".word-container").forEach((el) => el.remove());
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// === STEP-BY-STEP TIMELINE PROGRESS ===
const timelines = document.querySelectorAll(".timeline");

timelines.forEach((tl) => {
  const line = tl.querySelector(".timeline-line");
  const items = Array.from(tl.querySelectorAll(".timeline-item"));
  let maxHeight = 0; // track last grown height

  // Intersection Observer for items
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const item = entry.target;
        if (entry.isIntersecting) {
          item.classList.add("show"); // reveal dot + text
          growLine(item); // grow line to this new dot
        }
      });
    },
    {
      threshold: 0.5, // visible when half of item is seen
      root: null,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  items.forEach((item) => observer.observe(item));

  function growLine(item) {
    const dot = item.querySelector(".timeline-dot");
    if (!dot) return;

    // Calculate dot's vertical center relative to .timeline
    const y = dot.offsetTop + dot.offsetHeight / 2;

    // Only extend further down (never shrink)
    if (y > maxHeight) {
      maxHeight = y;
      line.style.height = maxHeight + "px";
    }
  }

  // Reset on resize
  window.addEventListener("resize", () => {
    maxHeight = 0;
    line.style.height = "0px";
    items.forEach((i) => {
      if (i.classList.contains("show")) growLine(i);
    });
  });
});
