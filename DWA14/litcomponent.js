import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js'

class TallyCounter extends LitElement {
    static styles = css`
    body {
        background-color: red
    }

    h2 {
        font-size: 4rem;
    }    

    button, p {
      font-Size: 2.5rem;
      color: blue;
    }
    ` 

    static properties = {
        count: {type: Number}
    }

    constructor() {
        super()
        this.count = 0
    }

    render() {
        return html `
        <body>
        <div>
          <h2>Tally Count</h2>
          <p>Count: ${this.count}</p>
          <button @click = ${this.increment}>Increment</button>
          <button @click = ${this.decrement}>Decrement</button>
          <button @click = ${this.reset}>Reset</button>
        </div>
        </body>
        `
    }

    increment() {
        this.count++
    }

    decrement() {
            this.count--
    }

    reset() {
        this.count = 0
    }
}

customElements.define('tally-counter', TallyCounter)