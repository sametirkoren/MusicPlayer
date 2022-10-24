import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {HideLoading, ShowLoading} from '../redux/alertsSlice';
import {SetAllSongs} from '../redux/userSlice';
import SongsList from '../components/SongsList';
import Playlists from '../components/Playlists';
import Player from '../components/Player';
function Home() {
    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    return (
        <>
            <div className="flex gap-5">
                <div className="w-1/2">
                    <SongsList />
                </div>
                <div className="w-1/2">
                    <Playlists />
                </div>
            </div>
            <Player />
        </>

    )
}

export default Home