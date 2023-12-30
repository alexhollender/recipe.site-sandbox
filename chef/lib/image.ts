// import NextImage, { ImageProps as NextImageProps } from 'next/image';

// import * as Sanity from '@/lib/sanity';
// import * as Types from '@/lib/types';

// type ImageProps = Partial<NextImageProps> & {
//   image: Types.Image;
//   className?: string;
// };

// const Image: React.FC<ImageProps> = ({ image, className, ...props }) => {
//   return (
//     <NextImage
//       key={image._key}
//       src={Sanity.imageBuilder.image(image).url()}
//       alt={image.alt || ''}
//       width={props.fill ? undefined : image.asset.metadata.dimensions.width}
//       height={props.fill ? undefined : image.asset.metadata.dimensions.height}
//       blurDataURL={image.asset.metadata.lqip}
//       placeholder="blur"
//       className={className}
//       {...props}
//     />
//   );
// };

// export default Image;
