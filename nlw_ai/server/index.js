import cors from 'cors'
import express from 'express'
import { download } from './download.js'

const app = express() //Criando o app
app.use(cors()) 

//Criando rota
app.get('/summary/:id', (request, response) => {
    download(request.params.id)

    response.json({result : "Video download was successful"})
})

app.listen(3333, () => console.log("Server running"))

