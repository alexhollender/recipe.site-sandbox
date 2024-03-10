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

  return (
    <div>
      <div>
        <Ui.Richtext.Styled content={storyExcerpt} />
      </div>
      {storyMore && (
        <>
          {showMore === false && (
            <button type="button" onClick={onShowMore}>
              <Ui.Text.Body bold>Read more</Ui.Text.Body>
            </button>
          )}
          {showMore === true && (
            <div>
              <Ui.Richtext.Styled content={storyMore} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Story;
