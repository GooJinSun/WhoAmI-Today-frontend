import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Font, Layout, SvgIcon } from '@design-system';
import { usePostAppMessage } from '@hooks/useAppMessage';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { TodayMoment } from '@models/moment';
import { BoundState, useBoundStore } from '@stores/useBoundStore';
import { IconWrapper } from './TodaysMoments.styled';

const momentSelector = (state: BoundState) => ({
  todayMoment: state.todayMoment,
  fetchTodayMoment: state.fetchTodayMoment,
});

function TodaysMoments() {
  const [t] = useTranslation('translation', { keyPrefix: 'home.moment' });
  const { fetchTodayMoment } = useBoundStore(momentSelector);

  useAsyncEffect(async () => {
    await fetchTodayMoment();
  }, []);

  return (
    <Layout.FlexCol w="100%" bgColor="BACKGROUND_COLOR" ph="default" pt={22} pb={43}>
      {/* 타이틀 */}
      <Layout.FlexRow w="100%" justifyContent="center" alignItems="center">
        <Font.Display type="18_bold">{t('todays_moments')}</Font.Display>
      </Layout.FlexRow>
      {/* 컨텐츠 */}
      <IconWrapper w="100%" justifyContent="center" mt={32}>
        {/* TODO photo의 경우 데스크톱에서 disable 처리 */}
        <MomentIcon name="photo" />
        <MomentIcon name="mood" />
        <MomentIcon name="description" />
      </IconWrapper>
    </Layout.FlexCol>
  );
}

function MomentIcon({ name }: { name: keyof TodayMoment }) {
  const { todayMoment } = useBoundStore(momentSelector);
  const navigate = useNavigate();
  const postMessage = usePostAppMessage();

  const handleClickUploadMoment = () => {
    if (todayMoment[name]) return;
    // 사진 업로드의 경우 앱 화면으로 이동
    if (name === 'photo') {
      // 사진 업로드의 경우 앱 화면으로 이동
      if (!window?.ReactNativeWebView) return;
      postMessage('NAVIGATE', {
        screenName: 'MomentPhotoUploadScreen',
        params: {
          state: todayMoment,
        },
      });
    } else {
      navigate('/moment-upload', { state: name });
    }
  };

  return (
    <button type="button" onClick={handleClickUploadMoment} disabled={!!todayMoment[name]}>
      <SvgIcon
        name={todayMoment[name] ? `moment_${name}_disabled` : `moment_${name}_normal`}
        size={46}
      />
    </button>
  );
}

export default TodaysMoments;
