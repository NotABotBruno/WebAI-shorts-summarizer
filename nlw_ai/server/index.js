import cors from 'cors'
import express, { response } from 'express'
import { download } from './download.js'
import { transcribe } from './transcribe.js'
import {summarize} from "./summarize.js"
import { convert } from './convert.js'

const app = express() //Criando o app
app.use(express.json())
app.use(cors()) 

//Criando rota
app.get('/summary/:id', async (request, response) => {
    try{
    await download(request.params.id)

    const audioConverted = await convert()
    
    const result = await transcribe(audioConverted)
    
    return response.json({result : result})
    } catch(error)
    {
        return response.json({error : error})
    }
})

app.post("/summary", async (request,response) => {
    try{
        const result = await summarize(request.body.text)
        return response.json({result : result})
    }catch(error)
    {
        return response.json({error : error})
    }
})

app.listen(3333, () => console.log("Server running"))

