/**
 * Created by ra on 16/08/2017.
 */
import { Meteor } from "meteor/meteor";

import mpg from "meteor-pg";

const setSchema = () => mpg.none('SET search_path TO app');

Meteor.publish('trains', function() {
    setSchema();

    const sql = `
        SELECT id AS _id, name
        FROM train__c
        ORDER BY _id DESC
        LIMIT 1
    `;

    function triggers() {
        return true;
    }

    return mpg.select('trains', sql, undefined, triggers);
});