import * as Types from '@/lib/types';

import { PortableText, PortableTextReactComponents } from '@portabletext/react';

import Link from 'next/link';

type RichtextProps = {
  content: Types.PortableText;
};

const RichtextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <p className="mb-12">{children}</p>,
    h1: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <p className="mt-12 mb-4">{children}</p>,
    h3: ({ children }) => <p className="mt-8 mb-4">{children}</p>,
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

const Richtext: React.FC<RichtextProps> = ({ content }) => {
  return <PortableText value={content} components={RichtextComponents} />;
};

export default Richtext;
