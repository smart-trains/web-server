/**
 * Created by ra on 16/08/2017.
 */
import { Meteor } from "meteor/meteor";

import mpg from "meteor-pg";

import { NUM_CELLS } from "../../config/consts";


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

Meteor.publish('lcu_status', function() {
    const sql = `
        SELECT id AS _id, name, sfid, train__c, ip__c, ssid__c, recorded_at__c
        FROM lcu_status__c
        ORDER BY _id DESC
        LIMIT 100
    `;

    const triggers = defaultTrigger;

    return mpg.select('lcu_status', sql, undefined, triggers);
});

Meteor.publish('temperature_matrix', function() {
    const cellNames = [];

    for (let i = 0; i < NUM_CELLS; i++) {
        cellNames.push(`cell_${i}__c`);
    }

    const fieldNames = cellNames.join(", ");

    const sql = `
        SELECT id AS _id, name, sfid, carriage__c, ${fieldNames}, recorded_at__c
        FROM temperature_matrix__c
        ORDER BY _id DESC
        LIMIT 50
    `;

    const triggers = defaultTrigger;

    return mpg.select('temperature_matrix', sql, undefined, triggers);
});

Meteor.publish('temperature', function() {
    const sql = `
        SELECT id AS _id, name, sfid, carriage__c, temperature__c, recorded_at__c
        FROM temperature__c
        ORDER BY _id DESC
        LIMIT 100
    `;

    const triggers = defaultTrigger;

    return mpg.select('temperature', sql, undefined, triggers);
});

Meteor.publish('humidity', function() {
    const sql = `
        SELECT id AS _id, name, sfid, carriage__c, humidity__c, recorded_at__c
        FROM humidity__c
        ORDER BY _id DESC
        LIMIT 100
    `;

    const triggers = defaultTrigger;

    return mpg.select('humidity', sql, undefined, triggers);
});

Meteor.publish('vibration', function() {
    const sql = `
        SELECT id AS _id, name, sfid, carriage__c, 
            acceleration_x__c, acceleration_y__c, acceleration_z__c,
            gyro_x__c, gyro_y__c, gyro_z__c,
            recorded_at__c
        FROM vibration__c
        ORDER BY _id DESC
        LIMIT 100
    `;

    const triggers = defaultTrigger;

    return mpg.select('vibration', sql, undefined, triggers);
});