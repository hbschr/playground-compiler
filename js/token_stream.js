import InputStream from './input_stream'

const isDigit = char => /[0-9]/i.test(char)
const isOpChar = char => '+-*/'.indexOf(char) >= 0
const isPunc = char => '()'.indexOf(char) >= 0
const isWhitespace = char => ' \t\n'.indexOf(char) >= 0

function createToken (type, value) {
    return { type, value }
}

export const TOKEN_NUM = 'num'
export const TOKEN_OP = 'op'
export const TOKEN_PUNC = 'punc'

export default class TokenStream {
    constructor (input) {
        this.inputStream = new InputStream(input)
        this.current = null
    }

    peek () {
        return this.current || (this.current = this._readNext())
    }

    next () {
        const tok = this.current
        this.current = null
        return tok || this._readNext()
    }

    eof () {
        return this.peek() === null
    }

    croak (message) {
        this.inputStream.croak(message)
    }

    _readNext () {
        this._readWhile(isWhitespace)
        if (this.inputStream.eof()) return null
        const char = this.inputStream.peek()
        if (isDigit(char)) return createToken(TOKEN_NUM, this._readNumber())
        if (isPunc(char)) return createToken(TOKEN_PUNC, this.inputStream.next())
        if (isOpChar(char)) return createToken(TOKEN_OP, this._readWhile(isOpChar))
        this.croak(`Can't handle character: ${char}`)
    }

    _readWhile (predicate) {
        let str = ''
        while (!this.inputStream.eof() && predicate(this.inputStream.peek())) {
            str += this.inputStream.next()
        }
        return str
    }

    _readNumber () {
        let hasDot = false
        const str = this._readWhile(char => {
            if (char === '.') {
                if (hasDot) return false
                return hasDot = true
            }
            return isDigit(char)
        })
        return parseFloat(str)
    }
}
