import ytdl from 'ytdl-core'
import fs from 'fs'
import { error } from 'console'

var success = true
var finished = false

export const downloadVideo = (videoID) => {
    const startTime = Date.now()
    const videoURL = "https://www.youtube.com/watch?v="+ videoID
    console.log("Downloading video:",videoID)

    let videoTitle = ""

    ytdl(videoURL, { quality: "highest", filter: "videoonly"})
    .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        videoTitle = info.videoDetails.title
        console.log(videoTitle)
        // if(seconds > 60)
        // {
        //     throw new Error("Duration exceeds 60 seconds")
        // }
    })
    .on("progress", (chunkLenght,downloaded,total) =>{
        var interval = Date.now() - startTime
        var download_speed = downloaded / (interval / 1000)
        var estimated_time_minutes = (total / download_speed) / 1000 / 60

        console.log("video percentage:", Math.round(downloaded/total * 100) + "%",
        "|", "Download Speed:", download_speed + "bytes/s",
        "|", "Estimated time:", estimated_time_minutes)
    })
    .on("finished",() => {
        finished = true
        console.log("Download has finished!")
        return success
    })
    .on("error", (error) => {
        success = false
        console.log("An error has ocurred while downloading:",error)
    })
    .pipe(fs.createWriteStream("./tmp/"+videoTitle+".mp4"))
}

export const downloadAudio = (videoID) => {
    const startTime = Date.now()
    const videoURL = "https://www.youtube.com/watch?v="+ videoID
    console.log("Downloading video:",videoID)

    let videoTitle = ""

    ytdl(videoURL, { quality: "highest", filter: "audioonly"})
    .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        videoTitle = info.videoDetails.title
        console.log(videoTitle)
        // if(seconds > 60)
        // {
        //     throw new Error("Duration exceeds 60 seconds")
        // }
    })
    .on("progress", (chunkLenght,downloaded,total) =>{
        var interval = Date.now() - startTime
        var download_speed = downloaded / (interval / 1000)
        var estimated_time_minutes = (total / download_speed) / 1000 / 60

        console.log("audio percentage:", Math.round(downloaded/total * 100) + "%",
        "|", "Download Speed:", download_speed + "bytes/s",
        "|", "Estimated time:", estimated_time_minutes)
    })
    .on("finished",() => {
        finished = true
        console.log("Download has finished!")
        return success
    })
    .on("error", (error) => {
        success = false
        console.log("An error has ocurred while downloading:",error)
    })
    .pipe(fs.createWriteStream("./tmp/"+videoTitle+".mp4"))
}