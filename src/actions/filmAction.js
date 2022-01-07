import { GET_FILMS } from "./types";
import { apiConst, GET } from "../api/apiConstant";
import { makeAPIRequest } from "../api/apiCall";

export const getFilms = (request) => {
  return async (dispatch) => {
    makeAPIRequest({
      method: GET,
      url: apiConst.FILM,
    })
      .then((response) => {
        if (response.status == "200" && response.data) {
          let data = response.data.results;
          data = response.data.results.map((item) => {
            item.favorite = false;
            return item
          })
          dispatch({ type: GET_FILMS, payload: data });
          if (request.onSuccess) request.onSuccess(response);
        } else {
          if (request.onFail) request.onFail(response);
        }
      })
      .catch((error) => {
        if (request.onFail) request.onFail(error);
      });
  };
};

export const setFavoriteFilm = (request) => {
  return async (dispatch, getState) => {
    const films = getState().film.films;
    const id = request.episode_id;
    var items = films.map(function (film) {
      if (film.episode_id === id) {
        film.favorite = !film.favorite;
      }
      return film;
    });
    dispatch({ type: GET_FILMS, payload: items });
  };
}

export const setFavoriteChar = (request, name) => {
  return async (dispatch, getState) => {
    const films = getState().film.films;
    const id = request;
    var items = films.map(function (film) {
      film.characters = film.characters.map(function (ch) {
        let c = JSON.parse(ch);
        if (c.name === name) {
          c.favorite = !c.favorite;
        }
        return JSON.stringify(c);
      });
      return film;
    });
    dispatch({ type: GET_FILMS, payload: items });
  };
}

export const getdata = (films) => {
  let favList = [];
  let favoriteList = [];
  films.map((film) => {
    if (film.favorite === true) {
      film.film = true;
      favoriteList.push(film);
    }
    film.characters.map((ch) => {
      let c = JSON.parse(ch);
      if (c.favorite) {
        c.film = false
        c.filmid = film.episode_id
        favList.push(c);
      }
    });
  })
  favoriteList = favoriteList.reduce((unique, o) => {
    if (!unique.some(obj => obj.episode_id === o.episode_id)) {
      unique.push(o);
    }
    return unique;
  }, []);

  favList = favList.reduce((unique, o) => {
    if (!unique.some(obj => obj.name === o.name)) {
      unique.push(o);
    }
    return unique;
  }, []);

  favoriteList = [...favoriteList, ...favList]

  return favoriteList;
}

export const getCharacter = (request) => {
  return async (dispatch, getState) => {
    const films = getState().film.films;
    const temp = films.map((film) => {
      film.characters = film.characters.map(async( url, index) => {
        await makeAPIRequest({
          method: GET,
          url: url,
        })
          .then((response) => {
            film.characters[index] = JSON.stringify(response.data);
            film.characters[index] = JSON.parse(film.characters[index]);
            film.characters[index].favorite = false
            film.characters[index] = JSON.stringify(film.characters[index])
          })
          .catch((error) => {
          });
          return url;
      })
      return film;
    })
    dispatch({ type: GET_FILMS, payload: films });

  };
};
