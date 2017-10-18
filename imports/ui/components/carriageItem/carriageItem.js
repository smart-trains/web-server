/**
 * Created by ra on 8/10/2017.
 */
import { Template } from 'meteor/templating';

import "./carriageItem.html";
import "./carriageItem.less";

Template.carriageItem.helpers({
    backgroundClass() {
        return this.isActive ? "active" : "";
    },
    carriageImage() {
        return `car${(this.carriage.number_in_train__c - 1) % 3 + 1}`;
    },
    carriageClass() {
        return this.isOnline ? "online" : "";
    }
});
