// UI/bin/lib/Icons.ts
import sharp from 'sharp';
/* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import toIco from 'to-ico';
import { outputFile } from 'fs-extra';

async function generateFavicon(
  sourcePath: string,
  destPath: string,
): Promise<void> {
  const metadata = await sharp(sourcePath).metadata();

  const Testing = await sharp(sourcePath, {
    density: ((64 /
      Math.max(metadata.width as number, metadata.height as number)) *
      metadata.density!) as number,
  }).toBuffer();

  return outputFile(destPath, await toIco([Testing]));
}

export const createSize = (
  fileName: string,
  w: number,
  h: number,
): sharp.Sharp => sharp(fileName).resize(w, h);

type FileSize = [number, number];
export const createSizes = async (
  fileName: string,
  sizes: FileSize[],
): Promise<sharp.OutputInfo[]> =>
  Promise.all(
    sizes.map(([w, h]) =>
      createSize(fileName, w, h)
        .png()
        .toFile(`dist/public/favicon-${w}x${h}.png`),
    ),
  );

export const generateIcons = async (
  fileName: string,
): Promise<sharp.OutputInfo[]> => {
  const sizes: FileSize[] = [[96, 96], [192, 192], [512, 512]];

  const images = await createSizes(fileName, sizes);

  await generateFavicon(
    'dist/public/favicon-96x96.png',
    'dist/public/favicon.ico',
  );

  return images;
};
