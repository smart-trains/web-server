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

