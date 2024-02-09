import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@components/_common/icon-button/IconButton';
import LikeButton from '@components/_common/like-button/LikeButton';
import { SCREEN_WIDTH } from '@constants/layout';
import { Font, Layout } from '@design-system';
import { Note } from '@models/note';
import { useBoundStore } from '@stores/useBoundStore';
import { convertTimeDiffByString } from '@utils/timeHelpers';
import { NEW_NOTE_BUTTON_WIDTH } from '../new-note-button/NewNoteButton';

interface NoteItemProps {
  note: Note;
}

function NoteItem({ note }: NoteItemProps) {
  const { content, created_at, id } = note;
  const navigate = useNavigate();

  const myProfile = useBoundStore((state) => state.myProfile);

  if (!myProfile) return null;

  const handleClickMore = (e: MouseEvent) => {
    e.stopPropagation();
    //
  };

  const handleClickNote = () => {
    return navigate(`/notes/${id}`);
  };

  const handleClickComment = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Layout.FlexCol
      w={NOTE_WIDTH}
      p={12}
      gap={8}
      outline="LIGHT"
      rounded={12}
      onClick={handleClickNote}
    >
      <Layout.FlexRow w="100%" justifyContent="space-between" alignItems="center">
        <Font.Body type="12_regular" color="MEDIUM_GRAY">
          {convertTimeDiffByString(new Date(), new Date(created_at))}
        </Font.Body>
        <IconButton name="dots_menu" onClick={handleClickMore} />
      </Layout.FlexRow>
      <Layout.FlexRow>
        <Font.Body type="16_regular" color="BLACK" numberOfLines={4}>
          {content}
        </Font.Body>
      </Layout.FlexRow>
      <Layout.FlexRow gap={12}>
        <LikeButton postType="Note" post={note} iconSize={24} m={0} />
        <IconButton name="comment" onClick={handleClickComment} />
      </Layout.FlexRow>
    </Layout.FlexCol>
  );
}

const NOTE_GAP = 16;
const NOTE_MARGIN = 12;
export const NOTE_WIDTH = SCREEN_WIDTH - NEW_NOTE_BUTTON_WIDTH - 4 * NOTE_MARGIN - NOTE_GAP * 2;

export default NoteItem;
