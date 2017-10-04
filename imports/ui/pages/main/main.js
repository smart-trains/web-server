import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { Template } from 'meteor/templating';

//import RpiStatus from "../../../api/rpi/server/rpi_status";

import "./main.html";
import "./main.css";

const Train = new Mongo.Collection('trains');

// Template.raspberryIp.onCreated(function() {
//     this.subscribe("rpi.status.latest");
// });
//
// Template.raspberryIp.helpers({
//     latestIp() {
//         return RpiStatus.findOne() || {};
//     },
//
//     toDateString(dt) {
//         return new Date(dt).toString();
//     }
// });

Template.train.onCreated(function() {
    this.subscribe("trains");
});

Template.train.helpers({
    train() {
        return Train.findOne() || {};
    },
});