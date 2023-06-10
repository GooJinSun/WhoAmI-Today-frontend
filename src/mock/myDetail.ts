import { GetMomentResponse } from '@models/api/moment';

export const MOCK_MOMENT: GetMomentResponse = {
  id: 7,
  type: 'Moment',
  like_count: 0,
  current_user_liked: false,
  comments: [],
  description: '맛있는 감바스',
  mood: '🍤🧄🥖',
  photo: 'http://localhost:8000/media/moment/cherry-2023-05-20.png',
  date: '2023-05-20',
  created_at: '2023-06-03T14:40:11.939262+09:00',
};
