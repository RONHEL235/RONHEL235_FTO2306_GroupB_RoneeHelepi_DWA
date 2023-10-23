const MAX_NUMBER = 15
const MIN_NUMBER = -5

const number = document.querySelector('[data-key="number"]')
const subtract = document.getElementsByTagName('sl-icon-button')
const add = document.getElementsByTagName('sl-icon-button')

const subtracthandler = () => {

    const newValue = parseInt(number.value) - 1
    number.value = newValue

    if (add.disable === true) {
        add.disabled = false
    }

    if (newValue <= MIN_NUMBER) {
        subtract.disabled = true
    }
}

const addhandler = () => {
    const newValue = parseInt(number.value) + 1
    number.value = newValue

    if (subtract.disable === true) {
        subtract.disabled = false
    }

    if (newValue >= MAX_NUMBER) {
        add.disabled = true
    }
}

subtract.addEventListener('click', subtracthandler)
add.addEventListener('click', addhandler)


/* const createUser = ({ firstName, lastName, email }) => ({
    firstName,
    lastName,
    email,
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  });
  
  const user1 = createUser({
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com"
  });
  
  const user2 = createUser({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com"
  });
  
  console.log(user1);
  console.log(user2); */