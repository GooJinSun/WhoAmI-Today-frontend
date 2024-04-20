import styled, { keyframes } from 'styled-components';
import { MAX_WINDOW_WIDTH, Z_INDEX } from '@constants/layout';
import { Layout } from '@design-system';

export const Background = styled(Layout.Absolute)<{
  backgroundColor: string;
}>`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.backgroundColor};
  overflow: hidden;
  overscroll-behavior-y: none;
  z-index: ${Z_INDEX.MODAL_CONTAINER};
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const TopComponentContainer = styled(Layout.Absolute)<{
  visible: boolean;
}>`
  animation: ${(props) => (props.visible ? fadeIn : fadeOut)} 0.15s ease-in;
  transition: visibility 0.15s ease-in;
`;

export const Container = styled(Layout.Absolute)<{
  visible: boolean;
  height: number;
}>`
  box-shadow: ${(props) => (props.visible ? '0px -4px 44px rgba(0, 0, 0, 0.12)' : 'none')};
  border-radius: 17px 17px 0px 0px;
  width: 100%;
  left: 50%;
  height: ${(props) => props.height}px;
  bottom: ${(props) => -1 * props.height}px;
  transform: translateX(-50%) translateY(${(props) => (props.visible ? -props.height : 0)}px);
  transition: transform 0.3s ease-in;
  overflow: hidden;
  position: fixed;
  max-width: ${MAX_WINDOW_WIDTH}px;
  display: flex;
  flex-direction: column;
  z-index: ${Z_INDEX.MODAL_CONTAINER};
`;

export const Body = styled(Layout.LayoutBase)`
  overflow: auto;
  width: 100%;
  height: 100%;
`;
