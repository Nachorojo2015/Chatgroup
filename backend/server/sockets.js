import { io } from "../index.js";

io.on('connection', (socket) => {

    

    io.on('disconnect', () => {
        console.log('user disconnect')
    })
})