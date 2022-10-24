import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SetCurrentSong, SetCurrentSongIndex, SetSelectedPlaylist} from '../redux/userSlice';

function SongsList(){
    const {allSongs, currentSong, selectedPlaylist} = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [songsToPlay, setSongsToPlay] = useState([]);
    const [searchKey, setSearchKey] = useState("")

    useEffect(() => {
        if(selectedPlaylist && selectedPlaylist.name === "All Songs" && searchKey !== ""){
            const tempSongs = [];

            selectedPlaylist.songs.forEach((song) => {
                if(JSON.stringify(song).toLowerCase().includes(searchKey)){
                    tempSongs.push(song)
                }
            })
            setSongsToPlay(tempSongs)
        }else{
            setSongsToPlay(selectedPlaylist?.songs)
        }

    }, [selectedPlaylist, searchKey])

    return (
        <div className="flex flex-col gap-5">
            <div className="pl-3 pr-6">
                <input onFocus={() => {
                    dispatch(SetSelectedPlaylist({
                        name: "All Songs",
                        songs: allSongs,
                    }))
                }} value={searchKey} onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder="Song, Artist, Album" className="rounded w-full" />
            </div>
           <div className="overflow-y-scroll h-[54vh] p-3">
               {songsToPlay.map((song, index) =>{
                   const isPlaying = currentSong?._id === song._id;
                   return (
                       <div className={`p-2 flex items-center justify-between cursor-pointer ${isPlaying && 'shadow border border-gray-300 rounded'}`} onClick={() =>{
                           dispatch(SetCurrentSong(song))
                           dispatch(SetCurrentSongIndex(index))
                       }}>
                           <div>
                               <h1>{song.title}</h1>
                               <h1>{song.artist} {song.album} {song.year}</h1>
                           </div>
                           <div>
                               <h1>{song.duration}</h1>
                           </div>
                       </div>
                   )
               })}
           </div>
        </div>
    )
}

export default SongsList