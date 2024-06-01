import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Layout, Typo } from '@design-system';
import { NewNoteForm } from '@models/post';
import { postNote } from '@utils/apis/note';
import { NewNoteHeaderWrapper } from './NewNoteHeader.styled';

interface NewNoteHeaderProps {
  title: string;
  noteInfo: NewNoteForm;
}

function NewNoteHeader({ title, noteInfo }: NewNoteHeaderProps) {
  const navigate = useNavigate();

  const cancelPost = () => {
    navigate('/my');
  };

  // TODO: 게시물 업로드 toast message 추가
  const confirmPost = () => {
    navigate('/my');
    postNote(noteInfo);
  };

  const canPost = !!noteInfo.content;

  const [t] = useTranslation('translation', { keyPrefix: 'notes' });
  return (
    <NewNoteHeaderWrapper>
      <Layout.FlexRow justifyContent="space-between" w="100%" h="100%" alignItems="center">
        <Layout.FlexRow gap={8} alignItems="center" onClick={cancelPost}>
          <Typo type="title-large" color="BLACK">
            {t('cancel')}
          </Typo>
        </Layout.FlexRow>
        <Layout.FlexRow>
          <Typo type="head-line">{title}</Typo>
        </Layout.FlexRow>
        <Layout.FlexRow gap={8} alignItems="center">
          <button type="button" disabled={!canPost} onClick={confirmPost}>
            <Typo type="title-large" color={canPost ? 'PRIMARY' : 'MEDIUM_GRAY'}>
              {t('post')}
            </Typo>
          </button>
        </Layout.FlexRow>
      </Layout.FlexRow>
    </NewNoteHeaderWrapper>
  );
}

export default NewNoteHeader;
