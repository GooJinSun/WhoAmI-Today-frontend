import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MainContainer from '@components/_common/main-container/MainContainer';
import ProfileImage from '@components/_common/profile-image/ProfileImage';
import { HeaderWrapper } from '@components/title-header/TitleHeader.styled';
import { TITLE_HEADER_HEIGHT } from '@constants/layout';
import { CheckCircle, Font, Layout, SvgIcon } from '@design-system';
import { friendList } from '@mock/friends';
import { User } from '@models/user';
import {
  StyledEditGroupNameInput,
  StyledList,
  StyledListSettingItem,
  StyledUserItem,
} from './FriendGroupList.styled';

interface CheckUser extends User {
  checked?: boolean;
}

export function Friend({ profile_image, username }: Pick<User, 'profile_image' | 'username'>) {
  return (
    <Layout.FlexRow>
      <ProfileImage imageUrl={profile_image} username={username} size={20} />
      <Font.Display type="14_regular" ml={16}>
        {username}
      </Font.Display>
    </Layout.FlexRow>
  );
}

interface FriendGroupProps {
  addNewGroupMode?: boolean;
}

export function FriendGroup({ addNewGroupMode = false }: FriendGroupProps) {
  const [t] = useTranslation('translation', { keyPrefix: 'friend_group' });

  // FIXME: 실제 데이터
  const [checkFriends, setCheckFriends] = useState<CheckUser[]>(addNewGroupMode ? [] : friendList);
  const [mode, setMode] = useState<'list' | 'edit'>('list');

  const [newGroupName, setNewGroupName] = useState('New group'); // FIXME: 기존 그룹 이름
  const handleChangeGroupName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewGroupName(e.target.value);
  };

  const resetCheckFriends = () => {
    const list = checkFriends.map((group) => ({ ...group, checked: false }));
    setCheckFriends(list);
  };

  const handleClickEdit = () => setMode('edit');
  const handleClickSave = () => {
    if (addNewGroupMode) {
      // TODO: update 요청
      navigate(`/friend-groups/1`);
      return;
    }
    // TODO
    setMode('list');
    resetCheckFriends();
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleGoToUser = (username: string) => {
    navigate(`/users/${username}`);
  };

  const handleToggleFriend = (userId: number) => {
    const selectedFriendIndex = checkFriends.findIndex((user) => user.id === userId);
    if (selectedFriendIndex === -1) return;

    setCheckFriends((list) => [
      ...list.slice(0, selectedFriendIndex),
      { ...list[selectedFriendIndex], checked: !list[selectedFriendIndex].checked },
      ...list.slice(selectedFriendIndex + 1),
    ]);
  };

  const showDeleteMemberButton = !!checkFriends.find((user) => !!user.checked);

  const handleClickAddGroupMember = () => {
    navigate('new');
  };

  return (
    <MainContainer>
      {/* Header */}
      <HeaderWrapper>
        <Layout.FlexRow
          justifyContent="space-between"
          w="100%"
          alignItems="center"
          ph="default"
          pv={10}
        >
          <button type="button" onClick={handleGoBack}>
            <SvgIcon name="arrow_left" size={36} color="BASIC_BLACK" />
          </button>
          {addNewGroupMode || mode === 'edit' ? (
            <StyledEditGroupNameInput
              type="text"
              value={newGroupName}
              onChange={handleChangeGroupName}
            />
          ) : (
            <Font.Display type="24_bold" textAlign="center">
              {/* 실제 그룹 이름 */}
              {t('title')}
            </Font.Display>
          )}
          <Layout.LayoutBase w={36}>
            {mode === 'edit' || addNewGroupMode ? (
              <button type="button" onClick={handleClickSave}>
                <Font.Display type="18_bold" color="PRIMARY">
                  {t('save')}
                </Font.Display>
              </button>
            ) : checkFriends.length > 1 ? (
              <button type="button" onClick={handleClickEdit}>
                <Font.Display type="18_bold" color="PRIMARY">
                  {t('edit')}
                </Font.Display>
              </button>
            ) : null}
          </Layout.LayoutBase>
        </Layout.FlexRow>
      </HeaderWrapper>
      <Layout.LayoutBase w="100%" pt={TITLE_HEADER_HEIGHT + 50} ph={24}>
        <StyledList>
          {mode === 'list' &&
            checkFriends.map(({ id, username, profile_image }) => (
              <StyledUserItem key={id} role="button" onClick={() => handleGoToUser(username)}>
                <Friend profile_image={profile_image} username={username} />
                <SvgIcon name="more_arrow" color="BASIC_BLACK" size={16} />
              </StyledUserItem>
            ))}
          {mode === 'edit' &&
            checkFriends.map(({ id, checked, username, profile_image }) => (
              <StyledUserItem key={id}>
                <Friend profile_image={profile_image} username={username} />
                <CheckCircle
                  name={username}
                  checked={!!checked}
                  onChange={() => handleToggleFriend(id)}
                  hideLabel
                />
              </StyledUserItem>
            ))}
          {mode === 'list' && (
            <StyledListSettingItem onClick={handleClickAddGroupMember}>
              <Layout.FlexRow>
                <SvgIcon name="check_circle_add" size={20} />
                <Font.Display type="14_semibold" color="PRIMARY" ml={12}>
                  {t('add_group_member')}
                </Font.Display>
              </Layout.FlexRow>
            </StyledListSettingItem>
          )}
          {mode === 'edit' && (
            <StyledListSettingItem disabled={!showDeleteMemberButton} textAlign="center">
              <Layout.FlexRow>
                <Font.Display type="14_semibold" ml={12}>
                  {t('delete_group_member')}
                </Font.Display>
              </Layout.FlexRow>
            </StyledListSettingItem>
          )}
        </StyledList>
      </Layout.LayoutBase>
    </MainContainer>
  );
}

export default FriendGroup;
