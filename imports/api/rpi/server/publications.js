/**
 * Created by ra on 16/08/2017.
 */
import { Meteor } from "meteor/meteor";

import mpg from "meteor-pg";

Meteor.publish('trains', function() {
    const sql = `
        SELECT id AS _id, name
        FROM app.train__c
        ORDER BY _id DESC
    `;

    function triggers() {
        return true;
    }

    return mpg.select('trains', sql, undefined, triggers);
});