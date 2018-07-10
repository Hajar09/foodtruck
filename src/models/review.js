import mongoose from 'mongoose'
import {Truck} from './truck'

const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    title: String,
    text: String,
    foodtruck: {type: Schema.Types.ObjectId, ref:'Truck' }
})

const Review = mongoose.model('Review', ReviewSchema)

export { Review }