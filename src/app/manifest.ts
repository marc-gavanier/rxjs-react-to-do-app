import fs from 'fs';
import { MetadataRoute } from 'next';
import path from 'path';
import settings from '@/data/settings.json';

const faviconsDirectory = path.join(process.cwd(), 'public/favicons');
const listFilesInDirectory = (dir: string): string[] => fs.readdirSync(dir).map((file) => path.join('/favicons', file));

const sizeFromFineName = (src: string): { sizes?: string } => {
  const sizes: string | undefined = src.match(/\d+x\d+/)?.[0];
  return sizes ? { sizes } : {};
};

const webManifest = (): MetadataRoute.Manifest => ({
  name: `${settings.conferenceName} - Reactive todo app`,
  start_url: '/',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#075ffaff',
  icons: listFilesInDirectory(faviconsDirectory).map((src: string) => ({
    src,
    ...sizeFromFineName(src),
    type: 'image/png'
  }))
});

export default webManifest;
