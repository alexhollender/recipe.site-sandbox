import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

type ThemeProps = {
  globals: Types.Globals;
};

const Theme: React.FC<ThemeProps> = (props) => {
  return (
    <Ui.Site.Layout pathname="/theme">
      <Ui.Site.Container>
        <h1>Theme</h1>
      </Ui.Site.Container>
    </Ui.Site.Layout>
  );
};

export default Theme;
