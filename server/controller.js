const houses = require('./db.json')
let nextId = 4

module.exports = {
    getHouses: (req, res) => {
        res.send(houses)
    },
    deleteHouse: (req, res) => {
        const deleteId = req.params.id
        let index = houses.findIndex((e) => e.id === +deleteId)
        houses.splice(index, 1)
        res.send(houses)
    },
    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body

        let newHouse = {
            id: nextId,
            address,
            price,
            imageURL
        }
        houses.push(newHouse)
        res.send(houses)
        nextId++
    },
    updateHouse: (req, res) => {
        const {id} = req.params
        const {type} = req.body
        let index = houses.findIndex((e) => e.id === +id)

        if (type === 'plus') {
            houses[index].price += 10000
            res.send(houses)
        } else if (type === 'minus') {
            houses[index].price -= 10000
            res.send(houses)
        } else {
            res.sendStatus(400)
        }
    }
}