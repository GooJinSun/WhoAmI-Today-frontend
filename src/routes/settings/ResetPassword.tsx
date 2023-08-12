import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainContainer from '@components/_common/main-container/MainContainer';
import ValidatedPasswordInput from '@components/_common/validated-input/ValidatedPasswordInput';
import TitleHeader from '@components/title-header/TitleHeader';
import { TITLE_HEADER_HEIGHT } from '@constants/layout';
import { Button, Layout } from '@design-system';

function ResetPassword() {
  const [t] = useTranslation('translation', { keyPrefix: 'settings' });
  const [passwordInput, setPasswordInput] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const handleClickConfirm = () => {
    console.log('todo: reset password');
  };

  return (
    <MainContainer>
      <TitleHeader title={t('reset_password')} type="SUB" />
      <Layout.FlexCol mt={TITLE_HEADER_HEIGHT + 14} w="100%" gap={10} ph={24}>
        <ValidatedPasswordInput
          label={t('enter_your_new_password')}
          labelType="14_regular"
          name="password"
          value={passwordInput}
          onChange={handleChange}
        />
      </Layout.FlexCol>
      <Layout.Absolute w="100%" b="50px" ph={24} flexDirection="column">
        <Button.Large
          type="filled"
          status="normal"
          sizing="stretch"
          text={t('confirm')}
          onClick={handleClickConfirm}
        />
      </Layout.Absolute>
    </MainContainer>
  );
}

export default ResetPassword;
