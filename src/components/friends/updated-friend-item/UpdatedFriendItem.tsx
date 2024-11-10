import { useNavigate } from 'react-router-dom';
import Icon from '@components/_common/icon/Icon';
import ProfileImage from '@components/_common/profile-image/ProfileImage';
import { SwipeLayout } from '@components/_common/swipe-layout/SwipeLayout';
import { StyledSwipeButton } from '@components/chats/chat-room-list/ChatRoomItem.styled';
import SpotifyMusic from '@components/music/spotify-music/SpotifyMusic';
import { Layout, SvgIcon, Typo } from '@design-system';
import { UpdateFriendListParams } from '@hooks/useInfiniteFetchFriends';
import { UpdatedProfile } from '@models/api/friends';
import { addFriendToFavorite, deleteFavorite, hideFriend } from '@utils/apis/friends';
import { breakFriend } from '@utils/apis/user';
import UpdatedLabel from '../updated-label/UpdatedLabel';
import { StyledProfileArea, StyledUpdatedFriendItem } from './UpdatedFriendItem.styled';

interface Props {
  user: UpdatedProfile;
  updateFriendList: (params: UpdateFriendListParams) => void;
  updateFavoriteFriendList: () => void;
}

function UpdatedFriendItem({ user, updateFriendList, updateFavoriteFriendList }: Props) {
  const { id, profile_image, username, is_favorite, current_user_read, track_id, description } =
    user;

  const navigate = useNavigate();
  const handleClickProfile = () => {
    navigate(`/users/${username}`);
  };

  const handleDeleteFavorite = () => {
    deleteFavorite(id).then(() => {
      updateFavoriteFriendList();
      updateFriendList({ type: 'is_favorite', userId: id, value: false });
    });
  };

  const handleAddFavorite = () => {
    addFriendToFavorite(id).then(() => {
      updateFavoriteFriendList();
      updateFriendList({ type: 'is_favorite', userId: id, value: true });
    });
  };

  const handleHide = () => {
    hideFriend(id).then(() => {
      updateFavoriteFriendList();
      updateFriendList({ type: 'is_hidden', userId: id, value: true });
    });
  };

  const handleUnfriend = () => {
    breakFriend(id).then(() => {
      updateFavoriteFriendList();
      updateFriendList({ type: 'break_friends', userId: id });
    });
  };

  return (
    <SwipeLayout
      itemWidth={74}
      rightContent={[
        <StyledSwipeButton key="hide" backgroundColor="DARK_GRAY" onClick={handleHide}>
          <Typo type="body-medium" color="WHITE" textAlign="center">
            Hide
          </Typo>
        </StyledSwipeButton>,
        <StyledSwipeButton key="unfriend" backgroundColor="ERROR" onClick={handleUnfriend}>
          <Typo type="body-medium" color="WHITE" textAlign="center">
            Unfriend
          </Typo>
        </StyledSwipeButton>,
      ]}
      leftContent={
        is_favorite
          ? [
              <StyledSwipeButton
                key="favorite"
                backgroundColor="DARK_GRAY"
                onClick={handleDeleteFavorite}
              >
                <Icon name="star" size={28} />
              </StyledSwipeButton>,
            ]
          : [
              <StyledSwipeButton
                key="favorite"
                backgroundColor="DARK_GRAY"
                onClick={handleAddFavorite}
              >
                <SvgIcon name="star_outline" size={28} color="WHITE" />
              </StyledSwipeButton>,
            ]
      }
    >
      <Layout.FlexRow w="100%" ph={16} gap={16}>
        <StyledUpdatedFriendItem w="100%" alignItems="center" justifyContent="space-between">
          <StyledProfileArea type="button" onClick={handleClickProfile}>
            <Layout.FlexRow alignItems="center" gap={7}>
              <ProfileImage imageUrl={profile_image} username={username} size={44} />
              <Layout.FlexCol>
                <Layout.FlexRow gap={4} alignItems="center">
                  <Typo type="label-large" ellipsis={{ enabled: true, maxWidth: 100 }}>
                    {username}
                  </Typo>
                  {!current_user_read && <UpdatedLabel />}
                </Layout.FlexRow>
                {description && (
                  <Typo type="label-medium" color="MEDIUM_GRAY" numberOfLines={1}>
                    {description}
                  </Typo>
                )}
              </Layout.FlexCol>
            </Layout.FlexRow>
          </StyledProfileArea>
          {track_id && <SpotifyMusic track={track_id} sharer={user} useDetailBottomSheet />}
        </StyledUpdatedFriendItem>
      </Layout.FlexRow>
    </SwipeLayout>
  );
}

export default UpdatedFriendItem;
