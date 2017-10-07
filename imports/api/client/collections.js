/**
 * Created by ra on 7/10/2017.
 */
import { Mongo } from "meteor/mongo";

const Trains = new Mongo.Collection('trains');
const Carriages = new Mongo.Collection('carriages');

export {
    Trains,
    Carriages
};