import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1
let matches = books

//1
const createButton = ({ author, id, image, title }) => {
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

const starting = document.createDocumentFragment()
matches.slice(0, BOOKS_PER_PAGE).forEach( match => {
    starting.appendChild(createButton(match))
})
document.querySelector('[data-list-items]').appendChild(starting)

//2
const createOptionElement = (value, text) => {
    const option = document.createElement('option')
    option.value = value
    option.innerText = text
    return option
}

const getGenresAndAuthors = (data, dropDownSelector, allText) => {
    const genreAndAuthorsHtml = document.createDocumentFragment()
    genreAndAuthorsHtml.appendChild(createOptionElement('any', allText))

    Object.entries(data).forEach(([id, name]) => {
        genreAndAuthorsHtml.appendChild(createOptionElement(id, name))
    })
    document.querySelector(dropDownSelector).appendChild(genreAndAuthorsHtml)
}

getGenresAndAuthors(genres, '[data-search-genres]', 'All Genres')
getGenresAndAuthors(authors, '[data-search-authors]', 'All Authors')

//3
const setTheme = (theme, darkColor, lightColor) => {
    const themeElement = document.querySelector('[data-settings-theme]')
    const rootStyle = document.documentElement.style

    themeElement.value = theme
    rootStyle.setProperty('--color-dark', darkColor)
    rootStyle.setProperty('--color-light', lightColor)
}

const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

if (isDarkMode) {
    setTheme('night', '255, 255, 255', '10, 10, 20')
} else {
    setTheme('day', '10, 10, 20', '255, 255, 255')
}

//4 - No abstraction
const dataListButton = document.querySelector('[data-list-button]')
dataListButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
dataListButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0
dataListButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`

//5
const addToggleEventListener = (triggerSelector, targetSelector, isOpen = true, focusSelector = null) => {
    document.querySelector(triggerSelector).addEventListener('click', () => {
        const target = document.querySelector(targetSelector)
        
        if (target) {
            target.open = isOpen

            if (focusSelector) {
                const focusElement = document.querySelector(focusSelector)
                if (focusElement) focusElement.focus()
            }
        }
    })
}

// Usage
addToggleEventListener('[data-search-cancel]', '[data-search-overlay]', false);
addToggleEventListener('[data-settings-cancel]', '[data-settings-overlay]', false);
addToggleEventListener('[data-header-search]', '[data-search-overlay]', true, '[data-search-title]');
addToggleEventListener('[data-header-settings]', '[data-settings-overlay]', true);
addToggleEventListener('[data-list-close]', '[data-list-active]', false);

//6
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

// Usage
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
