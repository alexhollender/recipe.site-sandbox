import * as React from 'react';
import * as Utils from '@/lib/utils';
import * as Ui from '@/ui';

export const useSlider = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [slidePositions, setSlidePositions] = React.useState<number[]>([]);

  const [scrollState, setScrollState] = React.useState<'start' | 'middle' | 'end'>('start');

  const sliderRef = React.useRef<HTMLDivElement>(null);

  const onChange = (index: number) => {
    if (sliderRef.current === null) return;
    const nextSlide = sliderRef.current.children[index];

    if (nextSlide === undefined) return;

    // @ts-ignore
    const leftPosition = nextSlide.offsetLeft;
    sliderRef.current.scrollTo({ left: leftPosition, behavior: 'smooth' });
  };

  const onNext = () => {
    if (activeIndex === slidePositions.length - 1) return;
    onChange(activeIndex + 1);
  };

  const onPrevious = () => {
    if (activeIndex === 0) return;
    onChange(activeIndex - 1);
  };

  const onScroll = () => {
    if (sliderRef.current === null) return;

    const scrollLeft = sliderRef.current.scrollLeft;
    const activeSlide = slidePositions.findIndex((end, i) => {
      const start = slidePositions[i - 1] || 0;
      return scrollLeft >= start && scrollLeft < end;
    });

    if (activeSlide >= 0 && activeSlide !== activeIndex) {
      setActiveIndex(activeSlide);
    }

    console.log('scrollLeft', scrollLeft);

    if (scrollLeft === 0) {
      setScrollState('start');
      return;
    }
    if (scrollLeft + sliderRef.current.offsetWidth === sliderRef.current.scrollWidth) {
      setScrollState('end');
      return;
    }

    setScrollState('middle');
  };

  const cacheSlidePositions = () => {
    if (sliderRef.current === null) return;

    const updatedSlidePositions = Array.from(sliderRef.current.children).map((child) => {
      // @ts-ignore
      return child.offsetLeft + child.offsetWidth;
    });

    setSlidePositions(updatedSlidePositions);
  };

  React.useEffect(() => {
    cacheSlidePositions();
    window.addEventListener('resize', cacheSlidePositions);

    return () => {
      window.removeEventListener('resize', cacheSlidePositions);
    };
  }, []);

  const isPreviousDisabled = () => scrollState === 'start';
  const isNextDisabled = () => scrollState === 'end';

  return {
    ref: sliderRef,
    onScroll,
    onNext,
    onPrevious,
    onChange,
    activeIndex,
    isPreviousDisabled: isPreviousDisabled(),
    isNextDisabled: isNextDisabled(),
  };
};

type ContainerProps = {
  className?: string;
  onScroll: () => void;
};

export const Container = React.forwardRef<HTMLDivElement, React.PropsWithChildren<ContainerProps>>(
  function Container(props, ref) {
    return (
      <div
        ref={ref}
        onScroll={props.onScroll}
        className={Utils.cx([
          'flex overflow-x-scroll snap-x snap-mandatory relative',
          props.className,
        ])}
      >
        {props.children}
      </div>
    );
  },
);

type SouffléProps = {
  onScroll: () => void;
};

export const Soufflé = React.forwardRef<HTMLDivElement, React.PropsWithChildren<SouffléProps>>(
  function Container(props, ref) {
    return (
      <Ui.SouffléContainer className="relative">
        <div className="slider-gradient absolute top-0 bottom-0 right-0 bg-gradient-to-l from-secondary w-16 z-10 transition-opacity"></div>
        <div className="slider-gradient absolute top-0 bottom-0 left-0 bg-gradient-to-r from-secondary w-16 z-10 transition-opacity"></div>
        <Ui.Slider.Container onScroll={props.onScroll} ref={ref} className="hide-scrollbar">
          {props.children}
        </Ui.Slider.Container>
      </Ui.SouffléContainer>
    );
  },
);
