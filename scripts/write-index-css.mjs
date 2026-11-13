import { existsSync, readdirSync, renameSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

if (!existsSync(dist)) {
  console.error("dist/ não encontrado — rode o vite build antes");
  process.exit(1);
}

const cssFiles = readdirSync(dist).filter((name) => name.endsWith(".css"));
const indexCss = join(dist, "index.css");

if (!existsSync(indexCss)) {
  const generated = cssFiles[0];
  if (!generated) {
    console.error("Nenhum CSS gerado em dist/");
    process.exit(1);
  }
  renameSync(join(dist, generated), indexCss);
}

console.log("dist/index.css ok");
