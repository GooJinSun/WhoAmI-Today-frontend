import React, { PropsWithChildren } from 'react';
import { ColorKeys } from '../colors';
import { Margin } from '../layouts';
import { BodySettings, DisplaySettings, TypoStyle } from './Font.constants';
import * as S from './Font.styled';
import { BodyType, DisplayType, Typo } from './Font.types';

/**
 * @deprecated use (default exported) Font
 */
const Display: React.FC<PropsWithChildren<DisplayProps>> = React.memo((props) => {
  const { type, children, ...textProps } = props;
  return (
    <S.Font {...DisplaySettings[type]} {...textProps}>
      {children}
    </S.Font>
  );
});

/**
 * @deprecated use (default exported) Font
 */
const Body: React.FC<PropsWithChildren<BodyProps>> = React.memo((props) => {
  const { type, children, ...textProps } = props;

  return (
    <S.Font {...BodySettings[type]} {...textProps}>
      {children}
    </S.Font>
  );
});

export default function Font({ type, children, ...props }: PropsWithChildren<FontProps>) {
  return (
    <S.StyledFont {...TypoStyle[type]} {...props}>
      {children}
    </S.StyledFont>
  );
}

export type TextPropsBase = {
  color?: ColorKeys;
  textAlign?: 'left' | 'center' | 'right';
  lineThrough?: boolean;
  underline?: boolean;
  numberOfLines?: number;
  pre?: boolean;
  italic?: boolean;
} & Margin;

export type FontProps = {
  type: Typo;
} & TextPropsBase;

/**
 * @deprecated use FontProps
 */
export type DisplayProps = {
  type: DisplayType;
} & TextPropsBase;

/**
 * @deprecated use FontProps
 */
export type BodyProps = {
  type: BodyType;
} & TextPropsBase;

/**
 * [Foundation] Font Display | Title | Body
 *
 * @prop {ColorKeys} color text color (default: 'GRAY_900')
 * @prop {string} type
 * @prop {'left' | 'center' | 'right'} textAlign (default: 'left')
 */

export { Body, Display };
