//1
const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']

//1.1
/* const theProvinces = provinces.forEach((element) => {console.log(element)}) */

//1.2
/* const provincesAndNames = (provinces, names) => {
    provinces.forEach(element1 => { 
        names.forEach(element2 => {
            if (provinces.indexOf(element1) === names.indexOf(element2)) {
                console.log(`${element2} (${element1})`)
            }
        })
    })
}

provincesAndNames(provinces, names)
 */

//1.3
/* const upperCase = provinces.map((element) => {
    return element.toUpperCase()
})

console.log(upperCase) */

//1.4
/* const elementLength = (anArray) => {
    return anArray.map(element => element.length)
}

console.log(elementLength(names))
console.log(elementLength(provinces)) */

//1.5
/* const provinceSorted = provinces.sort()
console.log(provinceSorted) */

//1.6
/* const removeCape = provinces.filter((element) => {
    if(element.includes('Cape')) {
        provinces.pop(element)
    } 
})
console.log(provinces.length) */

//1.7
/* const containS = names.map((element) => {
    if (element.includes('s') || element.includes('S')) {
        return true
    }else {
        return false
    }
})

console.log(containS) */

//1.8
/* const indivisualProvince = names.reduce((obj, name, index) => {
    obj[name] = provinces[index]
    return obj
}, {})

console.log(indivisualProvince) */

//2
const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ]

//2.1
/* console.log(
    products.forEach(element => {
        console.log(element.product)
    })
) */

//2.2
/* const longerThan5 = products.filter(product => { 
    if (product.product.length > 5) {
        return product
    } 
})
console.log(
    longerThan5.forEach(element => {
        console.log(element.product)
})) */

//3
/* const filteredProducts = products
  .filter(product => product.price !== '' && !isNaN(product.price))
  .map(product => ({ ...product, price: Number(product.price) }))

const combinedPrice = filteredProducts.reduce((total, product) => total + product.price, 0)

console.log(combinedPrice) */

//4
/* const concatenatedNames = products.reduce((result, product, index) => {
    if (index === 0) {
      return product.product
    } else if (index === products.length - 1) {
      return result + ' and ' + product.product
    } else {
      return result + ', ' + product.product
    }
  }, '')
  
  console.log(concatenatedNames) */

//5
/* const { highest, lowest } = products.reduce((result, product) => {
    const price = Number(product.price)
    if (!isNaN(price)) {
      if (result.highest === null || price > result.highest.price) {
        result.highest = { price, name: product.product }
      }
      if (result.lowest === null || price < result.lowest.price) {
        result.lowest = { price, name: product.product }
      }
    }
    return result
  }, { highest: null, lowest: null })
  
  // Constructing the final string
  const resultString = `Highest: ${highest.name}. Lowest: ${lowest.name}.`
  
  console.log(resultString)  */ 

//6
const recreatedArray = products.map(entry =>
    Object.fromEntries(
      Object.entries(entry).map(([key, value]) => {
        if (key === 'product') {
          return ['name', value]
        } else if (key === 'price') {
          return ['cost', value]
        }
        return [key, value]
      })
    )
  )
  
  console.log(recreatedArray)