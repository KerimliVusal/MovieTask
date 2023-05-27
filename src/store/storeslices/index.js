import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Addedmesage, Deletemesage } from '../../utils';
let wishlistarray = JSON.parse(localStorage.getItem("likeddata"))
  ? JSON.parse(localStorage.getItem("likeddata"))
  : [];
let watchlistarray = JSON.parse(localStorage.getItem("saveddata"))
  ? JSON.parse(localStorage.getItem("saveddata"))
  : [];
let addlist = JSON.parse(localStorage.getItem("addedlist"))
  ? JSON.parse(localStorage.getItem("addedlist"))
  : [];
let sugestlist = JSON.parse(localStorage.getItem("sugestlist"))
  ? JSON.parse(localStorage.getItem("sugestlist"))
  : [];



export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  try {
    const popularmovies = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=19d5dcc0918f5300be53acc029f125ef');
    const moviesData = await popularmovies.json();

    const topRatedmovies = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=19d5dcc0918f5300be53acc029f125ef');
    const topRatedData = await topRatedmovies.json();

    const tvShowspopular = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=19d5dcc0918f5300be53acc029f125ef');
    const tvShowsData = await tvShowspopular.json();

    const upcoming = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=19d5dcc0918f5300be53acc029f125ef');
    const upcomingdata = await upcoming.json();

    return {
      popularmovies: moviesData.results,
      topratedmovies: topRatedData.results,
      tvShows: tvShowsData.results,
      upcomingmovies: upcomingdata.results,
    };
  } catch (error) {
    throw new Error(error.message);
  }
});

const initialState = {
  movie: [],
  tv: [],
  alldata: [],
  type: 'alldata',
  filtereddata: [],
  searchdata: [],
  suggesteddata: sugestlist,
  manualdata: [],
  newitem: addlist,
  suggestions: [],
  watchlistdata: watchlistarray,
  wishlistdata: wishlistarray,
  login: false,
  loading: false,
}

export const ApidataSlice = createSlice({
  name: 'apidata',
  initialState,
  reducers: {
    apidatatype: (state, action) => {
      state.type = action.payload
    },
    filterData: (state, action) => {
      state.filtereddata = action.payload
    },
    searchData: (state, action) => {
      state.filtereddata = action.payload
    },
    Logindetail: (state, action) => {
      state.login = action.payload
    },
    Sugested: (state, action) => {
      const clickedItem = action.payload;
      const isItem = state.suggesteddata?.find(item => item.id === clickedItem.id);

      if (state.suggesteddata.indexOf(isItem) !== -1) {
        state.suggesteddata = [...state.suggesteddata];
      }
      else {
        state.suggesteddata = [...state.suggesteddata, clickedItem];
      }
    },

    newAdded: (state, action) => {
      const clickedItem = action.payload;
      const isItem = state.newitem?.find(item => item.id === clickedItem.id);

      if (state.newitem.indexOf(isItem) !== -1) {
        state.newitem = [...state.newitem];
      }
      else {
        state.newitem = [...state.newitem, clickedItem];
      }
    },
    sugestManually: (state, action) => {
      const clickedItem = action.payload;
      const isItem = state.manualdata?.find(item => item.id === clickedItem.id);

      if (state.manualdata.indexOf(isItem) !== -1) {
        state.manualdata = [...state.manualdata];
      }
      else {
        state.manualdata = [...state.manualdata, clickedItem];
      }
    },
    sugestions: (state, action) => {
      const clickedItem = action.payload;
      const isItem = state.suggestions?.find(item => item.id === clickedItem.id);

      if (state.suggestions.indexOf(isItem) !== -1) {
        state.suggestions = [...state.suggestions];
      }
      else {
        state.suggestions = [...state.suggestions, clickedItem];
      }
    },
    Addwatchlist: (state, action) => {
      const clickedItem = action.payload;
      const isItem = state.watchlistdata?.find(item => item.id === clickedItem.id);

      if (state.watchlistdata.indexOf(isItem) !== -1) {
        state.watchlistdata = state.watchlistdata?.filter((film) => film.id !== isItem.id);
      }
      else {
        state.watchlistdata = [...state.watchlistdata, clickedItem];
      }
    },
    Addwishlist: (state, action) => {
      const clickedItem = action.payload;
      const isItem = state.wishlistdata?.find(item => item.id === clickedItem.id);

      if (state.wishlistdata.indexOf(isItem) !== -1) {
        state.wishlistdata = state.wishlistdata?.filter((film) => film.id !== isItem.id);
      }
      else {
        state.wishlistdata = [...state.wishlistdata, clickedItem];
      }
    },


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        const popularmovies = action.payload.popularmovies
        const topratedmovies = action.payload.topratedmovies;
        const tvShows = action.payload.tvShows;
        const upcomingmovies = action.payload.upcomingmovies
        state.movie = [...popularmovies, ...topratedmovies, ...upcomingmovies];
        state.tv = [...tvShows]
        state.alldata = [...state.movie, ...state.tv];

      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
      });
  },
})

// Action creators are generated for each case reducer function
export const { apidatatype, filterData, searchData, Logindetail, Sugested, newAdded, sugestManually, sugestions, Addwatchlist, Addwishlist } = ApidataSlice.actions

export default ApidataSlice.reducer