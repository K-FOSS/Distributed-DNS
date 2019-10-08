// Web/bin/lib/build.ts
import { copy, mkdir, remove, pathExists } from 'fs-extra';
import ParcelBundler from 'parcel-bundler';
import { generateIcons } from './Icons';

export const build = async (watch = false): Promise<void> => {
  await remove('dist');
  await mkdir('dist');

  if (await pathExists('public')) await copy('public', 'dist/public');

  await Promise.all([
    copy('package.json', 'dist/package.json'),
    copy('package-lock.json', 'dist/package-lock.json'),
  ]);

  const bundler = new ParcelBundler('UI/Client.tsx', {
    outDir: 'dist/public',
    watch,
    target: 'browser',
    contentHash: true,
    sourceMaps: false,
    cache: false,
  });

  await bundler.bundle();

  process.env.BABEL_ENV = 'server';
  const serverBundler = new ParcelBundler(
    ['Server/index.ts', 'Server/Server.urls'],
    {
      outDir: 'dist/server',
      watch,
      target: 'node',
      contentHash: true,
      sourceMaps: false,
      cache: false,
    },
  );

  await serverBundler.bundle();
  await generateIcons('Icons/main.png');
};
