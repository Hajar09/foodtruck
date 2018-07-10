import mongoose from "mongoose"
import {Review} from './review'
const Schema = mongoose.Schema 


const truckSchema = new Schema ({
    name: {type: String},
    description: {type: String},
    speciality: {type: String},
    reviews: [{type: Schema.Types.ObjectId, ref:"Review"}]
})

const Truck = mongoose.model('Truck', truckSchema)
export { Truck }