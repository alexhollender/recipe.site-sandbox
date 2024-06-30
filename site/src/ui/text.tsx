import { FC, PropsWithChildren, createElement, ReactHTML } from 'react';

import * as Utils from '@/lib/utils';

type TextProps = {
  bold?: boolean;
  className?: string;
  as?: keyof ReactHTML;
  [x: string]: unknown;
};

type TextComponent = FC<PropsWithChildren<TextProps>>;

const baseClasses = 'text-current';

const Base: FC<PropsWithChildren<TextProps & { defaultClasses: string }>> = ({
  as = 'p',
  children,
  className,
  defaultClasses,
  ...props
}) => {
  return createElement(
    as,
    {
      className: Utils.cx([baseClasses, defaultClasses, className]),
      ...props,
    },
    children,
  );
};

type TextStyle = {
  baseWeight: string;
  boldWeight: string;
};

const TextStyle = ({ bold, ...props }: TextProps, style: TextStyle) => {
  return <Base defaultClasses={`${bold ? style.boldWeight : style.baseWeight}`} {...props} />;
};

export const Lead: TextComponent = (props) =>
  TextStyle(props, {
    baseWeight: 'type-lead',
    boldWeight: 'type-lead-bold',
  });

export const Title: TextComponent = (props) =>
  TextStyle(props, {
    baseWeight: 'type-title',
    boldWeight: 'type-title-bold',
  });

export const Highlight: TextComponent = (props) =>
  TextStyle(props, {
    baseWeight: 'type-highlight',
    boldWeight: 'type-highlight-bold',
  });

export const Body: TextComponent = (props) =>
  TextStyle(props, {
    baseWeight: 'type-body',
    boldWeight: 'type-body-bold',
  });

export const Label: TextComponent = (props) =>
  TextStyle(props, {
    baseWeight: 'type-label',
    boldWeight: 'type-label-bold',
  });

// export const BodySmall: TextComponent = (props) =>
//   TextStyle(props, {
//     baseWeight: 'type-body',
//     boldWeight: 'type-body-bold',
//   });

// export const Detail: TextComponent = (props) =>
//   TextStyle(props, {
//     baseWeight: 'type-detail',
//     boldWeight: 'type-detail-bold',
//   });
