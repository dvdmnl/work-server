const express = require("express")
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = 8080

const app = express()
app.use(cors())
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.json())

const messages = [
    {
        "roomId": 10,
        "fromName": "from name",
        "fromNumber": "054-129312",
        "body": [
            {
                "receivedAt": "2021-08-30 18:09:35",
                "body": "lorem ipsum?",
                "direction": "incoming"
            },
            {
                "receivedAt": "2021-08-31 12:01:20",
                "body": "lorem ipsum!",
                "direction": "outgoing"
            }
        ]
    },
    {
        "roomId": 11,
        "fromName": "from name2",
        "fromNumber": "054-122222",
        "body": [
            {
                "receivedAt": "2021-08-30 18:09:35",
                "body": "lorem ipsum lorem?",
                "direction": "incoming"
            }
        ]
    }
]

app.post('/api/ping_message', (req, res) => {
    const randomIndex = Math.floor(Math.random()*(messages.length+1))
    const message = randomIndex > messages.length ? {"roomId": null} : messages[randomIndex];
    res.send(message);
})

app.get('/api/get_chat/:room_id', (req, res) => {
    const index = messages.findIndex((obj => obj.roomId === +req.params.room_id));
    if(index > -1) {
        res.send(messages);
    } else {
        res.status(404).send('Not Found')
    }

})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})