'use client';

import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

type StoryProps = {
  storyExcerpt: Types.PortableText;
  storyMore: Types.PortableText | null;
};

const Story: React.FC<StoryProps> = ({ storyExcerpt, storyMore }) => {
  const [showMore, setShowMore] = React.useState<boolean>(false);

  const onShowMore = () => setShowMore(true);
  const onShowLess = () => setShowMore(false);

  return (
    <div>
      <div>
        <Ui.Richtext.Styled style="narrative" content={storyExcerpt} />
      </div>
      {storyMore && (
        <div className="mt-2">
          {showMore === false && (
            <button type="button" onClick={onShowMore}>
              <Ui.Text.Label
                bold
                className="pb-0.25 border-b border-text border-dotted hover:opacity-60 transition-opacity"
              >
                Read more
              </Ui.Text.Label>
            </button>
          )}
          {showMore === true && (
            <div>
              <Ui.Richtext.Styled style="narrative" content={storyMore} />
              <div className="mt-2">
                <button type="button" onClick={onShowLess}>
                  <Ui.Text.Label
                    bold
                    className="pb-0.25 border-b border-text border-dotted hover:opacity-60 transition-opacity"
                  >
                    Read less
                  </Ui.Text.Label>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Story;
