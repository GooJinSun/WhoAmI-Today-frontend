import { Moment } from '@models/moment';
import { Comment } from '@models/post';

// GET today's moment
export interface GetMomentResponse extends Moment {
  id: number;
  type: 'Moment';
  like_count: number;
  current_user_liked: boolean;
  date: string;
  created_at: string;
  comments: Comment[];
}
