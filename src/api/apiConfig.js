const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "15ffd76c38712a91840ee5ec07ccb3f0",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
}

export default apiConfig
