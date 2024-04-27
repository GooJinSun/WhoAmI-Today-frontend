import { useParams } from 'react-router-dom';
import MainContainer from '@components/_common/main-container/MainContainer';
import CommentInputBox from '@components/comment-list/comment-input-box/CommentInputBox';
import CommentItem from '@components/comment-list/comment-item/CommentItem';
import { responseList } from '@mock/responses';

function NoteDetail() {
  const { noteId } = useParams();

  const post = responseList[0];
  const comment = responseList[0].comments[0];

  return (
    <MainContainer>
      {/* TBU */}
      {noteId}

      <CommentItem
        comment={comment}
        onClickDeleteBtn={() => {
          //
        }}
      />
      <CommentInputBox postType="Response" post={post} />
      <CommentInputBox postType="Response" post={post} isReply />
      <CommentInputBox postType="Response" post={post} />
    </MainContainer>
  );
}

export default NoteDetail;
