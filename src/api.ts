const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) =>
    response.json()
  );
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}
export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCharacters() {
  return fetch(
    "https://disney_api.nomadcoders.workers.dev/characters"
  ).then((response) => response.json());
}

export function fetchDetailCharacter(characterId: string) {
  return fetch(
    `https://disney_api.nomadcoders.workers.dev/characters/${characterId}`
  ).then((response) => response.json());
}
