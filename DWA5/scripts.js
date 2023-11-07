/* const form = document.querySelector("[data-form]")
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries)

  if (dividend.trim() === "" || divider.trim() === "") {
    result.innerText = "Division not performed. Both values are required in inputs. Try again"
  } else if (divider < 0) {
    result.innerText = "Division not performed. Invalid number provided. Try again"
    throw new Error("Division not performed") 
  } else if (isNaN(dividend) || isNaN(divider)) {
    document.body.innerHTML  = "Something critical went wrong. Please reload the page"
    throw new Error("Something critical went wrong") 
  } else {
    result.innerText = Math.floor(dividend / divider)
  }
})

 */

const names = ["alice", "bob", "charlie", "danielle"]
// -->        ["Alice", "Bob", "Charlie", "Danielle"]
// Your code here
const capitalized = names.map((name) => {
    return name[0].toUpperCase() + name.slice(1)
})

console.log(capitalized)
