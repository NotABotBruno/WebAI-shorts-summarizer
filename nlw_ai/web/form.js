import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event)=>{
    //Avoid page refreshing after button clicked
    event.preventDefault()
    content.classList.add("placeholder")

    const videoURL = input.value.trim()

    if (!videoURL.search("shorts") || !videoURL)
        return (content.textContent = "Selected video is not a youtube shorts")
    
    else
    {
        const [_,params] = videoURL.split("/shorts/")  

        const [videoId] = params.split("?si")

        content.textContent = "Obtaining audio text"

        //Passing to back-end via axios
        const transcription = await server.get("/summary/" + videoId)

        content.textContent = "Summarizing ..." 

        //Passing to back-end via axios
        const summary = await server.post("/summary", {
            text: transcription.data.result,
        })

        content.textContent = summary.data.result
        content.classList.remove("placeholder")
    }
        
    
})