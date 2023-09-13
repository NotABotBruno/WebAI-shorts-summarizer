import ytdl from 'ytdl-core'
import fs from 'fs'
import { error } from 'console'

export const download = (videoID) => {
    const videoURL = "https://www.youtube.com/shorts/"+ videoID
    console.log("Downloading video:",videoID)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly"})
    .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        
        if(seconds > 60)
        {
            throw new Error("Duration exceeds 60 seconds")
        }
    })
    .on("end",() => {
        console.log("Download has finished!")
    })
    .on("error", (error) => {
        console.log("An error has ocurred while downloading:",error)
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
}