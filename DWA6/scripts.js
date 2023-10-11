import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1
let matches = books //Array of book objects

/**
 * Creates a book item element for a given match object.
 * 
 * @param {Object} match - The match object containing information about a book.
 * @param {string} match.author - The author of the book.
 * @param {string} match.id - The unique id of the book.
 * @param {string} match.image - The URL of the books cover image of the book.
 * @param {string} match.tittle - The tittle of the book.  
 * @returns {HTMLButtonElement} - A button element representing the book with its details.
 */

const createBookItem = (book) => {
    const { author, id, image, title } = book
    const element = document.createElement('button')
    element.classList ='preview'
    element.setAttribute('data-preview', id)
    element.innerHTML = `
    <img class="preview__image" src="${image}"/>
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `
    return element
} 

/**
 * The starting point for creating a list of book items based on matches.
 */
const starting = document.createDocumentFragment()
/**
 * Iterates over a subset of matches, creates book items for each match, and appends them to the starting document fragment.
 */
matches.slice(0, BOOKS_PER_PAGE).forEach( book => {starting.appendChild(createBookItem(book))})
document.querySelector('[data-list-items]').appendChild(starting)


/**
 * Creates an HTML <option> element with specified value and text content. 
 * 
 * @param {string} value - The value associated with the option element.
 * @param {string} text - The visible text or label for the option.
 * @returns {HTMLOptionElement} A newly created <option> element.   
 */
const createOptionElement = (value, text) => {
    const option = document.createElement('option')
    option.value = value
    option.innerText = text
    return option
}


/**
 * Populates a dropdown (select) element with options based on the provided data.
 * 
 * @param {object} data - An object containing key-value pairs to create dropdown options. 
 * @param {string} dropDownSelector - The CSS selector for the dropdown element in the document.  
 * @param {string} allText - The text to be displayed for the default option.
 * @returns {void} This function does not return a value directly, it populates the specified dropdown. 
 */
const populateDropdownWithOptions = (data, dropDownSelector, allText) => {
    const fragment = document.createDocumentFragment()
    fragment.appendChild(createOptionElement('any', allText))

    Object.entries(data).forEach(([id, name]) => {
        fragment.appendChild(createOptionElement(id, name))
    })
    document.querySelector(dropDownSelector).appendChild(fragment)
}

populateDropdownWithOptions(genres, '[data-search-genres]', 'All Genres')
populateDropdownWithOptions(authors, '[data-search-authors]', 'All Authors')


/**
 * Sets the theme, dark dark color, and light color for a web application.
 * 
 * @param {string} theme - The theme name, e.g., 'day' or 'night'.
 * @param {string} darkColor - The dark color in rgb format, e.g., '10, 10, 10'.
 * @param {string} lightColor - The dark color in rgb format, e.g., '255, 255, 255'.
 */
const applyThemeSettings = (theme, darkColor, lightColor) => {
    const themeElement = document.querySelector('[data-settings-theme]')
    const rootStyle = document.documentElement.style

    themeElement.value = theme
    rootStyle.setProperty('--color-dark', darkColor)
    rootStyle.setProperty('--color-light', lightColor)
}

const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

if (isDarkMode) {
    applyThemeSettings('night', '255, 255, 255', '10, 10, 20')
} else {
    applyThemeSettings('day', '10, 10, 20', '255, 255, 255')
}

/**
 * Configure and update the behavior and content of a "Show more" button in a list view. 
 */
const dataListButton = document.querySelector('[data-list-button]')
dataListButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
dataListButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0
dataListButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${dataListButton.disabled ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`


document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false
})

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false
})

document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true 
    document.querySelector('[data-search-title]').focus()
})

document.querySelector('[data-header-settings]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true 
})

document.querySelector('[data-list-close]').addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false
})


/**
 * Sets the theme-related colors for a web page based on the chosen theme.
 * 
 * @param {string} theme 
 */
const setThemeColors = (theme) => {
    const rootStyle = document.documentElement.style
    
    if (theme === 'night') {
        rootStyle.setProperty('--color-dark', '255, 255, 255')
        rootStyle.setProperty('--color-light', '10, 10, 20')
    } else {
        rootStyle.setProperty('--color-dark', '10, 10, 20')
        rootStyle.setProperty('--color-light', '255, 255, 255')
    }
}

const handleSettingsFormSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    setThemeColors(theme)
    
    document.querySelector('[data-settings-overlay]').open = false
}

// Usage: Add a form submission event listener to apply theme settings.
document.querySelector('[data-settings-form]').addEventListener('submit', handleSettingsFormSubmit)


//7
const getFilteredBooks = (filters) => {
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'
        
        for (const singleGenre of book.genres) {
            if (genreMatch) break
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    return result
}

const displayBooks = (result) => {
    const newItems = document.createDocumentFragment()

    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img class="preview__image" src="${image}" />
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        newItems.appendChild(element)
    }

    document.querySelector('[data-list-items]').innerHTML = ''
    document.querySelector('[data-list-items]').appendChild(newItems)
}

const handleSearchFormSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)

    const result = getFilteredBooks(filters)
    displayBooks(result)

    document.querySelector('[data-list-message]').classList[result.length < 1 ? 'add' : 'remove']('list__message_show')

    matches = result
    page = 1

    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1
    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining">(${remainingCount(matches.length, page)})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'})
    document.querySelector('[data-search-overlay]').open = false
}

// Helper function for remaining count
const remainingCount = (matchesCount, currentPage) => {
    const remaining = matchesCount - (currentPage * BOOKS_PER_PAGE)
    return remaining > 0 ? remaining : 0
}

// Usage
document.querySelector('[data-search-form]').addEventListener('submit', handleSearchFormSubmit)

//8
// Function to create an individual book button element
const createBookButtonElement = ({ author, id, image, title }) => {
    const element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)
    element.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `
    return element
}

// Function to get a subset of books based on the current page
const getBooksForPage = (matches, page) => {
    return matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)
}

// Function to append more books to the list
const appendBooksToList = (books) => {
    const fragment = document.createDocumentFragment()

    for (const book of books) {
        const element = createBookButtonElement(book)
        fragment.appendChild(element)
    }

    document.querySelector('[data-list-items]').appendChild(fragment)
    page += 1
}

// Event listener for the button click
document.querySelector('[data-list-button]').addEventListener('click', () => {
    const booksForCurrentPage = getBooksForPage(matches, page)
    appendBooksToList(booksForCurrentPage)
})


//9
// Function to extract the clicked book node from the event path
const getClickedBookNode = (pathArray) => {
    for (const node of pathArray) {
        if (node?.dataset?.preview) {
            return node
        }
    }
    return null
}

// Function to get the book object using its ID
const getBookFromId = (bookId) => {
    for (const singleBook of books) {
        if (singleBook.id === bookId) return singleBook
    }
    return null
}

// Function to display the details of the book in the relevant DOM elements
const displayBookDetails = (active) => {
    document.querySelector('[data-list-active]').open = true
    document.querySelector('[data-list-blur]').src = active.image
    document.querySelector('[data-list-image]').src = active.image
    document.querySelector('[data-list-title]').innerText = active.title
    document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
    document.querySelector('[data-list-description]').innerText = active.description
}

// Event listener for the click event on the list items
document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    const clickedBookNode = getClickedBookNode(pathArray)
    
    if (clickedBookNode) {
        const active = getBookFromId(clickedBookNode.dataset.preview)
        if (active) {
            displayBookDetails(active)
        }
    }
})
