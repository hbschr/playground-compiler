export default class InputStream {
    constructor (input) {
        this.input = input
        this.pos = 0
        this.line = 1
        this.col = 0
    }

    peek () {
        return this.input.charAt(this.pos)
    }

    next () {
        const ch = this.peek()
        this.pos++
        if (ch === '\n') {
            this.line++
            this.col = 0
        } else {
            this.col++
        }
        return ch
    }

    eof () {
        return this.peek() === ''
    }

    croak (message) {
        throw new Error(`(${this.line}:${this.col}) ${message}`)
    }
}
