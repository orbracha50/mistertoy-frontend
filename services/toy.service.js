import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toyDB'
_createToys()
export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyTodo,
    getDefaultFilter,
    getFilterFromSearchParams,
}
// For Debug (easy access from console):
window.cs = toyService

function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        .then(todos => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                todos = todos.filter(todo => regExp.test(todo.txt))
            }
            return todos
        })
}

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
        .then(todo => {
            return todo
        })
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        // TODO - updatable fields
        toy.updatedAt = Date.now()
        return storageService.put(TOY_KEY, toy)
    } else {
        toy.createdAt = toy.updatedAt = Date.now()

        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyTodo(txt = '', price = 100) {
    const toy = {
        name: txt,
        price,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
    }
}

function getDefaultFilter() {
    return { txt: '', importance: 0 }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}
function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        for (let i = 0; i < 20; i++) {

            toys.push(_createToy())
        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy() {
    const toy = {}
    toy._id = utilService.makeId()
    toy.name = utilService.makeLorem(1)
    toy.price = utilService.getRandomIntInclusive(50, 500)
    toy.labels = []
    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return toy
}


