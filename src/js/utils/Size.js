import EventEmitter from "./EventEmitter"

export default class Size extends EventEmitter {
    constructor() {
        super()
        this.setSize()
        window.addEventListener('resize', () => {
            this.setSize()
            this.trigger('resize')
        })
    }

    setSize() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 1) // no need to use > 2 (+ issues with low perf devices but high resolution screen)
    }
}