interface FeaturedProps {
  id: string;
  description: string;
  order: number;
  name: string;
  cover: string;
  esrb?: string;
  igdbRating?: number;
  released: string;
  slug?: string;
  genres?: { id: number; name: string }[];
  storyline?: string;
  summary?: string;
  gameId: string;
  totalRating: number;
  ratingCount: number;
  gotyCount: number;
  pszRating?: number;
  review?: string;
  video?: string;
  collection: boolean;
  wishlist: boolean;
  backlog: boolean;
}

export default FeaturedProps;