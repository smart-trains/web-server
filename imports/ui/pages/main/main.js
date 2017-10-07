import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { Template } from "meteor/templating";
import { ReactiveVar } from 'meteor/reactive-var';

import { Trains, Carriages } from "../../../api/client/collections";

import "./main.less";
import "./main.html";


Template.trainDashboard.onCreated(function() {
    this.subscribe("trains");
    this.subscribe("carriages");
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
    carriages(trainId) {
        return Carriages.find({ train__c: trainId }, {sort: { number_in_train__c: 1}})
    },
    activeCarriageId() {
        console.log(Template.instance().activeCarriageId.get());
        return Template.instance().activeCarriageId.get();
    }
});

Template.trainItem.events({
    "click .carriage"(e) {
        Template.instance().activeCarriageId.set(this.sfid);
    }
});

Template.carriageItem.helpers({
    carriageImage(numberInTrain) {
        return `car${(numberInTrain - 1) % 3 + 1}`;
    },
});
