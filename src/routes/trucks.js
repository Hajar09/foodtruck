import express from "express"
const truckRouter = express.Router()
import { Truck } from "../models/truck"
import { Review } from "../models/review"

//accès à nos foodtruck
truckRouter.get('/', (req, res) => {
    Truck.find({}, (err, trucks) => {
        if (err) res.send(err)
        res.json(trucks)
    })
});


//ajout d'un foodtruck
truckRouter.post('/add', (req, res) => {
    const newTruck = new Truck(req.body)
    newTruck.save((err, truck) => {
        if (err) res.send(err)
        res.json(truck)
        res.redirect('/food-truck/')
    })
})

//la route sur laquelle notre id est accessible
truckRouter.get('/:id', (req, res) => {
    let _id = req.params.id;
    Truck.findById({_id}, (err, truck) => {
        if(err) res.send(err)
        res.json(truck)
    })
})

//change a foodtruck -->/food-truck/:id
truckRouter.put('/:id', (req, res) => {
    Truck.findById({
        _id: req.params.id
    }, (err, truck) => {
        if (err) res.send(err)
        Object.assign(truck, req.body).save((err, truck) => {
            if (err) res.send(err)
            res.json({
                message: "foodtruck updated",
                truck
            })
        })
    })
    /*Truck.findById(req.params.id, (err, truck) => {
        if(err) res.send(err)
        truck.name = req.body.name;
        truck.description = req.body.description;
        truck.speciality = req.body.speciality
        truck.save((err) => {
            if(err) res.send(err)
            res.json({message: "foodtruck uploaded"})
        })
    })*/
})

//delete a foodtruck : /food-truck/:id

truckRouter.delete('/:id', (req, res) => {
    Truck.remove({_id: req.params.id}, (err, truck) => {
        if(err) res.send(err)
        res.json({message: "foodtruck successfully deleted!", truck})
    })
})


//add review by specific foodtruck id -->/food-truck/review/add/:id
truckRouter.post('/review/add/:id', (req, res) => {
    Truck.findById(req.params.id, (err, truck) => {
        if(err) res.send(err)
        const newReview = new Review(req.body)
        newReview.save((err, review) => {
            if(err) res.send(err)
            truck.reviews.push(newReview)
            truck.save((err, review) => {
                if(err) res.send(err)
                res.json({message: "ajout de la review ok", review})
            })
        })
    })
})

//faire un get pour avoir accès aux reviews


export { truckRouter }
