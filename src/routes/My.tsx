import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Divider from '@components/_common/divider/Divider';
import Loader from '@components/_common/loader/Loader';
import NoContents from '@components/_common/no-contents/NoContents';
import NoteSection from '@components/note/note-section/NoteSection';
import Profile from '@components/profile/Profile';
import ReactionSection from '@components/reaction/reaction-section/ReactionSection';
import { DEFAULT_MARGIN } from '@constants/layout';
import { Layout, Typo } from '@design-system';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { FetchState } from '@models/api/common';
import { GetResponseHistoriesResponse } from '@models/api/question';
import { useBoundStore } from '@stores/useBoundStore';
import { getResponseHistories } from '@utils/apis/question';

function My() {
  const { myProfile } = useBoundStore((state) => ({ myProfile: state.myProfile }));
  const [t] = useTranslation('translation', { keyPrefix: 'no_contents' });

  const [responseHistory, setResponseHistory] = useState<FetchState<GetResponseHistoriesResponse>>({
    state: 'loading',
  });

  // TODO response 모두 가져올 수 있는 api 추가
  useAsyncEffect(async () => {
    getResponseHistories(1)
      .then((data) => {
        setResponseHistory({ state: 'hasValue', data });
      })
      .catch(() => {
        setResponseHistory({ state: 'hasError' });
      });
  }, []);

  return (
    <Layout.FlexCol w="100%" bgColor="WHITE">
      <Layout.FlexRow
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        ph={DEFAULT_MARGIN}
        pv={12}
      >
        <Profile user={myProfile} />
      </Layout.FlexRow>
      <Divider width={1} />
      <Layout.FlexCol pv={12} pl={12} w="100%">
        <NoteSection />
      </Layout.FlexCol>
      <Divider width={1} />
      {/* TODO Responses List 추가 */}
      <Layout.FlexCol pt={12} w="100%">
        <Typo type="title-large" mh={DEFAULT_MARGIN}>
          Responses
        </Typo>
        {responseHistory.state === 'loading' ? (
          <Loader />
        ) : responseHistory.state === 'hasError' ? (
          <NoContents text={t('response_detail')} />
        ) : (
          <Layout.FlexCol w="100%" gap={24} mt={64}>
            {responseHistory.data.response_set.map((response) => (
              <ReactionSection postType="response" postId={response.id} />
            ))}
          </Layout.FlexCol>
        )}
      </Layout.FlexCol>
    </Layout.FlexCol>
  );
}

export default My;
