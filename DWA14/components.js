const template = document.createElement('template')
template.innerHTML = `
<style>
  /* @import url() */

  div {
     /* border: 2px solid blue; */
    padding: 2rem;
    margin: 2rem;
  }
  :host {
    /* For the shadow root */
    background-color: lavender;
    display: block;
  }

  :host-context(body) {
    background-color: purple;
  }

  :host(the-component) {
    background-color: cornflowerblue;
  }

  ::slotted(*) {
    font-size: 3rem;
    color: purple !important;
  }

  ::part( {
    /* does not work here */
  })

</style>
<div>
  <h1 part="topper">The big bang theory</h1>
  <slot name="main characters">Main Characters</slot>
  <slot name="side characters">Side Characters</slot>
</div>    
`

class Component extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({mode: 'closed'})
        /* let div = document.createElement('div')
        div.textContent = 'This is a div'
        shadowRoot.append(div) */
        let clone = template.content.cloneNode(true)
        shadowRoot.append(clone)
    }
}

customElements.define('the-component', Component)