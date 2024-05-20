'use client';

import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';
import * as Utils from '@/lib/utils';

type SliderBProps = {
  media: Types.Media[];
};

const SliderB: React.FC<SliderBProps> = ({ media }) => {
  const [activeMediaIndex, setActiveMediaIndex] = React.useState<number>(0);
  const [videoPlayStates, setVideoPlayStates] = React.useState<('paused' | 'playing')[]>(
    media.map(() => 'paused'),
  );
  const [sliderItemCount, setSliderItemCount] = React.useState<number | undefined>(undefined);
  const [scrollOffset, setScrollOffset] = React.useState<number | undefined>(undefined);
  const [isAtStart, setIsAtStart] = React.useState<boolean>(true);
  const [isAtEnd, setIsAtEnd] = React.useState<boolean>(false);

  const sliderRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!sliderRef.current) return;
    const itemCount: number = sliderRef.current.children.length;
    setSliderItemCount(itemCount);
  }, []);

  React.useEffect(() => {
    // on initial load, and whenever the container's size changes, calculate the scrollOffset
    const handleResize = () => {
      if (!sliderRef.current) return;
      const sliderVisibleWidth: number = sliderRef.current.getBoundingClientRect().width;
      const itemWidth: number = sliderRef.current.children[0]?.getBoundingClientRect().width;
      const visibleItems: number = Math.floor(sliderVisibleWidth / itemWidth);
      const scrollOffset: number = itemWidth * visibleItems;
      setScrollOffset(scrollOffset);
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (sliderRef.current) {
      resizeObserver.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) {
        resizeObserver.unobserve(sliderRef.current);
      }
    };
  }, []);

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
    if (!sliderRef.current || !scrollOffset) return;
    sliderRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    onPauseVideo();
  };

  const onPreviousMedia = () => {
    if (!sliderRef.current || !scrollOffset) return;
    sliderRef.current.scrollBy({ left: -scrollOffset, behavior: 'smooth' });
    onPauseVideo();
  };

  const onChangeMedia = (index: number) => {
    if (!sliderRef.current || !scrollOffset) return;
    const scrollPosition: number = scrollOffset * index;
    sliderRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    onPauseVideo();
    setActiveMediaIndex(index);
  };

  const onScroll = () => {
    // whenever the scroll position changes, calculate the index, i.e. which item is currently in view
    // (this also runs if the slider is not in the start position, and the container size changes, which is why we compute item width here, rather than storing it in a state variable)
    if (!sliderRef.current || !sliderItemCount) return;
    const distanceFromLeftEdge: number = sliderRef.current.scrollLeft;
    const itemWidth = sliderRef.current.children[0]?.getBoundingClientRect().width;
    const index: number = Math.round(distanceFromLeftEdge / itemWidth);
    setIsAtStart(index === 0);
    setIsAtEnd(index === sliderItemCount - 1);
    setActiveMediaIndex(index);
  };

  return (
    <div className="aspect-sd relative Gallery">
      <div className="absolute w-full h-full top-0 bottom-0 left-0">
        {media.length > 1 && !isAtStart && (
          <button
            type="button"
            onClick={onPreviousMedia}
            className="absolute top-0 bottom-0 left-4 md:left-0 flex items-center justify-start md:pl-8 md:pr-32 z-20 group"
            aria-label="Previous Image"
          >
            <div className="h-6 md:h-9 w-6 md:w-9 text-white opacity-85 group-hover:opacity-100 transition-opacity filter drop-shadow-sm">
              <Ui.Icons.Previous />
            </div>
          </button>
        )}
        {media.length > 1 && !isAtEnd && (
          <button
            type="button"
            onClick={onNextMedia}
            className="absolute top-0 bottom-0 right-4 md:right-0 flex items-center justify-end md:pl-32 md:pr-8 z-20 group"
            aria-label="Next Image"
          >
            <div
              className="h-6 md:h-9 w-6 md:w-9 text-white opacity-85 group-hover:opacity-100 transition-opacity filter drop-shadow-sm"
              aria-label="Next Image"
            >
              <Ui.Icons.Next />
            </div>
          </button>
        )}
        {media.length > 1 && (
          <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center z-20 pointer-events-none">
            <div className="flex">
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
                        'h-2 md:h-2.5 w-2 md:w-2.5 rounded-full transition-opacity hover:opacity-100 shadow-md bg-white',
                        {
                          'opacity-100': activeMediaIndex === index,
                          'opacity-40': activeMediaIndex !== index,
                        },
                      ])}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div
        onScroll={onScroll}
        ref={sliderRef}
        className="aspect-sd relative flex overflow-x-scroll snap-x snap-mandatory hide-scrollbar"
      >
        {media.map((media, index) => {
          return (
            <div key={media._key} className="aspect-sd relative snap-start">
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
    </div>
  );
};

export default SliderB;
