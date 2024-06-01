import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import BottomModal from '@components/_common/bottom-modal/BottomModal';
import Divider from '@components/_common/divider/Divider';
import Icon from '@components/_common/icon/Icon';
import Loader from '@components/_common/loader/Loader';
import CommentInputBox from '@components/comment-list/comment-input-box/CommentInputBox';
import CommentItem from '@components/comment-list/comment-item/CommentItem';
import { getCommentList } from '@components/comment-list/CommentList.helper';
import { Layout, Typo } from '@design-system';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { Comment, Note, Response } from '@models/post';
import {
  CommentBottomContentWrapper,
  CommentBottomFooterWrapper,
  CommentBottomHeaderWrapper,
} from './CommentBottomSheet.styled';

interface Props {
  postType: 'Response' | 'Note';
  post: Response | Note;
  visible: boolean;
  closeBottomSheet: () => void;
}

function CommentBottomSheet({ postType, post, visible, closeBottomSheet }: Props) {
  const [t] = useTranslation('translation', { keyPrefix: 'comment' });

  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null | undefined>(undefined);

  const [commentTo, setCommentTo] = useState<Response | Note | Comment>(post);
  const [commentToType, setCommentToType] = useState<'Response' | 'Note' | 'Comment'>(postType);

  const { isLoading, targetRef, setIsLoading } = useInfiniteScroll<HTMLDivElement>(async () => {
    if (nextPage === null) return setIsLoading(false);
    await fetchComments(nextPage ?? null, false);
  });

  const fetchComments = async (page: string | null, update: boolean) => {
    const { results, next } = await getCommentList(postType, post.id, page);
    if (!results) return;
    setNextPage(next);
    if (update) setComments(results);
    else setComments([...comments, ...results]);
    setIsLoading(false);
  };

  const handleClick = () => {
    closeBottomSheet();
  };

  return createPortal(
    <BottomModal visible={visible} onClose={closeBottomSheet} h={650} maxHeight={650}>
      <CommentBottomHeaderWrapper>
        <Layout.FlexRow w="100%" justifyContent="center">
          <Icon name="home_indicator" />
        </Layout.FlexRow>
        <Layout.FlexRow w="100%" h="100%">
          <Layout.FlexRow onClick={handleClick} pl={20}>
            <Typo type="title-large">{t('cancel')}</Typo>
          </Layout.FlexRow>
          <Layout.FlexRow
            style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
          >
            <Typo type="title-large">{t('comment')}</Typo>
          </Layout.FlexRow>
        </Layout.FlexRow>
        <Layout.FlexCol gap={12} pt={12} w="100%">
          <Divider width={1} />
        </Layout.FlexCol>
      </CommentBottomHeaderWrapper>

      <CommentBottomContentWrapper>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onClickReplyBtn={() => {
              setReplyTo(comment);
              setIsPrivate(comment.is_private);
              setCommentTo(comment);
              setCommentToType('Comment');
            }}
          />
        ))}
      </CommentBottomContentWrapper>

      <CommentBottomFooterWrapper>
        <CommentInputBox
          post={commentTo}
          postType={commentToType}
          isPrivate={isPrivate}
          setIsPrivate={() => {
            setIsPrivate((prev) => !prev);
          }}
          isReply={!!replyTo}
          replyTo={replyTo}
          resetReplyTo={() => {
            setReplyTo(null);
          }}
          resetCommentTo={() => {
            setCommentTo(post);
          }}
          resetCommentType={() => {
            setCommentToType(postType);
          }}
          reloadComments={() => fetchComments(null, true)}
        />
      </CommentBottomFooterWrapper>
      <div ref={targetRef} />
      {isLoading && (
        <Layout.FlexRow w="100%" h={40}>
          <Loader />
        </Layout.FlexRow>
      )}
    </BottomModal>,
    document.getElementById('root-container') || document.body,
  );
}

export default CommentBottomSheet;
