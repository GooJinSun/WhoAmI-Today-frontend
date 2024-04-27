import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAuthorProfileInfo } from '@components/_common/author-profile/AuthorProfile.helper';
import Icon from '@components/_common/icon/Icon';
import LikeButton from '@components/_common/like-button/LikeButton';
import ProfileImage from '@components/_common/profile-image/ProfileImage';
import { Layout, SvgIcon, Typo } from '@design-system';
import { Comment } from '@models/post';
import { User } from '@models/user';
import { useBoundStore } from '@stores/useBoundStore';
import { convertTimeDiffByString } from '@utils/timeHelpers';

interface CommentItemProps {
  comment: Comment;
  onClickReplyBtn?: () => void;
}

function CommentItem({ comment, onClickReplyBtn }: CommentItemProps) {
  const [t] = useTranslation('translation', { keyPrefix: 'comment' });
  const { author_detail, created_at, is_private } = comment;
  const { username, imageUrl } = getAuthorProfileInfo(author_detail);

  const [createdAt] = useState(() => new Date(created_at));
  const [currentDate] = useState(() => new Date());

  const isUserAuthor = useBoundStore((state) => state.isUserAuthor);
  const isCommentAuthor = isUserAuthor((author_detail as User).id);

  const toggleReplyInput = () => {
    onClickReplyBtn?.();
  };

  const handleClickMore = () => {
    // TBU
  };

  return (
    <Layout.FlexRow w="100%" justifyContent="space-between" alignItems="flex-start" gap={8}>
      {/* Author Profile */}
      <Layout.FlexCol w={30}>
        <ProfileImage imageUrl={imageUrl} size={30} />
      </Layout.FlexCol>
      {/* Author name, time, content */}
      <Layout.FlexCol flex={1} alignItems="center">
        <Layout.FlexCol w="100%" gap={4}>
          <Layout.FlexRow w="100%" alignItems="center">
            {is_private && <Icon name="private_comment_active" size={16} />}
            <Typo type="label-medium">{username}</Typo>
            <Layout.FlexRow ml={8}>
              <Typo type="label-small" color="MEDIUM_GRAY">
                {convertTimeDiffByString(currentDate, createdAt, 'yyyy.MM.dd HH:mm', true)}
              </Typo>
            </Layout.FlexRow>
          </Layout.FlexRow>
          {/* TODO: 줄바꿈 표시 */}
          <Typo pre type="body-medium">{`${comment.content}`}</Typo>
          {/* Reply & Message buttons */}
          <Layout.FlexRow w="100%" gap={7} alignItems="center">
            <button type="button" onClick={toggleReplyInput}>
              <Layout.FlexRow gap={4} alignItems="center">
                <SvgIcon name="comment_reply" size={24} />
                <Typo type="label-medium" color="DARK_GRAY">
                  {t('reply')}
                </Typo>
              </Layout.FlexRow>
            </button>
            <button type="button" onClick={toggleReplyInput}>
              <Layout.FlexRow gap={4} alignItems="center">
                <SvgIcon name="comment_message" size={24} />
                <Typo type="label-medium" color="DARK_GRAY">
                  {t('message')}
                </Typo>
              </Layout.FlexRow>
            </button>
          </Layout.FlexRow>
        </Layout.FlexCol>
      </Layout.FlexCol>
      {/* <Layout.FlexRow w="100%" gap={2}>
        {replies.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            onClickReplyBtn={toggleReplyInput}
            onClickDeleteBtn={onClickDeleteBtn}
          />
        ))}
      </Layout.FlexRow> */}
      {/* more button / like button */}
      <Layout.FlexCol w={24}>
        {isCommentAuthor ? (
          <Layout.FlexRow>
            <Icon name="dots_menu" size={24} onClick={handleClickMore} />
          </Layout.FlexRow>
        ) : (
          <LikeButton postType="Comment" post={comment} iconSize={15} />
        )}
      </Layout.FlexCol>
    </Layout.FlexRow>
  );
}

export default CommentItem;
