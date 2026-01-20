function capitalize(str) {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverseString(str) {
  if (!str || typeof str !== "string") return "";
  return str.split("").reverse().join("");
}

function countVowels(str) {
  if (!str || typeof str !== "string") return 0;
  let count = 0;
  const vowels = "aeiouAEIOU";
  for (let ch of str) {
    if (vowels.includes(ch)) count++;
  }
  return count;
}

module.exports = { capitalize, reverseString, countVowels };
