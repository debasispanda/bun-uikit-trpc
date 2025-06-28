import * as fs from "fs/promises";
import * as path from "path";

const MIGRATION_ACTIONS = ["up", "down"];

const action = process.argv.at(-1);

// Directory to scan
const directory = "src/migrations"; // Change this to your target directory

const isValidAction = action && MIGRATION_ACTIONS.includes(action);

async function runAllFunctionsInDirectory(dir: string) {
  if (!isValidAction) {
    throw new Error(`Invalid migration action: ${action}`);
  }
  const files = await fs.readdir(dir);

  for (const file of files.sort()) {
    if (file.endsWith(".ts")) {
      const fullPath = path.resolve(dir, file);
      // Dynamic import: must be compiled to JavaScript first or use ts-node
      const module = await import(fullPath);

      // Optionally, run named exports
      for (const [key, exported] of Object.entries(module)) {
        if (typeof exported !== "function") {
          throw new Error("Invalid migration action. It should be a function.");
        }

        if (key === action) {
          try {
            await exported();
            console.info(`Migration ${file} sucessfully completed!`);
          } catch (e) {
            console.error(`Migration ${file} failed!`, e);
          }
        }
      }
    }
  }
}

// Run it (ensure TypeScript files are compiled or use ts-node)
runAllFunctionsInDirectory(directory).catch((err) => {
  console.error(err);
  process.exit(1);
});
