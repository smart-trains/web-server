import { Template } from 'meteor/templating';

import {
    Trains
} from "../../../api/client/collections";

import "./trainDashboard.html";
import "./trainDashboard.less";


Template.trainDashboard.onCreated(function() {
    this.subscribe("trains");
    this.subscribe("carriages");
    this.subscribe("lcu_status");
    this.subscribe("temperature");
    this.subscribe("humidity");
    this.subscribe("vibration");
    this.subscribe("temperature_matrix");
});

Template.trainDashboard.onRendered(function() {
    this.$(".ui.accordion").accordion();
});

Template.trainDashboard.helpers({
    trains() {
        return Trains.find({}, { sort: { name: 1 } });
    },
});