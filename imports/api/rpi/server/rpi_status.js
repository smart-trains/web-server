/**
 * Created by ra on 16/08/2017.
 */
import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema"

Meteor.methods({
    'insertRpiStatus': function(data) {
        const sql = `
            INSERT INTO lcu_status VALUES
            (default, ${data.trainId}, ${data.ssid}, ${data.ip}, ${data.datetime})
        `;

        mpg.query(sql);
    }
});

// Dummy Mongo output.
const RpiStatus = new Mongo.Collection('RpiStatus');
const name = "RpiStatus";

export default RpiStatus;
export { name };