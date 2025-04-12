// filepath: s:\CS\AGS-Eco\build.js
import { build } from "vite";

(async () => {
  try {
    await build();
    console.log("Build completed successfully.");
  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  }
})();