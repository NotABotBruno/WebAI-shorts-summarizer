import {summaryExample} from "./utils/summary.js"
import { pipeline } from "@xenova/transformers"

export async function summarize(text){
    try {
//        return summaryExample 
        console.log("Summarizing")

        const generator = await pipeline(
            "summarization",
            "Xenova/bart-large-cnn"
        )

        const output = await generator(text)

        console.log("Summary done")

        return output[0].summary_text
    } catch (error) { 
        console.log("Eorr during summarization:",error)
        throw new Error(error)
    }
}