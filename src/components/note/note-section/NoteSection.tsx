import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '@components/_common/loader/Loader';
import NoContents from '@components/_common/no-contents/NoContents';
import { Layout, Typo } from '@design-system';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { Note } from '@models/post';
import { getMyNotes } from '@utils/apis/my';
import { getUserNotes } from '../../../utils/apis/user';
import NoteItem from '../note-item/NoteItem';

type NoteSectionProps = {
  /** username이 있으면 username에 대한 response를, 없으면 내 response를 보여줍니다. */
  username?: string;
};

function NoteSection({ username }: NoteSectionProps) {
  const [t] = useTranslation('translation');

  const [noteList, setNoteList] = useState<Note[]>([]);
  const [nextPage, setNextPage] = useState<string | null | undefined>(undefined);

  const { isLoading, targetRef, setIsLoading } = useInfiniteScroll<HTMLDivElement>(async () => {
    if (nextPage === null) return setIsLoading(false);
    await fetchNotes(nextPage ?? null);
  });

  const fetchNotes = async (page: string | null) => {
    const { results, next } = username ? await getUserNotes(username) : await getMyNotes(page);
    if (!results) return;
    setNextPage(next);
    setNoteList([...noteList, ...results]);
    setIsLoading(false);
  };

  return (
    <>
      <Layout.FlexRow w="100%" justifyContent="space-between" alignItems="center">
        <Typo type="title-large" color="BLACK">
          {t('notes.title')}
        </Typo>
      </Layout.FlexRow>
      <Layout.FlexCol w="100%" pr={12}>
        <Layout.FlexCol gap={16} mt={10} h="100%">
          {noteList.length === 0 ? (
            <Layout.FlexRow alignItems="center" h="100%">
              <NoContents title={t('no_contents.notes')} />
            </Layout.FlexRow>
          ) : (
            noteList.map((note) => <NoteItem key={note.id} note={note} isMyPage={!username} />)
          )}
        </Layout.FlexCol>
        <div ref={targetRef} />
        {isLoading && (
          <Layout.FlexRow w="100%" h={40}>
            <Loader />
          </Layout.FlexRow>
        )}
      </Layout.FlexCol>
    </>
  );
}

export default NoteSection;
