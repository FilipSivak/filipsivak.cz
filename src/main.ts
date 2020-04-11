import { GameEngine, Actor } from './GameEngine';
import { DotEffect } from './DotEffect';

window.addEventListener("DOMContentLoaded", () => {
    const canvasElement = document.querySelector("canvas");
    canvasElement.width = document.body.clientWidth;
    canvasElement.height = document.body.clientHeight;

    const engine = new GameEngine(canvasElement);
    const dotEffect = new DotEffect(engine, 200);
    dotEffect.run();

    window.addEventListener("resize", (event) => {
        canvasElement.width = document.body.clientWidth;
        canvasElement.height = document.body.clientHeight;
    });

    // bugfix
    window.setTimeout(() => {
        canvasElement.width = document.body.clientWidth;
        canvasElement.height = document.body.clientHeight;
    }, 500);
});

console.log("%cLike the code? Consider hiring me at sivakfil@gmail.com!", "background: red; color: yellow; font-size: x-large");
