import express, {Application, Request, Response, NextFunction, ErrorRequestHandler} from 'express'
import { Server } from 'http'
import createHttpError from 'http-errors'
import {config} from 'dotenv'

config()

// Manuel Reicht 5A NVSV

//script erstellt in package.json
//"start": "npx tsc && node build/app.js",
//kompilieren: npx tsc
//starten: node build/app.js

console.log(1234)

const app: Application = express()
// PORT kommt aus .env
const PORT: Number = Number(process.env.PORT) || 3000

//public folder auf gleicher ebene wie src oder build
app.use(express.static("public"))


//einfacher get request
//Type kommt von typescript
//Type hilft für Autocompetion und Fehlerbehebung
app.get('/', (req: Request, res: Response, next: NextFunction)=>{
    //res.send('Hello World!')
    let img = `<img src="/img/IMG_2174.jpg" height="400px">`
    let link = `<a href="/Folder">new Folder ?</a>`
    
    let html = `<!DOCTYPE html><html><head><title>Static Files</title></head><body>`
    html += `<h1>Static Files</h1><main>${img}<br>${link}</main>`
    html += `</body></html>`
    res.send(html)

})

//Daumenregel: Um Types zu installieren, @types/PACKAGENAME verwenden
//Errors
app.use((req: Request, res: Response, next: NextFunction)=>{
    next(new createHttpError.NotFound())
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({ 
        status: err.status || 500,
        message: err.message
    })
}

app.use(errorHandler)

const server: Server = app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})