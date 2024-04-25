import * as RecipeContext from '@/lib/recipeContext';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';
import * as Utils from '@/lib/utils';

import { PortableText, PortableTextReactComponents } from '@portabletext/react';

import Link from 'next/link';

type RichtextProps = {
  content: Types.PortableText;
};

const RichtextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => (
      <Ui.Text.Lead bold className="pt-2">
        {children}
      </Ui.Text.Lead>
    ),
    h2: ({ children }) => (
      <Ui.Text.Title bold className="pt-1">
        {children}
      </Ui.Text.Title>
    ),
    h3: ({ children }) => (
      <Ui.Text.Highlight bold className="pt-0.5">
        {children}
      </Ui.Text.Highlight>
    ),
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
    measurement: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value?: {
        unit: Types.Unit;
        quantity: number;
      };
    }) => {
      if (!value) return <span>{children}</span>;
      return <Ui.Measurement unit={value.unit} quantity={value.quantity} />;
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
  return (
    <span>
      <Ui.Text.Label bold as="span">
        {children}
      </Ui.Text.Label>
      {/* Only render this part if there is a quantity or unit */}
      {(ingredientUsage.quantityMin || ingredientUsage.unit) && (
        <>
          {' '}
          <Ui.IngredientUsageAmount
            ingredientUsage={ingredientUsage}
            onRender={({ quantity, unit }) => {
              return (
                <Ui.Text.Label as="span" className="text-subdued">
                  ({quantity && <span>{quantity}</span>}
                  {unit && <span>{unit}</span>})
                </Ui.Text.Label>
              );
            }}
          />
        </>
      )}
    </span>
  );
};

type StyledRichtextProps = RichtextProps & {
  style: 'narrative' | 'interface';
};

export const Styled: React.FC<StyledRichtextProps> = ({ content, style }) => {
  return (
    <div
      className={Utils.cx([
        'space-y-3',
        {
          'type-tagline': style === 'narrative',
          'type-label': style === 'interface',
        },
      ])}
    >
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
