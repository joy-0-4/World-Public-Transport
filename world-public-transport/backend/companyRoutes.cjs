const express = require("express")
const database = require("./connect.cjs")
const ObjectId = require("mongodb").ObjectId

let companyRoutes = express.Router()

// retrieve all
companyRoutes.route("/companies").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("companies").find({}).toArray()

    if (data.length > 0) {
        response.json(data)
    } else {
        throw new Error("Data was not found")
    }
})

// retrieve one
companyRoutes.route("/companies/:id").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("companies").findOne({_id: new ObjectId(request.params.id)})

    if (Object.keys(data).length > 0) {
        response.json(data)
    } else {
        throw new Error("Data was not found")
    }
})

// create one
companyRoutes.route("/companies").post(async (request, response) => {
    let db = database.getDb()
    let object = {
        country: request.body.country,
        city: request.body.city,
        company: request.body.company,
        bus: request.body.bus,
        train: request.body.train,
        subway: request.body.subway,
        tram: request.body.tram,
        boat: request.body.boat,
        plane: request.body.plane,
        cableCar: request.body.cableCar,
        bike: request.body.bike,
        website: request.body.website,
        tariff: request.body.tariff,
        rules: request.body.rules,
        zones: request.body.zones,
        accessible: request.body.accessible,
        tips: request.body.tips,
    }
    let data = await db.collection("companies").insertOne(object)
    response.json(data)
})

//update one
companyRoutes.route("/companies/:id").put(async (request, response) => {
    let db = database.getDb()
    let object = {
        $set: {
            country: request.body.country,
            city: request.body.city,
            company: request.body.company,
            bus: request.body.bus,
            train: request.body.train,
            subway: request.body.subway,
            tram: request.body.tram,
            boat: request.body.boat,
            plane: request.body.plane,
            cableCar: request.body.cableCar,
            bike: request.body.bike,
            website: request.body.website,
            tariff: request.body.tariff,
            rules: request.body.rules,
            zones: request.body.zones,
            accessible: request.body.accessible,
            tips: request.body.tips,
        }
    }
    let data = await db.collection("companies").updateOne({_id: new ObjectId(request.params.id)}, object)
    response.json(data)
})

module.exports = companyRoutes