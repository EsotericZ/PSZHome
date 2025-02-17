interface CollectionProps {
  id: string;
  gameId: string;
  name: string;
  image: string;
  progress: number;
  platinum: boolean;
  earnedTrophies: Record<string, any>;
  trophies: any[];
  status: string;
  userId: string; 
}

export default CollectionProps;