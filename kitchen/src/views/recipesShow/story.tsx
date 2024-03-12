'use client';

import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

type StoryProps = {
  storyExcerpt: Types.PortableText;
  storyMore: Types.PortableText | null;
};

const Story: React.FC<StoryProps> = ({ storyExcerpt, storyMore }) => {
  const [showMore, setShowMore] = React.useState(false);

  const onShowMore = () => setShowMore(true);
  const onShowLess = () => setShowMore(false);

  return (
    <div>
      <div>
        <Ui.Richtext.Styled content={storyExcerpt} />
      </div>
      {storyMore && (
        <div className="mt-2">
          {showMore === false && (
            <button type="button" onClick={onShowMore}>
              <Ui.Text.Body bold className="pb-0.25 border-b border-primary border-dotted">
                Read more
              </Ui.Text.Body>
            </button>
          )}
          {showMore === true && (
            <div>
              <Ui.Richtext.Styled content={storyMore} />
              <div className="mt-2">
                <button type="button" onClick={onShowLess}>
                  <Ui.Text.Body bold className="pb-0.25 border-b border-primary border-dotted">
                    Read less
                  </Ui.Text.Body>
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
