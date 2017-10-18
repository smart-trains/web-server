CREATE TABLE account (
	account_id INTEGER,
	account_number VARCHAR(40),
	name VARCHAR(255),
	PRIMARY KEY (account_id)
);

CREATE TABLE train (
	train_id SERIAL,
	account_id INTEGER REFERENCES account(account_id),
	PRIMARY KEY (train_id)
);

CREATE TABLE carriage (
	carriage_id SERIAL,
	train_id INTEGER REFERENCES train(train_id),
	PRIMARY KEY (carriage_id)
);

CREATE TABLE lcu_status (
	lcu_status_id SERIAL,
	train_id INTEGER REFERENCES train(train_id),
	ssid VARCHAR(100),
	ip VARCHAR(15),
	PRIMARY KEY (lcu_status_id)
);

CREATE TABLE temperature_matrix (
	temperature_matrix_id SERIAL,
	carriage_id INTEGER REFERENCES carriage(carriage_id),
	thermistor REAL,
	cell_0 REAL,
	cell_1 REAL,
	cell_2 REAL,
	cell_3 REAL,
	cell_4 REAL,
	cell_5 REAL,
	cell_6 REAL,
	cell_7 REAL,
	cell_8 REAL,
	cell_9 REAL,
	cell_10 REAL,
	cell_11 REAL,
	cell_12 REAL,
	cell_13 REAL,
	cell_14 REAL,
	cell_15 REAL,
	cell_16 REAL,
	cell_17 REAL,
	cell_18 REAL,
	cell_19 REAL,
	cell_20 REAL,
	cell_21 REAL,
	cell_22 REAL,
	cell_23 REAL,
	cell_24 REAL,
	cell_25 REAL,
	cell_26 REAL,
	cell_27 REAL,
	cell_28 REAL,
	cell_29 REAL,
	cell_30 REAL,
	cell_31 REAL,
	cell_32 REAL,
	cell_33 REAL,
	cell_34 REAL,
	cell_35 REAL,
	cell_36 REAL,
	cell_37 REAL,
	cell_38 REAL,
	cell_39 REAL,
	cell_40 REAL,
	cell_41 REAL,
	cell_42 REAL,
	cell_43 REAL,
	cell_44 REAL,
	cell_45 REAL,
	cell_46 REAL,
	cell_47 REAL,
	cell_48 REAL,
	cell_49 REAL,
	cell_50 REAL,
	cell_51 REAL,
	cell_52 REAL,
	cell_53 REAL,
	cell_54 REAL,
	cell_55 REAL,
	cell_56 REAL,
	cell_57 REAL,
	cell_58 REAL,
	cell_59 REAL,
	cell_60 REAL,
	cell_61 REAL,
	cell_62 REAL,
	cell_63 REAL,
	recorded TIMESTAMP,
	PRIMARY KEY (temperature_matrix_id)
);

CREATE TABLE humidity (
	humidity_id SERIAL,
	carriage_id INTEGER REFERENCES carriage(carriage_id),
	humidity REAL,
	recorded TIMESTAMP,
	PRIMARY KEY (humidity_id)
);

CREATE TABLE temperature (
	temperature_id SERIAL,
	carriage_id INTEGER REFERENCES carriage(carriage_id),
	temperature REAL,
	recorded TIMESTAMP,
	PRIMARY KEY (temperature_id)
);

CREATE TABLE vibration (
	vibration_id SERIAL,
	carriage_id INTEGER REFERENCES carriage(carriage_id),
	vibration REAL,
	recorded TIMESTAMP,
	PRIMARY KEY (vibration_id)
);