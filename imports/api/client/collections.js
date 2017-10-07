/**
 * Created by ra on 7/10/2017.
 */
import { Mongo } from "meteor/mongo";

export const Trains = new Mongo.Collection('trains');
export const Carriages = new Mongo.Collection('carriages');
export const LCUStatus = new Mongo.Collection('lcu_status');
export const TemperatureMatrix = new Mongo.Collection('temperature_matrix');
export const Temperature = new Mongo.Collection('temperature');
export const Humidity = new Mongo.Collection('humidity');
export const Vibration = new Mongo.Collection('vibration');