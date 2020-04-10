import { GameEngine, Actor } from './GameEngine';
import { DotEffect } from './DotEffect';

window.addEventListener("DOMContentLoaded", () => {
    const canvasElement = document.querySelector("canvas");
    canvasElement.width = document.documentElement.clientWidth;
    canvasElement.height = document.documentElement.clientHeight;
    
    console.log(canvasElement.width, canvasElement.height);

    const engine = new GameEngine(canvasElement);
    const dotEffect = new DotEffect(engine, 200);
    dotEffect.run();
});
