import { Meteor } from "meteor/meteor";
import { Template } from 'meteor/templating';

import is from "is";

import DctIr from "../../../api/rpi/server/dct_ir";

import { NUM_CELLS } from "../../../config/consts";

import "./ir_cells.html";
import "./ir_cells.css";

Template.irCells.onCreated(function() {
    this.subscribe("rpi.status.latest");
    this.subscribe("dct.ir.latest");
});

// Access parent helper?

Template.irCells.helpers({
    cells() {
        const data = DctIr.findOne() || {};
        const CELLS_PER_ROW = 8;
        const cells = [];

        for (let i = 0; i < NUM_CELLS; i++) {
            const index = Math.floor(i / CELLS_PER_ROW);
            const temp = is.number(data["cell" + i]) ? data["cell" + i] : -273;

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
        } else if (temp > 80) {
            return background
                .replace("0", "255")
                .replace("red", "255")
                .replace("blue", "255");
        } else {
            return background
                .replace("red", Math.round(temp/80 * 255))
                .replace("blue", Math.round(255 - temp/80 * 255));
        }
    }
});