/**
 * Created by ra on 8/10/2017.
 */
import { Template } from 'meteor/templating';

import {
    Temperature,
    Humidity,
    Vibration
} from "../../../api/client/collections";

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
    isVibration() {
        const acceleration = Vibration.find({
            carriage__c: this.sfid
        }, {
            sort: { recorded_at__c: -1 },
            limit: 2
        }).fetch();

        const change = Math.abs(acceleration[1].accelZ - acceleration[0].accelZ);

        return change > 0.3
            ? "Yes"
            : "No";
    }
});