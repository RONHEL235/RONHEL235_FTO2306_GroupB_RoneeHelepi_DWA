//Factory Function

/* const createPerson = (name, age, profession) => {
    return {
        name: name,
        age: age,
        profession: profession,
        introduce: () => {
            console.log(`Hi, Im ${this.name}.I'm ${this.age} years old and I work as a ${this.profession}.`)
        }
    }
}

const person1 = createPerson('Ronee', '23', 'Software Developer') */

/* function person(name, age, profession) {
    this.name = name;
    this.age = age;
    this.profession = profession;
    this.introduce = function() {
      console.log(`Hi, I'm ${this.name}. I'm ${this.age} years old and I work as a ${this.profession}.`);
    };
  }
  
  const person1 = new person('Alice', 30, 'Engineer');
  const person2 = new person('Bob', 35, 'Teacher');

  console.log(person1.introduce())
  console.log(person2) */

/**
 * Interface -Public and interacts with other classes
 */
class ShapeInterface {
    calculate() {
        throw new Error('Method not implemented')
    }

    render() {
        throw new Error('Method not implemented')  
    }
}

class Circle extends ShapeInterface {
    constructor(radius) {
        super()
        this.radius = radius
    }

    calculateArea() {
        return Math.PI * this.radius * this.radius
    }

    render() {
        console.log(`Rendering a circle with radius ${this.radius}`);  
    }
}

const myCircle = new Circle('hg')
console.log('Area of the circle:', Math.floor(myCircle.calculateArea()))
myCircle.render()

/**
 * Encapsulation on a Method level
 */
const getOrderTotal = (order) => {
    total = 0
    array.forEach(element => {
        
    });
}