import React from 'react';

import * as SanityIcons from '@sanity/icons';
import * as Sanity from 'sanity';
import * as Ui from '@sanity/ui';

import get from 'lodash.get';

type ProxyStringProps = Sanity.StringInputProps<
  Sanity.StringSchemaType & { options?: { field?: string } }
>;

export const ProxyStringInput = (props: ProxyStringProps) => {
  const { schemaType } = props;

  const path = schemaType?.options?.field;
  const doc = Sanity.useFormValue(['ingredient']) as Sanity.SanityDocument;
  console.log('doc', doc);

  return (
    <Ui.Tooltip
      content={
        <Ui.Box padding={2}>
          <Ui.Text muted size={1}>
            This value is set in Shopify (<code>{path}</code>)
          </Ui.Text>
        </Ui.Box>
      }
      portal
    >
      <Ui.TextInput iconRight={SanityIcons.LockIcon} readOnly={true} value={'magnesium'} />
    </Ui.Tooltip>
  );
};
