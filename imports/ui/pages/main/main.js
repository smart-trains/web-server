import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { Template } from "meteor/templating";
import { ReactiveVar } from 'meteor/reactive-var';

import {
    Trains,
    Carriages,
    LCUStatus
} from "../../../api/client/collections";

import "./main.less";
import "./main.html";


Template.trainDashboard.onCreated(function() {
    this.subscribe("trains");
    this.subscribe("carriages");
    this.subscribe("lcu_status");
});

Template.trainDashboard.onRendered(function() {
    this.$(".ui.accordion").accordion();
});

Template.trainDashboard.helpers({
    trains() {
        return Trains.find({}, { sort: { name: 1 } });
    },
});

Template.trainItem.onCreated(function() {
    this.activeCarriageId = new ReactiveVar("");
});

Template.trainItem.helpers({
    lcuStatus() {
        return LCUStatus.find({ train__c: this.sfid }, { sort: { recorded_at__c: -1 } }).fetch()[0];
    },
    carriages() {
        return Carriages.find({ train__c: this.sfid }, {sort: { number_in_train__c: 1}})
    },
    isActive(carriage) {
        return carriage.sfid === Template.instance().activeCarriageId.get();
    },
    activeCarriageId() {
        return Template.instance().activeCarriageId.get();
    }
});

Template.trainItem.events({
    "click .carriage"(e) {
        Template.instance().activeCarriageId.set(this.carriage.sfid);
    }
});

Template.carriageItem.helpers({
    backgroundClass() {
        return this.isActive ? "active" : "";
    },
    carriageImage() {
        return `car${(this.carriage.number_in_train__c - 1) % 3 + 1}`;
    },
});
