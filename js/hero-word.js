// js/hero-word.js

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const setLetterFrontColor = (el, color) => {
  el.style.setProperty("--front-color", color);
};

const setLetterBackColor = (el, color) => {
  el.style.setProperty("--back-color", color);
};

const setCursor = (el, on) => {
  const existing = el.querySelector(".type-cursor");
  if (!on) {
    if (existing) existing.remove();
    return;
  }
  if (existing) return;
  const c = document.createElement("span");
  c.className = "type-cursor";
  c.textContent = "|";
  el.appendChild(c);
};

const typeText = async (el, text, { speedMs = 45 } = {}) => {
  el.textContent = "";
  setCursor(el, true);

  for (let i = 0; i < text.length; i += 1) {
    // insert before cursor
    const cursor = el.querySelector(".type-cursor");
    const node = document.createTextNode(text[i]);
    el.insertBefore(node, cursor);
    await sleep(speedMs);
  }

  setCursor(el, false);
};

const padWord = (word, len) => {
  const s = String(word);
  if (s.length >= len) return s;
  return s + " ".repeat(len - s.length);
};

const createLetters = (root, word, frontColor) => {
  root.innerHTML = "";
  for (let i = 0; i < word.length; i += 1) {
    const ch = word[i] === " " ? "\u00A0" : word[i];
    const span = document.createElement("span");
    span.className = "flip-letter";
    span.dataset.char = ch;
    span.dataset.next = ch;

    // start with a stable front color
    setLetterFrontColor(span, frontColor);
    setLetterBackColor(span, frontColor);

    root.appendChild(span);
  }
};

const setStageClass = (root, cls) => {
  root.classList.remove("word-navy", "word-rose", "word-peri", "word-black");
  root.classList.add(cls);
};

const typeWord = async (root, paddedWord, frontColor, { speedMs = 28 } = {}) => {
  createLetters(root, " ".repeat(paddedWord.length), frontColor);
  const letters = Array.from(root.querySelectorAll(".flip-letter"));

  for (let i = 0; i < letters.length; i += 1) {
    const ch = paddedWord[i] === " " ? "\u00A0" : paddedWord[i];
    letters[i].dataset.char = ch;
    letters[i].dataset.next = ch;
    await sleep(speedMs);
  }
};

const flipTo = async (
  root,
  nextWord,
  nextColor,
  { perLetterDelayMs = 22, flipDurationMs = 360 } = {}
) => {
  const letters = Array.from(root.querySelectorAll(".flip-letter"));

  // set next chars + next back-face color upfront
  for (let i = 0; i < letters.length; i += 1) {
    const ch = nextWord[i] === " " ? "\u00A0" : nextWord[i];
    letters[i].dataset.next = ch;

    // only the back face becomes the new color before flip
    setLetterBackColor(letters[i], nextColor);
  }

  for (let i = 0; i < letters.length; i += 1) {
    const el = letters[i];

    el.classList.add("is-flipping");

    await sleep(Math.floor(flipDurationMs / 2));
    el.dataset.char = el.dataset.next;

    await sleep(Math.ceil(flipDurationMs / 2));
    el.classList.remove("is-flipping");

    // after flip completes, commit the new color to the front face
    setLetterFrontColor(el, nextColor);

    await sleep(perLetterDelayMs);
  }
};

const pickSet = () => {
  // You said you will choose words later. Keep placeholders.
  // Replace these with your actual sets.
  const sets = [
    ["successful", "connected", "irreplaceable"],
    ["inspired", "strong", "a CEO"],
    ["innovative", "accomplished", "understood"],
    ["wanted", "clear minded", "influential"],
    ["a tastemaker", "exceptional", "world class"],
  ];
  return sets[Math.floor(Math.random() * sets.length)];
};

const run = async () => {
  const eyebrow = document.getElementById("heroEyebrow");
  const wordRoot = document.getElementById("heroWord");
  if (!eyebrow || !wordRoot) return;

  const [w1, w2, w3] = pickSet().map((w) => String(w).toLowerCase());
  const final = "heritage";

  const sequence = [w1, w2, w3, final];
  const maxLen = sequence.reduce((m, w) => Math.max(m, w.length), 0);
  const padded = sequence.map((w) => padWord(w, maxLen));

  // Pull your CSS vars so colors stay centralized in CSS
  const rootStyles = getComputedStyle(document.documentElement);
  const navy = rootStyles.getPropertyValue("--rose").trim();
  const rose = rootStyles.getPropertyValue("--rose").trim();
  const peri = rootStyles.getPropertyValue("--rose").trim();
  const black = rootStyles.getPropertyValue("--rose").trim();

  // Type eyebrow
  await typeText(eyebrow, "i want to be", { speedMs: 45 });
  await sleep(180);

  // Stage 1: type first word in navy (front+back start navy)
  await typeWord(wordRoot, padded[0], navy, { speedMs: 26 });
  await sleep(550);

  // Stage 2: flip to rose (back face becomes rose during flip, front commits after)
  await flipTo(wordRoot, padded[1], rose, { perLetterDelayMs: 18, flipDurationMs: 320 });
  await sleep(520);

  // Stage 3: flip to periwinkle
  await flipTo(wordRoot, padded[2], peri, { perLetterDelayMs: 18, flipDurationMs: 320 });
  await sleep(520);

  // Final: flip to heritage in black
  // Fade out eyebrow as heritage begins
  if (eyebrow) {
    eyebrow.classList.add("is-hidden");
  }

  // Final: flip to heritage in black
  await flipTo(wordRoot, padded[3], black, {
    perLetterDelayMs: 16,
    flipDurationMs: 320
  });
  const subRow = document.querySelector(".hero-sub-row");
  if (subRow) {
    subRow.classList.add("is-visible");
  }
};
document.addEventListener("DOMContentLoaded", run);