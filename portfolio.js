// projects.js
// Keeps the original overlapping "collapsing" stack effect using Motion One.

import { scroll, animate } from "https://cdn.skypack.dev/motion@10.13.1";

// Cards wrapper (the scrollytelling track) and cards
const $cardsWrapper = document.querySelector("#cards");
const $cards = document.querySelectorAll(".card");
const numCards = $cards.length;

// Ensure CSS variable reflects the number of cards (in case you add more later)
document.documentElement.style.setProperty("--numcards", String(numCards));

// Apply padding offset and scroll-linked scaling for each card
$cards.forEach(($card, index0) => {
  const index = index0 + 1;
  const reverseIndex0 = numCards - index; // 0 for last card, grows as we go up

  // Extra top padding so you can see stacked cards under the top one
  $card.style.paddingTop = `calc(${index} * var(--card-top-offset))`;

  // Scroll-linked animation:
  // - Earlier cards shrink more than later cards
  // - Each card only animates while it's the "active" one at the top
  scroll(
    animate($card, {
      scale: [1, 1 - 0.1 * reverseIndex0], // overlap collapse
    }),
    {
      // Track the wrapper's scroll progress to segment per card
      target: $cardsWrapper,
      offset: [`${(index0 / numCards) * 100}%`, `${(index / numCards) * 100}%`],
    }
  );
});

// Left title reveal on first view (extra safety if user navigates mid-page)
const title = document.getElementById("myworks");
if (title) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) title.classList.add("seen");
      });
    },
    { threshold: 0.6 }
  );
  io.observe(title);
}

// Animate cards when they enter viewport
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.2 }
);

cards.forEach((card) => observer.observe(card));

// Start float animation only AFTER block reveal finishes
const blockEffect = document.querySelector(".my-projects");
if (blockEffect) {
  // longest block reveal duration (td + last delay) = 1.2s + 0.9s = 2.1s
  const totalDuration = 2100; // in ms
  setTimeout(() => {
    blockEffect.classList.add("seen"); // triggers your floatInAndLoop
  }, totalDuration);
}

// 3D tilt effect for cards
const tiltCards = document.querySelectorAll(".card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10; // tilt limit: 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});
