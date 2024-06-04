import * as Config from '@/lib/config';
import * as Types from '@/lib/types';
import * as NextImage from 'next/image';

export const getFileUrl = (file: Types.File) => {
  const fileSegments = file.asset.url.split('/');
  const filePath = fileSegments[fileSegments.length - 1];
  return `${Config.FILES_CDN_BASE_URL}/${filePath}`;
};

export const imageLoader: NextImage.ImageLoader = ({ src, width, quality }) => {
  const imageSegments = src.split('/');
  const imagePath = imageSegments[imageSegments.length - 1];
  return `${Config.IMAGE_CDN_BASE_URL}/${imagePath}?w=${width}&q=${quality || 75}`;
};

/*
Image loader is default export for use in next.config.js
*/
export default imageLoader;
