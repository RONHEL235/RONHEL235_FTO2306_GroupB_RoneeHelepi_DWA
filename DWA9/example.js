//Methods
/* function rabbitSpeak(line) {
    console.log(`The ${this.type} and ${this.state} rabbit says '${line}'`)
}

let blueRabbit = {
    type: "Blue",
    state: 'Clever',
    rabbitSpeak
 }
let redRabbit = {
    type: "Red",
    state: 'Clever',
    rabbitSpeak
}

blueRabbit.rabbitSpeak('I am blue')
redRabbit.rabbitSpeak('I am red') */

//Prototypes
/* let empty = {}
console.log(empty.toString)
console.log(empty.toString())

console.log(Object.getPrototypeOf(Object.prototype)) */

//Create Our own prototype
/* let protoRabbit = {
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`)
    }//A method expressed as a function. But it is a method.
}

let mutantRabbit = Object.create(protoRabbit)
mutantRabbit.type = 'mutant'
mutantRabbit.speak('Rhaaaa!') */

console.log(Object.getPrototypeOf({}))
