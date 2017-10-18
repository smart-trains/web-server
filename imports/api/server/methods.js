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
    'data_insert'(data) {
        const types = [
            'temperature_matrix',
            'temperature',
            'humidity',
            'vibration',
        ];

        console.log(data);

        for (let type of types) {
            const dataOfType = data[type];

            if (dataOfType) {
                console.log(dataOfType);
                dataOfType.carriage__c = data.carriage__c;
                dataOfType.recorded_at__c = data.recorded_at__c;
                Meteor.call(`${type}_insert`, dataOfType);
            }
        }
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
    },
    'temperature_insert'(data) {
        const sql = `
        INSERT INTO temperature__c
        (carriage__c, temperature__c, recorded_at__c)
        VALUES
        ($[carriage__c], $[temperature__c], $[recorded_at__c])
        `;

        mpg.none(sql, data);
    },
    'humidity_insert'(data) {
        const sql = `
        INSERT INTO humidity__c
        (carriage__c, humidity__c, recorded_at__c)
        VALUES
        ($[carriage__c], $[humidity__c], $[recorded_at__c])
        `;

        mpg.none(sql, data);
    },
    'vibration_insert'(data) {
        const sql = `
        INSERT INTO vibration__c
        (carriage__c, acceleration_x__c, acceleration_y__c, acceleration_z__c, 
        gyro_x__c, gyro_x__c, gyro_z__c, recorded_at__c)
        VALUES
        ($[carriage__c], $[acceleration_x__c], $[acceleration_y__c], $[acceleration_z__c], 
        $[gyro_x__c], $[gyro_y__c], $[gyro_z__c], $[recorded_at__c])
        `;

        mpg.none(sql, data);
    }
});