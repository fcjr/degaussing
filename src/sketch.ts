import p5 from "p5";
import { PLAYER_1 } from "@rcade/plugin-input-classic";

// Rcade game dimensions
const WIDTH = 336;
const HEIGHT = 262;

type Pattern = "white" | "red" | "green" | "blue" | "checkerboard";
const PATTERNS: Pattern[] = ["white", "red", "green", "blue", "checkerboard"];
const CHECKER_SIZE = 8;

const sketch = (p: p5) => {
    let index = 0;
    let prevLeft = false;
    let prevRight = false;

    p.setup = () => {
        p.createCanvas(WIDTH, HEIGHT);
        p.noStroke();
    };

    p.draw = () => {
        const left = PLAYER_1.DPAD.left;
        const right = PLAYER_1.DPAD.right;
        if (right && !prevRight) index = (index + 1) % PATTERNS.length;
        if (left && !prevLeft) index = (index - 1 + PATTERNS.length) % PATTERNS.length;
        prevLeft = left;
        prevRight = right;

        switch (PATTERNS[index]) {
            case "white":
                p.background(255);
                break;
            case "red":
                p.background(255, 0, 0);
                break;
            case "green":
                p.background(0, 255, 0);
                break;
            case "blue":
                p.background(0, 0, 255);
                break;
            case "checkerboard":
                p.background(0);
                p.fill(255);
                for (let y = 0; y < HEIGHT; y += CHECKER_SIZE) {
                    for (let x = 0; x < WIDTH; x += CHECKER_SIZE) {
                        if (((x + y) / CHECKER_SIZE) % 2 === 0) {
                            p.rect(x, y, CHECKER_SIZE, CHECKER_SIZE);
                        }
                    }
                }
                break;
        }
    };
};

new p5(sketch, document.getElementById("sketch")!);
