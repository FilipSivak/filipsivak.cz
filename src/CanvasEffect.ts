export interface Vector {
    x: number,
    y: number
}

export interface Actor {
    setup: () => void,
    update: (ge: GameEngine, time: number) => void,
    render: (ge: GameEngine) => void
}

export class GameEngine {
    context2d: CanvasRenderingContext2D;    
    actors: Actor[];
    lastFrameTime: number;

    constructor(private canvas: HTMLCanvasElement) {
        this.context2d = canvas.getContext("2d");
        console.log("Canvas initialized!");
    }

    addActor(actor: Actor) {
        if(!actor) {
            throw "Cannot add null actor!";
        }
        this.actors.push(actor);
    }

    getActors() : Actor[] {
        return this.actors;
    }

    run(): void {
        this.lastFrameTime = Date.now();
        requestAnimationFrame(this.update);
    }

    update(): void {
        const elapsed = Date.now() - this.lastFrameTime;

        this.actors.forEach(actor => {
            actor.update(this, elapsed);
            actor.render(this);
        })
    
        this.lastFrameTime = Date.now();
        requestAnimationFrame(this.update); 
    }
}

