import Scene from "../canvas/Scene"
import { deg2rad } from "../utils/MathUtils"
import { RotatingArc } from "../canvas/shapes/arcs"

const drawLine = (context, x, y, length, angle) => {
    context.save()
    context.beginPath()

    // offset + rotate
    context.translate(x, y)
    context.rotate(angle) // ! radian

    // draw line
    context.moveTo(0, 0)
    context.lineTo(length, 0)
    context.stroke()

    context.closePath()
    context.restore()
}

function drawClock(canvas, context, x, y, orientation, scale, color = 'black', filStroke = false, aiguilele) {
  context.strokeStyle = color
  context.fillStyle = 'white'
  context.lineWidth = 8
  context.beginPath()
  // console.log(x, y, canvas.width / scale, 0, 2 * Math.PI)
  context.arc(x, y, canvas.width / scale, 0, 2 * Math.PI)
  if(filStroke) {
    context.fill()
    context.stroke()
  }

  let aiguilleLength = 0
  switch(aiguilele) {
    case 'sec': aiguilleLength = 0.2; break;
    case 'min': aiguilleLength = 0.15; break;
    case 'hour': aiguilleLength = 0.05; break;
  }
  drawLine(context, x, y, canvas.width * aiguilleLength, orientation)
}

export default class Scenario extends Scene {
    constructor(id) {
        super(id)

        // debug
        this.params['line-width'] = 2
        this.params.speed = 1
        this.params.color = "#ffffff"
        if (this.debug.active) {
            this.debugFolder.add(this.params, 'line-width', 1, 10).onChange(() => this.drawUpdate())
            this.debugFolder.add(this.params, 'speed', -2, 2, .25)
            this.debugFolder.addColor(this.params, 'color')
        }
    }

    resize() {
        super.resize()

        // main dimensions
        this.mainRadius = this.width < this.height ? this.width : this.height
        this.mainRadius *= .5
        this.mainRadius *= .65
        this.deltaRadius = this.mainRadius * .075

        // shapes update
        if (!!this.arcs) {
            this.arcs.forEach((e, index) => {
                e.x = this.width / 2
                e.y = this.height / 2
                e.radius = this.mainRadius + (index - this.arcs.length / 2) * this.deltaRadius
            })
        }

        // refresh
        this.drawUpdate()
    }

    update() {
        if (!super.update()) return
        this.drawUpdate()
    }

    drawUpdate() {
        this.clear()
        const date = new Date()
        let [hour, min, sec] = [date.getHours(), date.getMinutes(), date.getSeconds()]
        // hour = 0
        // min = 0
        // sec = 0
        // console.log(this.canvas)
        // const hour = 3
        const hourAngle = (hour > 12 ? hour - 12 : hour)/12 * 2 * Math.PI - Math.PI / 2
        drawClock(this.canvas, this.context, this.canvas.width / 2, this.canvas.height / 2, hourAngle, 2.5,
        'black',
        true,
        'hour')
        const minAngle = min/60 * 2 * Math.PI - Math.PI / 2
        const minX = this.canvas.width / 2 + Math.cos(hourAngle) * this.canvas.width * 0.05
        const minY = this.canvas.height / 2 + Math.sin(hourAngle) * this.canvas.height * 0.05
        drawClock(
          this.canvas,
          this.context,
          minX,
          minY,
          minAngle,
          10,
          'black', false, 'min')
        const secX = minX + Math.cos(minAngle) * this.canvas.width * 0.15
        const secY = minY + Math.sin(minAngle) * this.canvas.height * 0.15
        drawClock(
          this.canvas,
          this.context,

          secX,
          // this.canvas.width / 2 + Math.cos(hourAngle) * this.canvas.width / 2.5 * 0.5,

          secY,
          // this.canvas.height / 2 + Math.sin(hourAngle),
          sec/60 * 2 * Math.PI - Math.PI / 2,
          25,
          'red', false, 'sec')
    }

    drawGradation() {
        const nGradation_ = 12
        for (let i = 0; i < nGradation_; i++) {
            const angle_ = 2 * Math.PI * i / nGradation_ + Math.PI / 2
            const x_ = this.width / 2 + (this.mainRadius - this.deltaRadius / 2) * Math.cos(angle_)
            const y_ = this.height / 2 + (this.mainRadius - this.deltaRadius / 2) * Math.sin(angle_)
            const length_ = this.deltaRadius * (this.nArcs - 1)
            drawLine(this.context, x_, y_, length_, angle_)
        }
    }
}