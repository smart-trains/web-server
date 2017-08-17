/**
 * Created by ra on 16/08/2017.
 */
import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema"

const RpiStatus = new Mongo.Collection('RpiStatus');

RpiStatus.schema = new SimpleSchema({
    ssid: {type: String},
    ip: {type: String},
    datatime: {type: Number}
});

export default RpiStatus;