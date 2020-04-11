import { Vector } from './VectorMath'
import { runInThisContext } from 'vm';

export interface Actor {
    id: number,
    engine: GameEngine,
    update: (time: number) => void,
    render: () => void
}

export class GameEngine {
    context2d: CanvasRenderingContext2D;    
    actors: Actor[] = [];
    lastFrameTime: number;

    mouseCurrent = new Vector(0, 0);
    mouseLastFrame = new Vector(0, 0);
    mouseDelta = new Vector(0, 0);

    scrollDelta = 0;
    scrollLastFramePosition = 0;

    constructor(public canvas: HTMLCanvasElement) {
        this.context2d = canvas.getContext("2d");

        document.addEventListener("mousemove", (event) => {
            this.mouseCurrent.x = event.pageX;
            this.mouseCurrent.y = event.pageY;
        })
    }

    addActor(actor: Actor) {
        if(!actor) {
            throw "Cannot add falsy actor!";
        }
        this.actors.push(actor);
        actor.id = this.actors.length;
    }

    getActors() : Actor[] {
        return this.actors;
    }

    run(): void {
        this.lastFrameTime = Date.now();
        requestAnimationFrame(this.update.bind(this));
    }

    update(): void {
        const elapsed = (Date.now() - this.lastFrameTime) / 1000;
        this.mouseDelta = this.mouseCurrent.copy().substract(this.mouseLastFrame);
        this.scrollDelta = window.scrollY - this.scrollLastFramePosition;
        
        // clear canvas
        this.context2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // render all actors
        this.actors.forEach(actor => {
            actor.update(elapsed);
            actor.render();
        })
    
        this.lastFrameTime = Date.now();
        this.mouseLastFrame = this.mouseCurrent.copy();
        this.scrollLastFramePosition = window.scrollY;
        requestAnimationFrame(this.update.bind(this)); 
    }
}

