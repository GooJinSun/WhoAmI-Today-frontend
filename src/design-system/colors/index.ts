// 추후에 color 코드 확정되면 여기에 추가
export const Colors = {
  BASIC_BLACK: '#000000',
  BASIC_WHITE: '#FFFFFF',

  BASIC_DISABLED_SOFT: '#EEEEEE',
  BASIC_DISABLED_DEEP: '#DDDDDD',

  SYSTEM_ERROR: '#BF0000',
  SYSTEM_SUCCESS: '#1FB881',

  GRAY_1: '#D6D6D6',

  TRANSPARENT: 'transparent',
  DIM: '#000000b3',
};

export type ColorType = typeof Colors;
export type ColorKeys = keyof ColorType;
