/**
 * Created by ra on 8/10/2017.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import {
    Carriages,
    LCUStatus
} from "../../../api/client/collections";

import "./trainItem.html";
import "./trainItem.less";


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