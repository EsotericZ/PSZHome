interface WishlistProps {
  id: string;
  igdbId: number;
  name: string;
  cover?: string;
  esrb?: string;
  igdbRating?: number;
  released?: string;
  slug?: string;
  genres?: { id: number; name: string }[];
  storyline?: string;
  summary?: string;
  psnName: string;
  totalRating: number;
  ratingCount: number;
  gotyCount: number;
  pszRating?: number;
  review?: string;
  video?: string;
  backlog: boolean;
}

export default WishlistProps