import * as RecipeContext from '@/lib/recipeContext';
import * as SiteContext from '@/lib/siteContext';
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
        <IngredientUsageReference ingredientUsage={value.ingredientUsage}>
          {children}
        </IngredientUsageReference>
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

export const IngredientUsageReference: React.FC<
  React.PropsWithChildren<{ ingredientUsage: Types.IngredientUsage }>
> = ({ children, ingredientUsage }) => {
  const recipeContext = RecipeContext.useContext();

  return (
    <span>
      <Ui.Text.Body bold as="span">
        {children}
      </Ui.Text.Body>{' '}
      <Ui.Text.Body as="span" className="text-primary-tint">
        (<Ui.IngredientUsageAmount ingredientUsage={ingredientUsage} />)
      </Ui.Text.Body>
    </span>
  );
};

export const Styled: React.FC<RichtextProps> = ({ content }) => {
  return <PortableText value={content} components={RichtextComponents} />;
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
