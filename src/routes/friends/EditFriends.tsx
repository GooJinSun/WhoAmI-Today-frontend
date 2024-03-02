import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '@components/_common/icon/Icon';
import { Loader } from '@components/_common/loader/Loader.styled';
import ProfileImage from '@components/_common/profile-image/ProfileImage';
import { UpdatedFriendItemWrapper } from '@components/friends/updated-friend-item/UpdatedFriendItem.styled';
import SubHeader from '@components/sub-header/SubHeader';
import { BOTTOM_TABBAR_HEIGHT } from '@constants/layout';
import { Layout, Typo } from '@design-system';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { FetchState } from '@models/api/common';
import { UpdatedProfile } from '@models/api/friends';
import { getAllFriends } from '@utils/apis/friends';

function EditFriends() {
  const [t] = useTranslation('translation', { keyPrefix: 'friends.edit_friends' });

  const [allFriends, setAllFriends] = useState<FetchState<UpdatedProfile[]>>({ state: 'loading' });

  const fetchAllTypeFriends = async () => {
    getAllFriends({ filterHidden: false }).then((results) => {
      setAllFriends({ state: 'hasValue', data: results });
    });
  };

  useAsyncEffect(fetchAllTypeFriends);

  const handleClickSave = () => {
    // TODO
  };

  const handleToggleFavorite = () => {
    // TODO
  };

  const handleToggleHide = () => {
    // TODO
  };

  const handleClickDelete = () => {
    // TODO
  };

  return (
    <>
      <SubHeader
        title={t('title')}
        RightComponent={
          <button type="button" onClick={handleClickSave}>
            <Typo type="title-large" color="PRIMARY">
              {t('save')}
            </Typo>
          </button>
        }
      />
      <Layout.FlexCol
        w="100%"
        h="100vh"
        justifyContent="flex-start"
        bgColor="WHITE"
        pv={12}
        mb={BOTTOM_TABBAR_HEIGHT + 10}
      >
        {allFriends.state === 'loading' && <Loader />}
        {allFriends.state === 'hasValue' &&
          allFriends.data.map(({ username, profile_image, is_hidden, is_favorite }) => (
            <UpdatedFriendItemWrapper key={username}>
              <Layout.FlexRow gap={8}>
                {is_hidden ? (
                  <Icon name="star_outline" size={20} padding={12} color="MEDIUM_GRAY" disabled />
                ) : (
                  <Icon
                    name={is_favorite ? 'star' : 'star_outline'}
                    size={20}
                    padding={12}
                    color="NO_STATUS_CHIP"
                    onClick={handleToggleFavorite}
                  />
                )}
                <Layout.FlexRow gap={8} alignItems="center">
                  <ProfileImage imageUrl={profile_image} username={username} size={44} />
                  <Typo type="title-small">{username}</Typo>
                </Layout.FlexRow>
              </Layout.FlexRow>
              <Layout.FlexRow>
                <Icon
                  name={is_hidden ? 'hide_true' : 'hide_false'}
                  size={44}
                  onClick={handleToggleHide}
                />
                <Icon name="close" size={16} padding={14} onClick={handleClickDelete} />
              </Layout.FlexRow>
            </UpdatedFriendItemWrapper>
          ))}
      </Layout.FlexCol>
    </>
  );
}

export default EditFriends;
