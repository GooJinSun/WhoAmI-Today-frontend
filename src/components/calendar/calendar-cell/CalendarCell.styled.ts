import styled, { css } from 'styled-components';

const CommonCalendarCell = styled.td`
  border: 6px solid ${({ theme }) => theme.BACKGROUND_COLOR};
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;

  &::before {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border-radius: 5px;
    content: '';
  }

  &::after {
    display: block;
    padding-bottom: 100%;
    border-radius: 5px;
    content: '';
  }
`;

interface DateCellProps {
  url?: string | null;
  isSelected?: boolean;
}

export const DateCell = styled(CommonCalendarCell)<DateCellProps>`
  ${({ url }) =>
    url
      ? css`
          &::after {
            background-image: url(${url});
            background-size: cover;
            background-position: center;
          }

          &::before {
            background-color: rgba(0, 0, 0, 0.4);
          }
        `
      : ''}

  ${({ isSelected }) =>
    isSelected
      ? css`
          &::before {
            box-shadow: 0 0 0 3px ${({ theme }) => theme.CALENDAR_TODAY} inset;
          }
        `
      : ''}

  .mood {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  > span {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    margin-bottom: 4px;
  }
`;

export const EmptyCell = styled(CommonCalendarCell)`
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR};
  visibility: hidden;
`;
