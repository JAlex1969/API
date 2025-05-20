
const express = require('express')
const app = express()
const PORT = 3001
const cors = require('cors');

app.use(cors());

let notes = [
    { id: 1, content: "HTML is easy", important: true },
    { id: 2, content: "Browser can execute only JavaScript", important: false },
    {
        id: 3, content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }]

app.get('/api/notas', (request, response) => {
    response.json(notes)
})

app.get('/api/notas/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notas/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.post('/api/notas', (request, response) => {
    const note = request.query
    note.id = Number(note.id)
    notes = notes.concat(note)
    response.json(note)
})

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`)
})
