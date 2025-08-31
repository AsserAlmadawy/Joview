import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";
import { viteStaticCopy } from "vite-plugin-static-copy";

const htmlFiles = fs.readdirSync(__dirname).filter(file => file.endsWith(".html")).reduce((inputs, file) => {
  const name = file.replace(/\.html$/, "");
  inputs[name] = resolve(__dirname, file);

  return inputs;
}, {});

export default defineConfig({
  build: {
    rollupOptions: {
      input: htmlFiles
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: "*.css", dest: "" },
        { src: "*.js", dest: "" }
      ]
    })
  ]
});