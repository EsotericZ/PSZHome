import { FC } from 'react';
import { useUserContext } from '../../context/UserContext';

import ProfileCard from './ProfileCard';
import UpdatePSNButton from './UpdatePSNButton';

const ProfileInfo: FC = () => {
  const { state } = useUserContext();

  return (
    <>
      {state.verified && (
        <UpdatePSNButton
          userId={state.id}
        />
      )}
      <ProfileCard />
    </>
  )
}

export default ProfileInfo;