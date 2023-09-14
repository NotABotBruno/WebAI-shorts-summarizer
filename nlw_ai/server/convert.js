import fs from 'fs'
import wav from 'node-wav'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegStatic from 'ffmpeg-static'
import { resolve } from 'path'
import { rejects } from 'assert'

const filePath = "./tmp/audio.mp4"
const outputPath = filePath.replace(".mp4",".wav")

export const convert = () => 
    new Promise ((resolve,reject) => {
        console.log("Converting video")

        ffmpeg.setFfmpegPath(ffmpegStatic)

        ffmpeg()
        .input(filePath)
        .audioFrequency(16000)
        .audioChannels(1)
        .format("wav")
        .on("end", () => {
            const file = fs.readFileSync(outputPath)
            const fileDecoded = wav.decode(file)

            const audioData = fileDecoded.channelData[0]
            const flotArray = new Float32Array(audioData)

            console.log("Video converteed successfully")

            resolve(flotArray)

            //Deletes .wav file
            fs.unlinkSync(outputPath)
        })
        .on("error",(error) => {
            console.log("Error during convertion:", error)
            reject(error)
        })
        .save(outputPath)
})
