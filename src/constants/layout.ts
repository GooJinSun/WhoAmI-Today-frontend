const MAX_WINDOW_WIDTH = 500;
const BOTTOM_TABBAR_HEIGHT = 80;
const TOP_NAVIGATION_HEIGHT = 84;
const DEFAULT_MARGIN = 24;
const SCREEN_WIDTH = typeof window !== 'undefined' ? Math.min(window.innerWidth, 500) : 0;
const SCREEN_HEIGHT = typeof window !== 'undefined' ? window.innerHeight : 0;
const TITLE_HEADER_HEIGHT = 56;

const Z_INDEX = {
  TITLE_HEADER: 100,
  FRIEND_FEED_FRIEND_LIST: 10,
};

export {
  BOTTOM_TABBAR_HEIGHT,
  DEFAULT_MARGIN,
  MAX_WINDOW_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  TITLE_HEADER_HEIGHT,
  TOP_NAVIGATION_HEIGHT,
  Z_INDEX,
};
