/**
 * Created by ra on 4/10/2017.
 */
import mpg from 'meteor-pg';

const setSchema = Meteor.bindEnvironment(() => mpg.none('SET search_path TO app'));
setInterval(setSchema, 1000);