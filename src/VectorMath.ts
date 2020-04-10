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

    clamp(minX: number, maxX: number, minY: number, maxY: number) {
        this.x = Math.max(Math.min(minX, this.x), maxX);
        this.y = Math.max(Math.min(minY, this.y), maxY);
    }

    size(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    normalize(): Vector {
        const size = this.size()
        this.x /= size
        this.y /= size
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

