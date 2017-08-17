/**
 * Created by ra on 16/08/2017.
 */
import { Meteor } from "meteor/meteor";
import RpiStatus from "../rpi_status";
import DctIr from "../dct_ir";

Meteor.publish('rpi.status.latest', function() {
    return RpiStatus.find({}, {
        sort: { datetime: -1 },
        limit: 1
    });
});

Meteor.publish('dct.ir.latest', function() {
    return DctIr.find({}, {
        sort: { datetime: -1 },
        limit: 1
    });
});