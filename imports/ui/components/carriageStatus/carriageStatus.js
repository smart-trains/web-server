/**
 * Created by ra on 8/10/2017.
 */
import { Template } from 'meteor/templating';

import is from "is";

import {
    Temperature,
    TemperatureMatrix,
    Humidity,
    Vibration
} from "../../../api/client/collections";

import { NUM_CELLS } from "../../../config/consts";

import "./carriageStatus.html";
import "./carriageStatus.less";


Template.carriageStatus.helpers({
    temperature() {
        const latestTemperature = Temperature.find({
                carriage__c: this.sfid
            }, {
                sort: { recorded_at__c: -1 },
                limit: 1
            }).fetch()[0] || {};

        const temperature = latestTemperature.temperature__c
            ? latestTemperature.temperature__c.toFixed(2)
            : "";

        return temperature;
    },
    humidity() {
        const latestHumidity = Humidity.find({
                carriage__c: this.sfid
            }, {
                sort: { recorded_at__c: -1 },
                limit: 1
            }).fetch()[0] || {};

        const humidity = latestHumidity.humidity__c
            ? latestHumidity.humidity__c.toFixed(2)
            : "";

        return humidity;
    },
    vibration() {
        const {
            acceleration_x__c,
            acceleration_y__c,
            acceleration_z__c,
            gyro_x__c,
            gyro_y__c,
            gyro_z__c,
        } = Vibration.find({
                carriage__c: this.sfid
            }, {
                sort: { recorded_at__c: -1 },
                limit: 1
            }).fetch()[0] || {};

        return {
            accelX: acceleration_x__c.toFixed(2),
            accelY: acceleration_y__c.toFixed(2),
            accelZ: acceleration_z__c.toFixed(2),
            gyroX: gyro_x__c.toFixed(2),
            gyroY: gyro_y__c.toFixed(2),
            gyroZ: gyro_z__c.toFixed(2),
        };
    },
    isCongested() {
        const data = TemperatureMatrix.find({
            carriage__c: this.sfid
        }, {
            sort: { recorded_at__c: -1 },
            limit: 1
        }).fetch()[0];
        const env = is.number(data["thermistor__c"]) ? data["thermistor__c"] : -273;
        let numOfOccupiedCells = 0;

        const temps = [];

        for (let i = 0; i < NUM_CELLS; i++) {
            const temp = is.number(data["cell_" + i + "__c"]) ? data["cell_" + i + "__c"] : -273;
            temps.push(temp);
        }

        temps.sort((i1, i2) => i1 - i2);

        const average = temps.reduce((sum, item) => sum += item, 0) / temps.length;

        for (let i = 0; i < NUM_CELLS; i++) {
            if (temps[i] > average) {
                numOfOccupiedCells++;
            }
        }

        return numOfOccupiedCells > 6
            ? "Yes"
            : "No";

    },
    isVibration() {
        const acceleration = Vibration.find({
            carriage__c: this.sfid
        }, {
            sort: { recorded_at__c: -1 },
            limit: 2
        }).fetch();

        const change = Math.abs(parseFloat(acceleration[1].acceleration_z__c) - parseFloat(acceleration[0].acceleration_z__c));

        return change > 0.05
            ? "Yes"
            : "No";
    }
});