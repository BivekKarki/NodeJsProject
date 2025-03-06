import {EventEmitter} from 'events';

// Create event emitter object
const eventEmitter = new EventEmitter();

// Register events
eventEmitter.on("hello", ()=>{
    console.log("Greetings from event.")
})

eventEmitter.on("bye", ()=>{
    console.log("bye bye from event.")
})

// Trigger/Emit events
eventEmitter.emit('bye');