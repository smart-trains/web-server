import { Template } from 'meteor/templating';

import "./main.html";
import "./main.css";

Template.raspberryIp.helpers({
    latestIp() {
        return "123";
    }
});