import Parser from './parser'
import { TOKEN_NUM } from './token_stream'

const forEach = Array.prototype.forEach

const testOperators = '+-*/'
const testPunctuation = '()'

const checkNodeToken = (node, type, value) => {
    expect(node.type).toBe(type)
    expect(node.value).toBe(value)
}

it('parses numeric literals', () => {
    const parser = new Parser('42')
    const node = parser.parse()
    checkNodeToken(node, TOKEN_NUM, 42)
})

it('doest not parse single operators', () => {
    forEach.call(testOperators, op => {
        const parser = new Parser(op)
        expect(parser.parse.bind(parser)).toThrow()
    })
})

it('doest not parse single punctuations', () => {
    forEach.call(testPunctuation, punc => {
        const parser = new Parser(punc)
        expect(parser.parse.bind(parser)).toThrow()
    })
})
