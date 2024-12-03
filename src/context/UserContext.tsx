import { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextProps {
  email: string | null;
  setEmail: (email: string | null) => void;
  psn: string | null;
  setPsn: (psn: string | null) => void;
  role: number;
  setRole: (role: number) => void;
  verified: boolean;
  setVerified: (verified: boolean) => void;
  psnAvatar: string | null;
  setPsnAvatar: (psnAvatar: string | null) => void;
  psnPlus: boolean;
  setPsnPlus: (psnPlus: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [psn, setPsn] = useState<string | null>(null);
  const [role, setRole] = useState<number>(2001);
  const [verified, setVerified] = useState<boolean>(false);
  const [psnAvatar, setPsnAvatar] = useState<string | null>(null);
  const [psnPlus, setPsnPlus] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ 
      email, 
      setEmail,
      psn,
      setPsn,
      role,
      setRole,
      verified,
      setVerified,
      psnAvatar,
      setPsnAvatar,
      psnPlus,
      setPsnPlus,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};