import { readFileSync } from "fs";
import { resolve, join } from "path";

export function getServerVersion(): string {
  const { version } = JSON.parse(
    readFileSync(join(resolve(), "package.json"), { encoding: "utf-8" })
  );
  return version;
}
