const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file:", err);
    return;
  }

  // split by spaces/newlines and remove empty strings
  const words = data.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  fs.writeFile("output.txt", `Word Count: ${wordCount}`, (err) => {
    if (err) {
      console.log("Error writing file:", err);
      return;
    }
    console.log("✅ Word count written to output.txt");
  });
});
