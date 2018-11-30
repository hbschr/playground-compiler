import TokenStream, { TOKEN_NUM } from './token_stream'


class Node {
    constructor (token, left=null, right=null) {
        this.type = token.type
        this.value = token.value
        this.left = left
        this.right = right
    }

    toString () {
        switch (this.type) {
            case TOKEN_NUM:
                return `${this.value}`
            default:
                throw new Error(`No valid node found.`)
        }
    }
}

export default class Parser {
    constructor (input) {
        this.tokens = new TokenStream(input)
    }

    /**
     * input: token stream
     * output: syntactic tree
     */
    parse () {
        return this.parseExpression()
    }

    parseExpression () {
        return this.parseTerm()
    }

    parseTerm () {
        const token = this.tokens.peek()
        if (token) {
            const {type, value} = token
            if (type === TOKEN_NUM) return new Node(this.tokens.next())
        }
        this._unexpected('Number')
    }


    _skip (type, value) {
        const tok = this.tokens.peek()
        if (tok && tok.type === type && tok.value === value) {
            this.tokens.next()
        } else {
            this._unexpected(`${value}`)
        }
    }

    _unexpected (expected=false) {
        this.tokens.croak(`Unexpected token: ${JSON.stringify(this.tokens.peek())}`
            + (expected ? `, expected: ${expected}` : ''))
    }
}
