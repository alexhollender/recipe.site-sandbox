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
  family: string;
  size: string;
  baseWeight: string;
  boldWeight: string;
};

const TextStyle = ({ bold, ...props }: TextProps, style: TextStyle) => {
  return (
    <Base
      defaultClasses={`${style.family} ${style.size} ${bold ? style.boldWeight : style.baseWeight}`}
      {...props}
    />
  );
};

export const Lead: TextComponent = (props) =>
  TextStyle(props, {
    family: 'font-interface',
    size: 'text-3xl',
    baseWeight: 'font-bold',
    boldWeight: 'font-heavy',
  });

export const Title: TextComponent = (props) =>
  TextStyle(props, {
    family: 'font-interface',
    size: 'text-2xl',
    baseWeight: 'font-normal',
    boldWeight: 'font-bold',
  });

export const Highlight: TextComponent = (props) =>
  TextStyle(props, {
    family: 'font-interface',
    size: 'text-lg',
    baseWeight: 'font-normal',
    boldWeight: 'font-bold',
  });

export const Tagline: TextComponent = (props) =>
  TextStyle(props, {
    family: 'font-narrative',
    size: 'text-xl',
    baseWeight: 'font-normal',
    boldWeight: 'font-bold',
  });

export const Label: TextComponent = (props) =>
  TextStyle(props, {
    family: 'font-interface',
    size: 'text-base',
    baseWeight: 'font-normal',
    boldWeight: 'font-bold',
  });

export const Body: TextComponent = (props) =>
  TextStyle(props, {
    family: 'font-narrative',
    size: 'text-base',
    baseWeight: 'font-normal',
    boldWeight: 'font-bold',
  });

export const Detail: TextComponent = (props) =>
  TextStyle(props, {
    family: 'font-interface',
    size: 'text-xs',
    baseWeight: 'font-bold',
    boldWeight: 'font-heavy',
  });
