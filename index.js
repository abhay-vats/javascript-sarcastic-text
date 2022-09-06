// Select elements
const textarea = document.querySelector('[name="text"]');
const result = document.querySelector('.result');
const inputs = Array.from(document.querySelectorAll('[name="filter"]'));

// Helper data
const funkyLetters = {
  '-': '₋',
  '!': 'ᵎ',
  '?': 'ˀ',
  '(': '⁽',
  ')': '₎',
  '+': '⁺',
  '=': '₌',
  0: '⁰',
  1: '₁',
  2: '²',
  4: '₄',
  5: '₅',
  6: '₆',
  7: '⁷',
  8: '⁸',
  9: '⁹',
  a: 'ᵃ',
  A: 'ᴬ',
  B: 'ᴮ',
  b: 'ᵦ',
  C: '𝒸',
  d: 'ᵈ',
  D: 'ᴰ',
  e: 'ₑ',
  E: 'ᴱ',
  f: '𝒻',
  F: 'ᶠ',
  g: 'ᵍ',
  G: 'ᴳ',
  h: 'ʰ',
  H: 'ₕ',
  I: 'ᵢ',
  i: 'ᵢ',
  j: 'ʲ',
  J: 'ᴶ',
  K: 'ₖ',
  k: 'ₖ',
  l: 'ˡ',
  L: 'ᴸ',
  m: 'ᵐ',
  M: 'ₘ',
  n: 'ₙ',
  N: 'ᴺ',
  o: 'ᵒ',
  O: 'ᴼ',
  p: 'ᵖ',
  P: 'ᴾ',
  Q: 'ᵠ',
  q: 'ᑫ',
  r: 'ʳ',
  R: 'ᵣ',
  S: 'ˢ',
  s: 'ˢ',
  t: 'ᵗ',
  T: 'ₜ',
  u: 'ᵘ',
  U: 'ᵤ',
  v: 'ᵛ',
  V: 'ᵥ',
  w: '𝓌',
  W: 'ʷ',
  x: 'ˣ',
  X: 'ˣ',
  y: 'y',
  Y: 'Y',
  z: '𝓏',
  Z: 'ᶻ'
};

// Filter methods
const filters = {
  sarcastic(char, index) {
    return index % 2 ? char.toUpperCase() : char.toLowerCase();
  },
  funky(char) {
    // Find funky letter corresponding to char
    let funkyLetter = funkyLetters[char];
    if (funkyLetter) return funkyLetter;

    // If not found, find funky letter for lowercase char
    funkyLetter = funkyLetters[char.toLowerCase()];
    if (funkyLetter) return funkyLetter;

    // Else, just return the char
    return char;
  },
  unable(char) {
    // There is going to be 1 in 4 chance that a ' ' (space) will become '...' (ellipsis)
    const random = Math.floor(Math.random() * 4);

    if (char === ' ' && random === 2) return '...';
    return char;
  }
};

// Setup text transform function
function transformText(text) {
  const checkedFilter = inputs.find((input) => input.checked).value;
  const modifiedText = Array.from(text).map(filters[checkedFilter]);
  result.textContent = modifiedText.join('');
}

// Add event listeners
textarea.addEventListener('input', ({ target: { value } }) =>
  transformText(value)
);
inputs.forEach((input) =>
  input.addEventListener('input', () => transformText(textarea.value))
);

// Run transform text on load
transformText(textarea.value);
