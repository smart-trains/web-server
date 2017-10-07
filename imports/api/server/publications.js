/**
 * Created by ra on 16/08/2017.
 */
import { Meteor } from "meteor/meteor";

import mpg from "meteor-pg";


const defaultTrigger = () => true;

Meteor.publish('trains', function() {
    const sql = `
        SELECT id AS _id, name, sfid
        FROM train__c
        ORDER BY _id DESC
    `;

    const triggers = defaultTrigger;

    return mpg.select('trains', sql, undefined, triggers);
});

Meteor.publish('carriages', function() {
    const sql = `
        SELECT id AS _id, name, sfid, train__c, number_in_train__c
        FROM carriage__c
        ORDER BY _id DESC
    `;

    const triggers = defaultTrigger;

    return mpg.select('carriages', sql, undefined, triggers);
});