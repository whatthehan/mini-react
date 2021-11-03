import { resolve } from 'path';
import { copyFileSync, existsSync, removeSync } from 'fs-extra';
import { build } from 'esbuild';
import { lessLoader } from 'esbuild-plugin-less';

const config = {
  entry: resolve(__dirname, '../src/app.tsx'),
  outdir: resolve(__dirname, '../dist'),
  html: resolve(__dirname, '../public/index.html'),
};

if (existsSync(config.outdir)) {
  console.log('clean dist directory');
  removeSync(config.outdir);
  console.log('✔️ clean success\n');
}

async function main() {
  console.log('start bundle with esbuild..');
  await build({
    entryPoints: [config.entry],
    outfile: `${config.outdir}/bundle.js`,
    jsxFactory: 'MiniReact.createElement',
    bundle: true,
    plugins: [lessLoader()],
  });
  console.log('✔️ build success\n');

  console.log('start copy index.html');
  copyFileSync(config.html, `${config.outdir}/index.html`);
  console.log('✔️ copy index.html success\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
