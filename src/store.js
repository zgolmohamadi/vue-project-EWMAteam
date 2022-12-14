import { reactive } from "vue";
export const store = reactive({
  baseUrl: "https://api.themoviedb.org/3",
  imgBaseUrl: "https://image.tmdb.org/t/p/w200/",
  imdbBaseLink: "https://www.imdb.com/title/",
  apiKey:import.meta.env.VITE_API_KEY,
  moviesList: null,
  moviesGenres: null,
  loading: false,
  starDate: null,
  endDate: null,
  pageNumber: 0,
  totalPage: 0,
  movieDetails: null,
  casts: null,
  date: null,
  

  async getMovieList(pageNumber = 1) {
    this.loading = true;
    if (this.date != null) {
      this.getMovieListByDate(pageNumber, this.date[0], this.date[1]);
      return;
    }

    const response = await fetch(
      this.baseUrl +
        `/discover/movie?api_key=${this.apiKey}&page=${pageNumber}`
    );
    const data = await response.json();
    this.moviesList = data.results;
    this.pageNumber = data.page;
    this.totalPage = data.total_pages;
    this.loading = false;
  },

  async getMovieListByDate(
    pageNumber = 1,
    release_start_date,
    release_end_date
  ) {
    this.loading = true;

    //save in store
    this.date = [release_start_date, release_end_date];

    const response = await fetch(
      this.baseUrl +
        `/discover/movie?api_key=${this.apiKey}&page=${pageNumber}&primary_release_date.gte=${release_start_date}&primary_release_date.lte=${release_end_date}`
    );

    const data = await response.json();
    this.moviesList = data.results;
    this.pageNumber = data.page;
    this.totalPage = data.total_pages;
    this.loading = false;
  },

  async getGenres() {
    this.loading = true;

    const response = await fetch(
      this.baseUrl +
        `/genre/movie/list?api_key=${this.apiKey}`
    );

    const data = await response.json();
    this.moviesGenres = data.genres;
    this.loading = false;
  },

  async getMovieDetail(movie_id) {
    this.loading = true;

    const response = await fetch(
      this.baseUrl +
        `/movie/${movie_id}?api_key=${this.apiKey}`
    );

    const data = await response.json();

    this.getMovieCredit(movie_id);

    this.movieDetails = data;
    this.loading = false;
  },
  async getMovieCredit(movie_id) {
    this.loading = true;

    const response = await fetch(
      this.baseUrl +
        `/movie/${movie_id}/credits?api_key=${this.apiKey}`
    );

    const data = await response.json();

    this.casts = data.cast
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10);

    this.loading = false;
  },
});
