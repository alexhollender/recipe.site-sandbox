import * as React from 'react';
import * as Utils from '@/lib/utils';
import * as Ui from '@/ui';

export const useSlider = (items: number) => {
  const [scrollAmount, setScrollAmount] = React.useState<number | undefined>(undefined);
  const [activeItemIndex, setActiveItemIndex] = React.useState<number>(0);
  const [isAtStart, setIsAtStart] = React.useState<boolean>(true);
  const [isAtEnd, setIsAtEnd] = React.useState<boolean>(false);
  const [hasOverflow, setHasOverflow] = React.useState<boolean | undefined>(undefined);
  const [videoPlayStates, setVideoPlayStates] = React.useState<('paused' | 'playing')[]>(
    Array(items).fill('paused'),
  );

  const sliderRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (!sliderRef.current) return;
      const sliderVisibleWidth: number = sliderRef.current.getBoundingClientRect().width;
      const totalScrollableWidth: number = sliderRef.current.scrollWidth;
      const itemWidth: number = sliderRef.current.children[0]?.getBoundingClientRect().width || 100;
      const visibleItems: number = Math.floor(sliderVisibleWidth / itemWidth);
      const scrollAmount: number = itemWidth * visibleItems;
      setScrollAmount(scrollAmount);
      setHasOverflow(totalScrollableWidth > sliderVisibleWidth);
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

  const onScroll = () => {
    if (!sliderRef.current || !scrollAmount) return;
    const distanceFromLeftEdge: number = sliderRef.current.scrollLeft;
    const containerWidth: number = sliderRef.current.clientWidth;
    const totalScrollableWidth: number = sliderRef.current.scrollWidth;
    const index: number = Math.round(distanceFromLeftEdge / scrollAmount);

    setIsAtStart(distanceFromLeftEdge === 0);
    setIsAtEnd(distanceFromLeftEdge + containerWidth >= totalScrollableWidth - 1);
    setActiveItemIndex(index);
  };

  const onPreviousItem = () => {
    if (!sliderRef.current || !scrollAmount) return;
    sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    onPauseVideo();
  };

  const onNextItem = () => {
    if (!sliderRef.current || !scrollAmount) return;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    onPauseVideo();
  };

  const onChangeItem = (index: number) => {
    if (!sliderRef.current || !scrollAmount) return;
    const scrollPosition: number = scrollAmount * index;
    sliderRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    onPauseVideo();
    setActiveItemIndex(index);
  };

  const onPlayVideo = () => {
    setVideoPlayStates((state) => {
      const newState = [...state];
      newState[activeItemIndex] = 'playing';
      return newState;
    });
  };

  const onPauseVideo = () => {
    setVideoPlayStates((state) => {
      const newState = [...state];
      newState[activeItemIndex] = 'paused';
      return newState;
    });
  };

  return {
    sliderRef,
    scrollAmount,
    activeItemIndex,
    isAtStart,
    isAtEnd,
    hasOverflow,
    videoPlayStates,
    onPlayVideo,
    onPauseVideo,
    onPreviousItem,
    onNextItem,
    onChangeItem,
    onScroll,
  };
};

type SliderControlsProps = {
  items: number;
  isAtStart: boolean;
  isAtEnd: boolean;
  activeItemIndex: number;
  hasOverflow?: boolean;
  heading?: string;
  onPreviousItem: () => void;
  onNextItem: () => void;
  onChangeItem: (index: number) => void;
};

const SliderControlsOverlay: React.FC<SliderControlsProps> = ({
  items,
  isAtStart,
  isAtEnd,
  activeItemIndex,
  onPreviousItem,
  onNextItem,
  onChangeItem,
}) => {
  return (
    <div className="absolute w-full h-full top-0 bottom-0 left-0">
      {items > 1 && !isAtStart && (
        <button
          type="button"
          onClick={onPreviousItem}
          className="hidden sm:flex absolute top-1/2 transform -translate-y-1/2 left-0 p-4 md:pl-6 md:pr-12 md:h-full z-20 items-center justify-start group"
          aria-label="Previous Image"
        >
          <div className="h-6 md:h-9 w-6 md:w-9 text-white opacity-85 group-hover:opacity-100 transition-opacity filter drop-shadow-sm">
            <Ui.Icons.Previous />
          </div>
        </button>
      )}
      {items > 1 && !isAtEnd && (
        <button
          type="button"
          onClick={onNextItem}
          className="hidden sm:flex absolute top-1/2 transform -translate-y-1/2 right-0 p-4 md:pr-6 md:pl-12 md:h-full z-20 items-center justify-end group"
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
      {items > 1 && (
        <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center z-20 pointer-events-none">
          <div className="flex">
            {Array.from({ length: items }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onChangeItem(index)}
                className="p-1 pointer-events-auto"
                aria-label="Change Image"
              >
                <div
                  className={Utils.cx([
                    'h-2 md:h-2.5 w-2 md:w-2.5 rounded-full transition-opacity hover:opacity-100 shadow-md bg-white',
                    {
                      'opacity-100': activeItemIndex === index,
                      'opacity-40': activeItemIndex !== index,
                    },
                  ])}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SliderControlsHeader: React.FC<SliderControlsProps> = ({
  isAtStart,
  isAtEnd,
  heading,
  hasOverflow,
  onPreviousItem,
  onNextItem,
}) => {
  return (
    <Ui.Container className="flex justify-between mb-3 items-center">
      <Ui.Text.Title as="h2" className="text-text">
        {heading}
      </Ui.Text.Title>
      {hasOverflow && (
        <div className="justify-between space-x-5 hidden md:flex">
          <button
            type="button"
            className="w-7 h-7 text-accent disabled:opacity-25 transition-opacity hover:opacity-60"
            onClick={onPreviousItem}
            disabled={isAtStart}
          >
            <Ui.Icons.Previous />
          </button>
          <button
            type="button"
            className="w-7 h-7 text-accent disabled:opacity-25 transition-opacity hover:opacity-60"
            onClick={onNextItem}
            disabled={isAtEnd}
          >
            <Ui.Icons.Next />
          </button>
        </div>
      )}
    </Ui.Container>
  );
};

type SliderProps = {
  items: number;
  controlType: string;
  heading?: string;
  wrapperClasses?: string;
  itemsContainerClasses?: string;
  children: (props: {
    onPauseVideo: () => void;
    onPlayVideo: () => void;
    videoPlayStates: ('paused' | 'playing')[];
  }) => React.ReactNode;
};

export const Slider: React.FC<SliderProps> = ({
  items,
  controlType,
  heading,
  wrapperClasses,
  itemsContainerClasses,
  children,
}) => {
  const slider = useSlider(items);

  return (
    <div className={`relative ${Utils.cx([wrapperClasses])}`}>
      {/* Controls - previous, next, progress indicators */}
      {controlType === 'overlay' && items > 1 && (
        <SliderControlsOverlay
          items={items}
          onPreviousItem={slider.onPreviousItem}
          onNextItem={slider.onNextItem}
          onChangeItem={slider.onChangeItem}
          isAtStart={slider.isAtStart}
          isAtEnd={slider.isAtEnd}
          activeItemIndex={slider.activeItemIndex}
        />
      )}
      {controlType === 'header' && (
        <>
          <div className="slider-gradient absolute top-0 bottom-0 left-0 bg-gradient-to-r from-background to-transparent w-16 z-10 transition-opacity pointer-events-none"></div>
          <div className="slider-gradient absolute top-0 bottom-0 right-0 bg-gradient-to-r from-transparent to-background w-16 z-10 transition-opacity pointer-events-none"></div>
          <SliderControlsHeader
            items={items}
            heading={heading}
            onPreviousItem={slider.onPreviousItem}
            onNextItem={slider.onNextItem}
            onChangeItem={slider.onChangeItem}
            isAtStart={slider.isAtStart}
            isAtEnd={slider.isAtEnd}
            activeItemIndex={slider.activeItemIndex}
            hasOverflow={slider.hasOverflow}
          />
        </>
      )}
      {/* Items container */}
      <div
        onScroll={slider.onScroll}
        ref={slider.sliderRef}
        className={Utils.cx([
          'flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory relative hide-scrollbar',
          itemsContainerClasses,
        ])}
      >
        {/* Items */}
        {children({
          onPauseVideo: slider.onPauseVideo,
          onPlayVideo: slider.onPlayVideo,
          videoPlayStates: slider.videoPlayStates,
        })}
      </div>
    </div>
  );
};
