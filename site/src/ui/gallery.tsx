'use client';

import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';
import * as Utils from '@/lib/utils';

type GalleryProps = {
  media: Types.Media[];
};

const Gallery: React.FC<GalleryProps> = ({ media }) => {
  const [activeMediaIndex, setActiveMediaIndex] = React.useState<number>(0);
  const [videoPlayStates, setVideoPlayStates] = React.useState<('paused' | 'playing')[]>(
    media.map(() => 'paused'),
  );

  const activeMediaPlayState = videoPlayStates[activeMediaIndex];

  const onPlayVideo = () => {
    setVideoPlayStates((state) => {
      const newState = [...state];
      newState[activeMediaIndex] = 'playing';
      return newState;
    });
  };

  const onPauseVideo = () => {
    setVideoPlayStates((state) => {
      const newState = [...state];
      newState[activeMediaIndex] = 'paused';
      return newState;
    });
  };

  const onNextMedia = () => {
    onPauseVideo();
    setActiveMediaIndex((state) => {
      if (state + 1 >= media.length) return 0;
      return state + 1;
    });
  };

  const onPreviousMedia = () => {
    onPauseVideo();
    setActiveMediaIndex((state) => {
      if (state - 1 < 0) return media.length - 1;
      return state - 1;
    });
  };

  const onChangeMedia = (index: number) => {
    onPauseVideo();
    setActiveMediaIndex(index);
  };

  return (
    <div className="aspect-sd relative Gallery">
      {media.length > 1 && (
        <button
          type="button"
          onClick={onPreviousMedia}
          className="absolute top-0 bottom-0 left-0 flex items-center justify-start pl-8 pr-32 z-20 group"
          aria-label="Previous Image"
        >
          <div className="h-9 w-9 text-white opacity-85 group-hover:opacity-100 transition-opacity filter drop-shadow-sm">
            <Ui.Icons.Previous />
          </div>
        </button>
      )}
      {media.length > 1 && (
        <button
          type="button"
          onClick={onNextMedia}
          className="absolute top-0 bottom-0 right-0 flex items-center justify-end pl-32 pr-8 z-20 group"
          aria-label="Next Image"
        >
          <div
            className="h-9 w-9 text-white opacity-85 group-hover:opacity-100 transition-opacity filter drop-shadow-sm"
            aria-label="Next Image"
          >
            <Ui.Icons.Next />
          </div>
        </button>
      )}
      {media.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-6 z-20 pointer-events-none">
          <div className="flex space-x-1">
            {media.map((media, index) => {
              return (
                <button
                  key={media._key}
                  type="button"
                  onClick={() => onChangeMedia(index)}
                  className="p-1 pointer-events-auto"
                  aria-label="Change Image"
                >
                  <div
                    className={Utils.cx([
                      'h-2.5 w-2.5 rounded-full transition-opacity hover:opacity-100 shadow-md bg-white',
                      {
                        'opacity-85': activeMediaIndex === index,
                        'opacity-50': activeMediaIndex !== index,
                      },
                    ])}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
      {media.map((media, index) => {
        return (
          <div
            key={media._key}
            className={Utils.cx([
              'absolute inset-0 transition-opacity duration-300',
              {
                'opacity-100 z-10': activeMediaIndex === index,
                'opacity-0 z-0': activeMediaIndex !== index,
              },
            ])}
          >
            <Ui.Media.Media
              videoOnPause={onPauseVideo}
              videoOnPlay={onPlayVideo}
              videoPlayState={activeMediaPlayState}
              media={media}
              fill
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
