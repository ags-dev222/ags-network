// filepath: s:\CS\AGS-Eco\build.js
import { build } from "vite/dist/node/index.js"; // Explicitly import the correct path

(async () => {
  try {
    await build();
    console.log("Build completed successfully.");
  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  }
})();