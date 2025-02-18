import api from '../../api/api';

const searchGames = async (game: string) => {
  const response = await api.post('/igdb', {
    game,
  });

  return response.data;
}

export default searchGames;