/**
 * Created by ra on 16/08/2017.
 */
import { Meteor } from "meteor/meteor";

import mpg from "meteor-pg";

import { name as ir_name } from "./dct_ir";
import { name as status_name } from "./rpi_status";

// Meteor.publish('rpi.status.latest', function() {
//     const sql = `
//     SELECT id AS _id, *
//     FROM rpi_status
//     ORDER BY datetime DESC
//     LIMIT 1
//   `;
//
//     function triggers() {
//         // This function is rather important.
//         // For now, just trigger any change
//         return true;
//     }
//
//     return mpg.select(status_name, sql, undefined, triggers);
// });
//
// Meteor.publish('dct.ir.latest', function() {
//     const sql = `
//     SELECT id AS _id, *
//     FROM temperature_matrix
//     ORDER BY datetime DESC
//     LIMIT 1
//   `;
//
//     function triggers() {
//         // This function is rather important.
//         // For now, just trigger any change
//         return true;
//     }
//
//     return mpg.select(ir_name, sql, undefined, triggers);
// });

Meteor.publish('trains', function() {
    const sql = `
    SELECT id AS _id, name
    FROM app.train__c
    ORDER BY createddate DESC
  `;

    function triggers() {
        // This function is rather important.
        // For now, just trigger any change
        return true;
    }

    return mpg.select('trains', sql, undefined, triggers);
});