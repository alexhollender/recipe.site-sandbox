import * as Types from '@/lib/types';
import * as Ui from '@/ui';

import { PortableText, PortableTextReactComponents } from '@portabletext/react';

import Link from 'next/link';

type RichtextProps = {
  content: Types.PortableText;
};

const RichtextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <Ui.Text.Body>{children}</Ui.Text.Body>,
    h1: ({ children }) => <Ui.Text.Body>{children}</Ui.Text.Body>,
    h2: ({ children }) => <Ui.Text.Body>{children}</Ui.Text.Body>,
    h3: ({ children }) => <Ui.Text.Body>{children}</Ui.Text.Body>,
  },
  marks: {
    em: ({ children }) => <em className="italic font-normal">{children}</em>,
    ingredientUsageReference: ({ children, value }) => {
      return (
        <span>
          {children} ({value.ingredientUsage.ingredient.title} @ {value.ingredientUsage.quantityMin}{' '}
          {value.ingredientUsage.unit
            ? value.ingredientUsage.unit.abbreviation || value.ingredientUsage.unit.title
            : ''}
          )
        </span>
      );
    },
    measurement: ({ children, value }) => {
      return <span>MEASUREMENT</span>;
    },
    link: ({ children, value }) => {
      return (
        <Link
          href={value.href}
          className="underline decoration-dashed hover:opacity-50 transition-opacity"
        >
          {children}
        </Link>
      );
    },
  },
};

export const Styled: React.FC<RichtextProps> = ({ content }) => {
  return (
    <div className="space-y-4">
      <PortableText value={content} components={RichtextComponents} />
    </div>
  );
};

export const Inherited: React.FC<RichtextProps> = ({ content }) => {
  return (
    <PortableText
      value={content}
      components={{
        block: {
          normal: ({ children }) => <span>{children}</span>,
        },
        marks: {
          em: ({ children }) => <em className="italic">{children}</em>,
          strong: ({ children }) => <strong className="font-heavy">{children}</strong>,
        },
      }}
    />
  );
};
