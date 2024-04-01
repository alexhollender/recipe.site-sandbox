import NextImage, { ImageProps as NextImageProps } from 'next/image';

import * as Sanity from '@/lib/sanity';
import * as Types from '@/lib/types';

type SanityImageProps = Partial<NextImageProps> & {
  alt: string;
  image: Types.Image;
  className?: string;
};

const Image: React.FC<SanityImageProps> = ({ image, className, ...props }) => {
  return (
    <NextImage
      src={Sanity.ImageBuilder.image(image).url()}
      width={props.fill ? undefined : image.asset.metadata.dimensions.width}
      height={props.fill ? undefined : image.asset.metadata.dimensions.height}
      blurDataURL={image.asset.metadata.lqip}
      placeholder="blur"
      className={className}
      {...props}
    />
  );
};

export default Image;
