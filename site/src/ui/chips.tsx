import * as React from 'react';
import * as Ui from '@/ui';

type ChipPrimaryProps = React.PropsWithChildren<{}>;

export const Primary: React.FC<ChipPrimaryProps> = (props) => {
  return (
    <div className="px-3 py-1 bg-primary rounded-full">
      <Ui.Text.Label>{props.children}</Ui.Text.Label>
    </div>
  );
};
