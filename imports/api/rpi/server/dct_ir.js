/**
 * Created by ra on 16/08/2017.
 */
import { Mongo } from "meteor/mongo";

import mpg from "meteor-pg";

import { NUM_CELLS } from "../../../config/consts";

// Meteor.methods({
//     'insertIr': function(data) {
//         let values = [data.carriageId, data.thermistor].join(", ");
//
//         for (let i = 0; i < NUM_CELLS; i++) {
//             values += `, ${data[`cell${i}`]}`;
//         }
//
//         values += `, ${data.recorded}`;
//
//         const sql = `
//             INSERT INTO temperature_matrix VALUES
//             (default, ${values})
//         `;
//
//         mpg.query(sql);
//     }
// });

// Dummy Mongo output.
const name = "DctIr";
const DctIr = new Mongo.Collection(name);

export default DctIr;
export { name };