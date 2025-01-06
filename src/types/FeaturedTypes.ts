interface FeaturedProps {
  id: string;
  order: number;
  description: string;
  colorDom?: string;
  colorSat?: string;
  esrb?: string;
  gameId: number;
  image: string;
  metacritic?: string;
  name: string;
  rating?: number;
  ratingTop?: number;
  released: string;
  slug?: string;
}

export default FeaturedProps;