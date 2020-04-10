export class Vector {
    constructor(public x: number, public y: number) {}

    add(other: Vector) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    substract(other: Vector) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    scale(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    elementWiseProduct(other: Vector) {
        this.x *= other.x;
        this.y *= other.y;
        return this;
    }

    distance(other: Vector) {
        return Math.sqrt((this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y));
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    static randomUnitVector() {
        return new Vector(Math.random(), Math.random());
    }

    static randomDirectionVector() {
        const direction = Math.random() * Math.PI;
        return new Vector(Math.sin(direction), Math.cos(direction));
    }
}

