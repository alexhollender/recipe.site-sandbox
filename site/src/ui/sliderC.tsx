import * as React from 'react';
import * as Types from '@/lib/types';
import * as Utils from '@/lib/utils';
import * as Ui from '@/ui';

export const useSlider = (media: Types.Media[]) => {
  const [sliderItemCount, setSliderItemCount] = React.useState<number | undefined>(undefined);
  const [scrollAmount, setScrollAmount] = React.useState<number | undefined>(undefined);
  const [activeMediaIndex, setActiveMediaIndex] = React.useState<number>(0);
  const [isAtStart, setIsAtStart] = React.useState<boolean>(true);
  const [isAtEnd, setIsAtEnd] = React.useState<boolean>(false);
  const [videoPlayStates, setVideoPlayStates] = React.useState<('paused' | 'playing')[]>(
    media.map(() => 'paused'),
  );

  const sliderRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!sliderRef.current) return;
    const itemCount: number = sliderRef.current.children.length;
    setSliderItemCount(itemCount);
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      if (!sliderRef.current) return;
      const sliderVisibleWidth: number = sliderRef.current.getBoundingClientRect().width;
      const itemWidth: number = sliderRef.current.children[0]?.getBoundingClientRect().width;
      const visibleItems: number = Math.floor(sliderVisibleWidth / itemWidth);
      const scrollAmount: number = itemWidth * visibleItems;
      setScrollAmount(scrollAmount);
    };

    const resizeObserver = new ResizeObserver(handleResize);

    const currentSlider = sliderRef.current;
    if (currentSlider) {
      resizeObserver.observe(currentSlider);
    }

    return () => {
      if (currentSlider) {
        resizeObserver.unobserve(currentSlider);
      }
    };
  }, []);

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

  const onPreviousMedia = () => {
    if (!sliderRef.current || !scrollAmount) return;
    sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    onPauseVideo();
  };

  const onNextMedia = () => {
    if (!sliderRef.current || !scrollAmount) return;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    onPauseVideo();
  };

  const onChangeMedia = (index: number) => {
    if (!sliderRef.current || !scrollAmount) return;
    const scrollPosition: number = scrollAmount * index;
    sliderRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    onPauseVideo();
    setActiveMediaIndex(index);
  };

  const onScroll = () => {
    if (!sliderRef.current || !sliderItemCount) return;
    const distanceFromLeftEdge: number = sliderRef.current.scrollLeft;
    const itemWidth = sliderRef.current.children[0]?.getBoundingClientRect().width;
    const index: number = Math.round(distanceFromLeftEdge / itemWidth);
    setIsAtStart(index === 0);
    setIsAtEnd(index === sliderItemCount - 1);
    setActiveMediaIndex(index);
  };

  return {
    sliderRef,
    sliderItemCount,
    scrollAmount,
    activeMediaIndex,
    isAtStart,
    isAtEnd,
    videoPlayStates,
    onPlayVideo,
    onPauseVideo,
    onPreviousMedia,
    onNextMedia,
    onChangeMedia,
    onScroll,
  };
};

type SliderControlsProps = {
  media: Types.Media[];
  onPreviousMedia: () => void;
  onNextMedia: () => void;
  onChangeMedia: (index: number) => void;
  isAtStart: boolean;
  isAtEnd: boolean;
  activeMediaIndex: number;
};

const SliderControls: React.FC<SliderControlsProps> = ({
  media,
  onPreviousMedia,
  onNextMedia,
  onChangeMedia,
  isAtStart,
  isAtEnd,
  activeMediaIndex,
}) => {
  return (
    <div className="absolute w-full h-full top-0 bottom-0 left-0">
      {media.length > 1 && !isAtStart && (
        <button
          type="button"
          onClick={onPreviousMedia}
          className="absolute top-1/2 transform -translate-y-1/2 left-0 p-4 md:pl-8 md:pr-16 md:h-full z-20 flex items-center justify-start group"
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
          className="absolute top-1/2 transform -translate-y-1/2 right-0 p-4 md:pr-8 md:pl-16 md:h-full z-20 flex items-center justify-end group"
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
  );
};

type SliderProps = {
  media: Types.Media[];
  className?: string;
  children: (props: {
    onPauseVideo: () => void;
    onPlayVideo: () => void;
    videoPlayStates: ('paused' | 'playing')[];
    activeMediaIndex: number;
  }) => React.ReactNode;
};

export const Slider: React.FC<SliderProps> = ({ media, className, children }) => {
  const slider = useSlider(media);

  return (
    <div className="aspect-sd relative Gallery">
      {/* Controls (previous, next, progress indicators) */}
      <SliderControls
        media={media}
        onPreviousMedia={slider.onPreviousMedia}
        onNextMedia={slider.onNextMedia}
        onChangeMedia={slider.onChangeMedia}
        isAtStart={slider.isAtStart}
        isAtEnd={slider.isAtEnd}
        activeMediaIndex={slider.activeMediaIndex}
      />
      {/* Items container */}
      <Ui.Slider.Container
        onScroll={slider.onScroll}
        ref={slider.sliderRef}
        className={Utils.cx(['hide-scrollbar', className])}
      >
        {/* Items */}
        {children({
          onPauseVideo: slider.onPauseVideo,
          onPlayVideo: slider.onPlayVideo,
          videoPlayStates: slider.videoPlayStates,
          activeMediaIndex: slider.activeMediaIndex,
        })}
      </Ui.Slider.Container>
    </div>
  );
};
