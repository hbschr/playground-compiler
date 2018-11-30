import TokenStream, { TOKEN_NUM, TOKEN_OP, TOKEN_PUNC } from './token_stream'


/**
 * operator precedence, higher numbers come first.
 */
const PRECEDENCE = {
    // binary addition
    '+': 1, '-': 1,
    // binary multiplication
    '*': 2, '/': 2, '%': 2,
}

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
            case TOKEN_OP:
                return `(${this.value} ${this.left.toString()} ${this.right.toString()})`
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

    parseExpression (operatorPrecedence=0) {
        return this.maybeBinary(this.parseTerm(), operatorPrecedence)
    }

    parseTerm () {
        const token = this.tokens.peek()
        if (token) {
            const {type, value} = token
            if (type === TOKEN_NUM) return new Node(this.tokens.next())
            if (type === TOKEN_OP && value === '-') {
                return new Node(this.tokens.next(), new Node({type: TOKEN_NUM, value: 0}), this.parseTerm())
            }
            if (type === TOKEN_PUNC && value === '(') {
                this._skip(TOKEN_PUNC, '(')
                const expr = this.parseExpression()
                this._skip(TOKEN_PUNC, ')')
                return expr
            }
        }
        this._unexpected('Number or (')
    }

    /**
     * return `left` or a new binary node when operator precedence is high enough
     */
    maybeBinary (left, contextPrecedence) {
        const token = this.tokens.peek()
        if (token && token.type === TOKEN_OP) {
            const tokenPrecedence = PRECEDENCE[token.value]
            if (tokenPrecedence > contextPrecedence) {
                // - create node for this binary operator
                // - use given `left`
                // - digest right side while operator precedence allows
                const operatorNode = new Node(this.tokens.next(), left, this.parseExpression(tokenPrecedence))
                // - offer as left node for possible following operators w/ original precedence
                return this.maybeBinary(operatorNode, contextPrecedence)
            }
        }
        return left
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
