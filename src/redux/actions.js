import axios from 'axios';

import {SET_BANDS, TOGGLE_ALL, TOGGLE_ALBUM} from './actionTypes';

const sortAlphanumerically = (array, propertyName) => {
    array.sort((itemA, itemB) => {
        const propertyValueA = propertyName? itemA[propertyName] : itemA,
              propertyValueB = propertyName? itemB[propertyName] : itemB;
        if(propertyValueA > propertyValueB) {
            return 1;
        } else if (propertyValueA < propertyValueB){
            return -1;
        }
        return 0;
    });
}

const sortData = bandsArray => {
    // sort bands
    sortAlphanumerically(bandsArray, "name");
    // sort albums & songs
    for(let band of bandsArray) {
        sortAlphanumerically(band.albums, "name");
        for(let album of band.albums) {
            sortAlphanumerically(album.songs);
        }
    }
}

export const actionFetchBands = () => {
    return async (dispatch) => {
        const jsonContents = await axios.get("data/data.json"),
              dataArray = jsonContents.data;
              
        const bandsArray = [];

        for(let item of dataArray) {
            const bandName = item.band,
                  albumName = item.album,
                  songName = item.song;
            let band = bandsArray.find(band => band.name === bandName);
            if(!band) {
                band = {name: bandName, albums: []};
                bandsArray.push(band);
            }
            let album = band.albums.find(album => album.name === albumName);
            if(!album) {
                album = {name: albumName, songs: []};
                band.albums.push(album);
            }
            album.songs.push(songName);
        }
        // sort bands & albums & songs alphanumerically
        sortData(bandsArray);
        dispatch(actionSetBands(bandsArray));
    }
}

export const actionSetBands = bandsArray => ({
    type: SET_BANDS,
    bands: bandsArray
});

export const actionToggleAll = () => ({
    type: TOGGLE_ALL
});

export const actionToggleAlbum = albumName => ({
    type: TOGGLE_ALBUM,
    albumName
});