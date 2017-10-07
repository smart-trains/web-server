/**
 * Created by ra on 4/10/2017.
 */
import mpg from 'meteor-pg';

// Required for remote connection to Heroku Postgres.
mpg.pgp.pg.defaults.ssl = true;