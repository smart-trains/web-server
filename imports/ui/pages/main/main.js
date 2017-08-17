import { Meteor } from "meteor/meteor";
import { Template } from 'meteor/templating';

import RpiStatus from "../../../api/rpi/rpi_status";

import "./main.html";
import "./main.css";

Template.raspberryIp.onCreated(function() {
    this.subscribe("rpi.status.latest");
});

Template.raspberryIp.helpers({
    latestIp() {
        return RpiStatus.findOne() || {};
    },

    toDateString(dt) {
        return new Date(dt).toString();
    }
});