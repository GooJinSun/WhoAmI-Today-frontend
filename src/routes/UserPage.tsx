import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from '@components/_common/divider/Divider.styled';
import { Loader } from '@components/_common/loader/Loader.styled';
import MainContainer from '@components/_common/main-container/MainContainer';
import ProfileImage from '@components/_common/profile-image/ProfileImage';
import TitleHeader from '@components/title-header/TitleHeader';
import FriendStatusButton from '@components/user-page/FriendStatusButton';
import UserMoreModal from '@components/user-page/UserMoreModal';
import { TITLE_HEADER_HEIGHT } from '@constants/layout';
import { Font, Layout, SvgIcon } from '@design-system';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { UserProfile } from '@models/user';
import { getUserProfile } from '@utils/apis/user';

function UserPage() {
  const { username } = useParams();
  const [user, setUser] = useState<UserProfile>();

  const [showMore, setShowMore] = useState(false);

  useAsyncEffect(async () => {
    if (!username) return;
    const res = await getUserProfile(username);
    setUser(res);
  }, []);

  const handleOnClickMore = () => {
    setShowMore(true);
  };

  return (
    <MainContainer>
      <TitleHeader
        title={username}
        RightComponent={
          <button type="button" onClick={handleOnClickMore}>
            {/* TODO: ... 아이콘으로 업데이트 필요 */}
            <SvgIcon name="top_navigation_hamburger" size={36} />
          </button>
        }
      />
      <UserMoreModal isVisible={showMore} setIsVisible={setShowMore} user={user} />
      {user ? (
        <Layout.FlexCol mt={TITLE_HEADER_HEIGHT + 14} w="100%" pl={18} pr={18}>
          <ProfileImage imageUrl={user.profile_image} username={user.username} size={100} />
          <Layout.FlexRow ml={10} mb={12}>
            <Font.Body type="20_semibold" mr={18}>
              {user.username}
            </Font.Body>
            <FriendStatusButton user={user} />
          </Layout.FlexRow>
          <Divider width={1} />
          {/* TODO: 오늘의 게시글 */}
        </Layout.FlexCol>
      ) : (
        <Layout.FlexRow w="100%">
          <Loader />
        </Layout.FlexRow>
      )}
    </MainContainer>
  );
}

export default UserPage;
