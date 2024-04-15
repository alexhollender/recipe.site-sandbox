import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

type OverviewProps = {
  globals: Types.Globals;
};

const Overview: React.FC<OverviewProps> = (props) => {
  return (
    <Ui.Site.Layout pathname="/">
      <Ui.Site.Container>
        <h1>Overview</h1>
        <p>{props.globals.site.title}</p>
      </Ui.Site.Container>
    </Ui.Site.Layout>
  );
};

export default Overview;
