import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import MainContainer from '@components/_common/main-container/MainContainer';
import TitleHeader from '@components/title-header/TitleHeader';
import { TITLE_HEADER_HEIGHT } from '@constants/layout';
import { Layout } from '@design-system';

function SignUp() {
  const [t] = useTranslation('translation', { keyPrefix: 'sign_up' });

  const { pathname } = useLocation();

  const title = useMemo(() => {
    if (pathname.includes('research')) return t('research_participation_consent_form');
    if (pathname.includes('profile-image')) return t('add_a_profile_image');
    return t('create_an_account');
  }, [pathname, t]);

  return (
    <MainContainer>
      <TitleHeader title={title} />
      <Layout.FlexCol mt={TITLE_HEADER_HEIGHT + 80} w="100%" ph={24} alignItems="center">
        <Outlet />
      </Layout.FlexCol>
    </MainContainer>
  );
}

export default SignUp;
