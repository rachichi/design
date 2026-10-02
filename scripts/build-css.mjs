import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const parts = ["tokens.css", "header.css", "components.css"];
mkdirSync("dist", { recursive: true });
writeFileSync("dist/styles.css", parts.map((p) => readFileSync(`src/${p}`, "utf8")).join("\n"));
