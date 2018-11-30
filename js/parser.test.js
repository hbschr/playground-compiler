import Parser from './parser'
import { TOKEN_NUM, TOKEN_OP } from './token_stream'

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

it('parses addition w/ two terms', () => {
    const parser = new Parser('1+2')
    expect(parser.parse().toString()).toBe('(+ 1 2)')
})

it('parses substraction w/ two terms', () => {
    const parser = new Parser('1-2')
    expect(parser.parse().toString()).toBe('(- 1 2)')
})

it('parses multiplication w/ two terms', () => {
    const parser = new Parser('1*2')
    expect(parser.parse().toString()).toBe('(* 1 2)')
})

it('parses division w/ two terms', () => {
    const parser = new Parser('1/2')
    expect(parser.parse().toString()).toBe('(/ 1 2)')
})

it('adheres left-to-right evaluation', () => {
    const parser = new Parser('1+2+3')
    expect(parser.parse().toString()).toBe('(+ (+ 1 2) 3)')
})

it('adheres operator precedence', () => {
    const parser = new Parser('1+2*3')
    expect(parser.parse().toString()).toBe('(+ 1 (* 2 3))')
})

it('throws error at eof in term', () => {
    const parser = new Parser('1+')
    expect(parser.parse.bind(parser)).toThrow(/null/)
})
