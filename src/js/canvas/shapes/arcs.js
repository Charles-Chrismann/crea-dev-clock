import { randomRange } from "../../utils/MathUtils"

export class RotatingArc {
    constructor(x, y, radius, startAngle, endAngle) {
        this.x = x
        this.y = y
        this.radius = radius
        this.startAngle = startAngle
        this.endAngle = endAngle

        this.vAngular = randomRange(-5, 5) // radian/second
    }

    update(elapsedTime, speed = 1) {
        this.startAngle += elapsedTime * this.vAngular * speed
        this.endAngle += elapsedTime * this.vAngular * speed
    }

    draw(context) {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle)
        context.stroke()
        context.closePath()
    }
}