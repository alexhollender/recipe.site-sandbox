'use client';

import NextImage, { ImageProps as NextImageProps } from 'next/image';

import * as Icons from '@/ui/icons';
import * as React from 'react';
import * as Sanity from '@/lib/sanity';
import * as Types from '@/lib/types';
import * as Utils from '@/lib/utils';

type SanityImageProps = Partial<NextImageProps> & {
  alt: string;
  image: Types.Image;
  className?: string;
};

export const Image: React.FC<SanityImageProps> = ({ image, className, ...props }) => {
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

type HoverAutoplayProps = {
  video: Types.File;
  className?: string;
  isHovered: boolean;
};

export const HoverAutoplayVideo: React.FC<HoverAutoplayProps> = (props) => {
  const videoPlayerRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (!videoPlayerRef.current) return;

    if (props.isHovered === true) {
      videoPlayerRef.current.play();
      return;
    }
    if (props.isHovered === false) {
      videoPlayerRef.current.pause();
      return;
    }
  }, [props.isHovered]);

  return (
    <video
      ref={videoPlayerRef}
      className={Utils.cx(['w-full h-full', props.className])}
      src={props.video.asset.url}
      muted
      loop
    />
  );
};

type VideoProps = {
  video: Types.File;
  className?: string;
} & Partial<NextImageProps>;

export const Video: React.FC<VideoProps> = ({ video, className, ...props }) => {
  const [state, setState] = React.useState<'paused' | 'playing'>('paused');
  const videoPlayerRef = React.useRef<HTMLVideoElement>(null);

  const onPlay = () => {
    setState((state) => {
      if (state === 'paused') return 'playing';
      return state;
    });
  };

  const onPause = () => {
    setState((state) => {
      if (state === 'playing') return 'paused';
      return state;
    });
  };

  React.useEffect(() => {
    if (!videoPlayerRef.current) return;

    if (state === 'playing') {
      videoPlayerRef.current.play();
      return;
    }
    if (state === 'paused') {
      videoPlayerRef.current.pause();
      return;
    }
  }, [state]);

  return (
    <div className="w-full h-full relative">
      {state === 'paused' && (
        <button
          type="button"
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          aria-label="Play Video"
          onClick={onPlay}
        >
          <Icons.Play />
        </button>
      )}

      {state === 'playing' && (
        <button
          type="button"
          className="absolute inset-0 w-full h-full flex items-center justify-center group"
          aria-label="Pause Video"
          onClick={onPause}
        >
          <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity">
            <Icons.Pause />
          </div>
        </button>
      )}

      <video
        ref={videoPlayerRef}
        className={Utils.cx([
          'w-full h-full',
          className,
          {
            'object-cover': !!props.fill,
          },
        ])}
        /* @ts-ignore */
        src={video.asset.url}
        {...props}
      />
    </div>
  );
};

type MediaProps = {
  media: Types.Media;
} & Partial<NextImageProps>;

export const Media: React.FC<MediaProps> = ({ media, ...props }) => {
  if (media.video) {
    return <Video video={media.video} {...props} />;
  }

  if (media.image) {
    return <Image image={media.image} alt={media.alternateText || ''} {...props} />;
  }
};
