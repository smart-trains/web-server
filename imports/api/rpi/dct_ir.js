/**
 * Created by ra on 16/08/2017.
 */
import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema"

import { NUM_CELLS } from "../../config/consts";

const DctIr = new Mongo.Collection('DctIr');

const schema = {
    address: {type: String},
    temp: {type: Number},
    datatime: {type: Number},
};

for (let i = 0; i < NUM_CELLS; i++) {
    schema["cell" + i] = {type: Number};
}

DctIr.schema = new SimpleSchema(schema);

export default DctIr;