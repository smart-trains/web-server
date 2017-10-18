import { Template } from 'meteor/templating';

import is from "is";

import {
    TemperatureMatrix
} from "../../../api/client/collections";

import { NUM_CELLS } from "../../../config/consts";

import "./irCells.html";
import "./irCells.less";


Template.irCells.helpers({
    cells() {
        const data = TemperatureMatrix.find({
                    carriage__c: this.sfid
                }, {
                    sort: { recorded_at__c: -1 },
                    limit: 1
                }).fetch()[0] || {};
        // const data = {};
        //
        // for (let i = 0; i < NUM_CELLS; i++) {
        //     data["cell" + i] = parseFloat((20 + (Math.random() * 10 - 2.5)).toFixed(2));
        // }


        const CELLS_PER_ROW = 8;
        const cells = [];

        for (let i = 0; i < NUM_CELLS; i++) {
            const index = Math.floor(i / CELLS_PER_ROW);
            const temp = is.number(data["cell_" + i + "__c"]) ? data["cell_" + i + "__c"] : -273;

            if (i % CELLS_PER_ROW === 0) {
                cells[index] = [temp];
            } else {
                cells[index].push(temp);
            }

        }

        return cells;
    }
});

Template.irCellsRows.helpers({
    color(temp) {
        const background = "background: rgb(red, 0, blue)";

        if (temp < 0) {
            return background
                .replace("red", "0")
                .replace("blue", "0");
        } else if (temp > 50) {
            return background
                .replace("0", "255")
                .replace("red", "255")
                .replace("blue", "255");
        } else {
            return background
                .replace("red", Math.round(temp / 50 * 255))
                .replace("blue", Math.round(255 - temp / 50 * 255));
        }
    }
});