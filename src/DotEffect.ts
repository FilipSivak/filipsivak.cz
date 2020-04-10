import {GameEngine, Actor} from './GameEngine'
import {Vector} from './VectorMath'

class DotActor implements Actor {

    public id: number;
    public impulse = new Vector(0, 0);
    public impulseDiminishingRate = .9;

    constructor(public engine: GameEngine, public location: Vector, public speed: Vector) {

    }

    update(time: number) {
        this.location.add(this.speed.copy().add(this.engine.mouseDelta.copy().scale(2)).scale(time));
        this.location.add(this.impulse.copy().scale(time));

        if(this.location.x > this.engine.canvas.width) {
            this.location.x -= this.engine.canvas.width;
        }

        if(this.location.y > this.engine.canvas.height) {
            this.location.y -= this.engine.canvas.height;
        }

        if(this.location.x < 0) {
            this.location.x += this.engine.canvas.width;
        }

        if(this.location.y < 0) {
            this.location.y += this.engine.canvas.height;
        }

        const mouseDistance = this.location.distance(this.engine.mouseCurrent);
        if(mouseDistance < 200) {
            this.impulse = this.location.copy().substract(this.engine.mouseCurrent).normalize().scale(80 * (1 - (mouseDistance / 200)));
        }

        this.impulse.scale(this.impulseDiminishingRate);
    }

    render() {
        this.engine.context2d.strokeStyle = "#FFFFFF";
        this.engine.context2d.beginPath();
        this.engine.context2d.arc(this.location.x, this.location.y, 2, 0, 2 * Math.PI, true);
        this.engine.context2d.stroke();

        // find close actors
        this.engine.actors.forEach((other) => {
            if(other.id == this.id) return;
            const otherDot = other as DotActor;

            if(otherDot && this.location.distance(otherDot.location) < 50) {
                this.engine.context2d.strokeStyle = "#FFFFFF";
                this.engine.context2d.beginPath();
                this.engine.context2d.moveTo(this.location.x, this.location.y);
                this.engine.context2d.lineTo(otherDot.location.x, otherDot.location.y);
                this.engine.context2d.stroke();
            } 
        })
    }

}

export class DotEffect {

    constructor(private engine: GameEngine, numberOfDots: number) {
        for(var i = 0; i < numberOfDots; i++) {
            engine.addActor(
                new DotActor(
                    engine,
                    new Vector(Math.random() * engine.canvas.width, Math.random() * engine.canvas.height),
                    Vector.randomDirectionVector().scale(20)
                )
            );
        }
    }

    run() {
        this.engine.run();
    }

}
