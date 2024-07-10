import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'


const TOY_KEY = 'toyDB'
const BASE_URL = 'toy/'

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]
/* _createToys() */
export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    getToyLabels,
    mapLabels,
    precentefStockByLabel
}
// For Debug (easy access from console):
window.cs = toyService

function query(filterBy = {}, sortBy, pageIdx) {
    return httpService.get(BASE_URL, { filterBy, sortBy, pageIdx })

}
function getToyLabels() {
    return [...labels]
}
function mapLabels(label, toys) {
    if (toys.length === 0) return
    var sum = 0
    toys.forEach(toy => {
        if (toy.labels.includes(label)) {
            sum += toy.price

        }
    })
    return sum
}

function precentefStockByLabel(label,toys){
    if (toys.length === 0) return
    console.log(toys,label)
    var toysInstock = 0
    toys.forEach(toy => {
        if (toy.labels.includes(label)&& toy.inStock) {
            toysInstock++
            console.log(toysInstock)
        }
    })
    return Math.round((toysInstock/toys.length)*100)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    const method = toy._id ? 'put' : 'post'
    return httpService[method](BASE_URL, toy)
    /* if (toy._id) {
        toy.updatedAt = Date.now()
        return storageService.put(TOY_KEY, toy)
    } else {
        toy.createdAt = toy.updatedAt = Date.now()

        return storageService.post(TOY_KEY, toy)
    } */
}

function getEmptyToy(txt = '', price = 0) {
    const toy = {
        name: txt,
        price,
        labels: [],
        createdAt: Date.now(),
        inStock: true
    }
    return toy
}

function getDefaultFilter() {
    return { name: '', stock: '', labels: [], sortBy: '' }
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
    toy.labels = utilService.makeLabel()
    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    toy.inStock = true
    return toy
}


