import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Collapse from '@components/_common/\bcollapse/Collapse';
import { Divider } from '@components/_common/divider/Divider.styled';
import Icon from '@components/_common/icon/Icon';
import { Loader } from '@components/_common/loader/Loader.styled';
import UpdatedProfileItem from '@components/_common/profile-image/UpdatedProfileItem';
import { SwipeLayoutList } from '@components/_common/swipe-layout/SwipeLayoutList';
import { StyledFriendListWrapper } from '@components/friends/friend-list/FriendProfile.styled';
import UpdatedFriendItem from '@components/friends/updated-friend-item/UpdatedFriendItem';
import { Button, Layout, SvgIcon, Typo } from '@design-system';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { FetchState } from '@models/api/common';
import { UpdatedProfile } from '@models/api/friends';
import { getFavoriteFriends, getUpdatedProfiles } from '@utils/apis/friends';
import { getFriendRequests } from '@utils/apis/user';
import useInfiniteFetchFriends from '../../hooks/useInfiniteFetchFriends';

function Friends() {
  const [t] = useTranslation('translation', { keyPrefix: 'friends' });

  const [updatedProfiles, setUpdatedProfiles] = useState<FetchState<UpdatedProfile[]>>({
    state: 'loading',
  });
  const [friendRequests, setFriendRequests] = useState<FetchState<number>>({ state: 'loading' });
  const {
    isLoadingMoreAllFriends,
    allFriends,
    fetchAllFriends,
    replaceFriendOnUpdateFavorite,
    targetRef,
  } = useInfiniteFetchFriends({ filterHidden: true });
  const [favoriteFriends, setFavoriteFriends] = useState<FetchState<UpdatedProfile[]>>({
    state: 'loading',
  });

  const fetchAllTypeFriends = async () => {
    getUpdatedProfiles()
      .then((results) => {
        setUpdatedProfiles({ state: 'hasValue', data: results });
      })
      .catch(() => setUpdatedProfiles({ state: 'hasError' }));
    fetchAllFriends();
    getFavoriteFriends()
      .then((results) => {
        setFavoriteFriends({ state: 'hasValue', data: results });
      })
      .catch(() => setFavoriteFriends({ state: 'hasError' }));
  };

  useAsyncEffect(async () => {
    fetchAllTypeFriends();
    getFriendRequests()
      .then(({ count }) => {
        setFriendRequests({ state: 'hasValue', data: count });
      })
      .catch(() => setFriendRequests({ state: 'hasError' }));
  }, []);

  const navigate = useNavigate();
  const handleClickEditFriends = () => {
    navigate('edit');
  };

  const updateFavoriteCallback = (friendProfile: UpdatedProfile) => () => {
    getFavoriteFriends().then((results) => {
      setFavoriteFriends({ state: 'hasValue', data: results });

      const updatedTargetProfile = results.find((profile) => profile.id === friendProfile.id);
      replaceFriendOnUpdateFavorite(updatedTargetProfile, friendProfile);
    });
  };

  if (
    updatedProfiles.state === 'loading' ||
    friendRequests.state === 'loading' ||
    allFriends.state === 'loading' ||
    favoriteFriends.state === 'loading'
  )
    return <Loader />;

  return (
    <SwipeLayoutList>
      <Layout.FlexRow w="100%" p={4} justifyContent="flex-end">
        <Button.Tertiary
          status="normal"
          text={t('edit_friends.title')}
          onClick={handleClickEditFriends}
          icon={<SvgIcon name="edit_filled" size={16} />}
          iconPosition="left"
          fontType="body-medium"
        />
      </Layout.FlexRow>
      {/* Updated Profiles */}
      {updatedProfiles.state === 'hasValue' && !!updatedProfiles.data.length && (
        <Collapse
          title={t('updated_profiles')}
          collapsedItem={
            <StyledFriendListWrapper>
              {updatedProfiles.data.map((user) => (
                <UpdatedProfileItem key={user.id} {...user} />
              ))}
            </StyledFriendListWrapper>
          }
        />
      )}
      <Divider width={1} marginLeading={9} />
      {/* Favorites */}
      {favoriteFriends.state === 'hasValue' && (
        <Collapse
          title={t('favorites')}
          collapsedItem={
            <Layout.LayoutBase w="100%">
              {favoriteFriends.data.length ? (
                favoriteFriends.data.map((user) => (
                  <UpdatedFriendItem
                    key={user.id}
                    {...user}
                    new_chat={23}
                    updateFavoriteCallback={updateFavoriteCallback(user)}
                    fetchAllTypeFriends={fetchAllTypeFriends}
                  />
                ))
              ) : (
                <Layout.FlexCol alignItems="center" ph={75} gap={8}>
                  <Typo type="label-medium" color="DARK_GRAY">
                    {t('add_favorite')}
                  </Typo>
                  <Icon name="add_default" />
                </Layout.FlexCol>
              )}
            </Layout.LayoutBase>
          }
        />
      )}
      <Divider width={1} marginLeading={9} />
      {/* Friend Requests */}
      {friendRequests.state === 'hasValue' && (
        <Collapse
          title={`${t('friend_requests')} (${friendRequests.data})`}
          collapsedItem={
            <Layout.FlexRow
              w="100%"
              alignItems="center"
              gap={8}
              pl={16}
              onClick={() => navigate('/friends/explore')}
            >
              <SvgIcon name="friend_requests" size={44} />
              <Typo type="label-medium" color="DARK">
                {t('friend_requests_desc')}
              </Typo>
              <SvgIcon name="arrow_right" size={26} />
            </Layout.FlexRow>
          }
        />
      )}
      <Divider width={1} marginLeading={9} />
      {/* All Friends */}
      {allFriends.state === 'hasValue' && (
        <Collapse
          title={t('all_friends')}
          collapsedItem={
            <Layout.LayoutBase w="100%">
              {allFriends.data.results?.length ? (
                <>
                  {allFriends.data.results.map((user) => (
                    <UpdatedFriendItem
                      key={user.id}
                      {...user}
                      updateFavoriteCallback={updateFavoriteCallback(user)}
                      new_chat={user.unread_cnt}
                      fetchAllTypeFriends={fetchAllTypeFriends}
                    />
                  ))}
                  <div ref={targetRef} />
                  {isLoadingMoreAllFriends && allFriends.data.next && <Loader />}
                </>
              ) : (
                <Layout.FlexCol alignItems="center" ph={75} gap={8}>
                  <Typo type="label-medium" color="DARK_GRAY">
                    {t('add_favorite')}
                  </Typo>
                  <Icon
                    name="add_user"
                    background="LIGHT_GRAY"
                    onClick={() => navigate('/friends/explore')}
                  />
                </Layout.FlexCol>
              )}
            </Layout.LayoutBase>
          }
        />
      )}
    </SwipeLayoutList>
  );
}

export default Friends;
