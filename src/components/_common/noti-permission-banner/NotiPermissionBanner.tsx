import { Z_INDEX } from '@constants/layout';
import { Font } from '@design-system';
import useNotiPermission from '@hooks/useNotiPermission';
import { requestPermission } from '@utils/firebaseHelpers';
import * as S from './NotiPermissionBanner.styled';

function NotiPermissionBanner() {
  const { getBannerDescription, notiPermission, setNotiPermission } = useNotiPermission();

  const descriptions = getBannerDescription(notiPermission);

  const handleRequest = async () => {
    const permission = await requestPermission();
    setNotiPermission(permission);
  };

  if (notiPermission !== 'default' || descriptions.length === 0) return null;
  return (
    <S.Container
      justifyContent="center"
      bgColor="GRAY_10"
      h={NOTI_PERMISSION_BANNER_HEIGHT}
      w="100%"
      onClick={handleRequest}
      z={Z_INDEX.NOTI_PERMISSION_BANNER}
    >
      {descriptions.map((desc) => (
        <Font.Body type="14_regular" key={desc}>
          {desc}
        </Font.Body>
      ))}
    </S.Container>
  );
}

export const NOTI_PERMISSION_BANNER_HEIGHT = 50;

export default NotiPermissionBanner;
