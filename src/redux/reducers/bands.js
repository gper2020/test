import { SET_BANDS, TOGGLE_ALL, TOGGLE_ALBUM } from "../actionTypes";

const initialState = {
  bandsList: [],
  albumPanels: [],
  shouldExpandAll: false
};

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_BANDS: {
      return {
        ...state,
        bandsList: [...action.bands],
        albumPanels: (function setupAlbumPanels() {
          const albumPanels = [];
          for (let band of action.bands) {
            for (let album of band.albums) {
              albumPanels.push({ name: `${band.name}-${album.name}`, isExpanded: initialState.shouldExpandAll });
            }
          }
          return albumPanels;
        })()
      }
    }
    case TOGGLE_ALL: {
      return {
        ...state,
        shouldExpandAll: !state.shouldExpandAll,
        albumPanels: state.albumPanels.map(album => {
          album.isExpanded = !state.shouldExpandAll;
          return album;
        })
      }
    }
    case TOGGLE_ALBUM: {
      return {
        ...state,
        albumPanels: state.albumPanels.map(album => {
          if(album.name === action.albumName) {
            album.isExpanded = !album.isExpanded;  
          }
          return album;
        })
      }
    }
    default:
      return state;
  }
}
