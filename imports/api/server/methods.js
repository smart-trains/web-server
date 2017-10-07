/**
 * Created by ra on 7/10/2017.
 */
import { Meteor } from "meteor/meteor";

import mpg from "meteor-pg";

import { NUM_CELLS } from "../../config/consts";


Meteor.methods({
    'lcu_status_insert'(data) {
        const sql = `
        INSERT INTO lcu_status__c
        (train__c, ssid__c, ip__c, recorded_at__c)
        VALUES
        ($[train__c], $[ssid__c], $[ip__c], $[recorded_at__c])
        `;

        mpg.none(sql, data);
    },
    'temperature_matrix_insert'(data) {
        const cellNames = [];

        for (let i = 0; i < NUM_CELLS; i++) {
            cellNames.push(`cell_${i}__c`);
        }

        const fieldNames = cellNames.join(", ");
        const valueNames = cellNames.map(name => `$[${name}]`).join(", ");

        const sql = `
        INSERT INTO temperature_matrix__c
        (carriage__c, thermistor__c, recorded_at__c, ${fieldNames})
        VALUES
        ($[carriage__c], $[thermistor__c], $[recorded_at__c], ${valueNames})
        `;

        mpg.none(sql, data);
    }
});