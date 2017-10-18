/**
 * Created by ra on 8/10/2017.
 */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import {
    Carriages,
    LCUStatus,
    Temperature
} from "../../../api/client/collections";

import "./trainItem.html";
import "./trainItem.less";


Template.trainItem.onCreated(function() {
    this.activeCarriageId = new ReactiveVar("");
    this.updateIsOnlineToken = new ReactiveVar(false);

    // Update isOnline every second
    setInterval(() => this.updateIsOnlineToken.set(true), 1000);
});

Template.trainItem.helpers({
    lcuStatus() {
        return LCUStatus.find({ train__c: this.sfid }, { sort: { recorded_at__c: -1 } }).fetch()[0];
    },
    carriages() {
        return Carriages.find({ train__c: this.sfid }, { sort: { number_in_train__c: 1 } })
    },
    isActive(carriage) {
        return carriage.sfid === Template.instance().activeCarriageId.get();
    },
    isOnline(carriage) {
        const { recorded_at__c } = Temperature.find({ carriage__c: carriage.sfid }, { sort: { recorded_at__c: -1 } }).fetch()[0];

        const tokenValue = Template.instance().updateIsOnlineToken.get();

        console.log(tokenValue);
        if (tokenValue) {
            Template.instance().updateIsOnlineToken.set(false);
        }

        // Data reported within last 10s
        return new Date() - new Date(recorded_at__c) < 10000;
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