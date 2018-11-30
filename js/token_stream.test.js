import InputStream from './input_stream'
import TokenStream, { TOKEN_NUM, TOKEN_PUNC, TOKEN_OP } from './token_stream'

const fnTrue = () => true
const fnFalse = () => false
const forEach = Array.prototype.forEach
const includes = Array.prototype.includes
const join = Array.prototype.join

const testString = 'abcdef'
const testDigit = 1
const testInt = 123
const testFloat = 42.23
const testOperators = '+-*/'
const testPunctuation = '()'
const testSingleDigitArithmeticExpression = '1+2-2'

const createStream = input => new TokenStream('' + input)

const checkToken = (token, type, value) => {
    expect(token.type).toBe(type)
    expect(token.value).toBe(value)
}

it('`_readWhile` accumulates chars while predicate is `true`', () => {
    const stream = createStream(testString)
    const accum = stream._readWhile(fnTrue)
    expect(accum).toBe(testString)
})

it('`_readWhile` accumulates chars until predicate is `false`', () => {
    const stream = createStream(testString)
    const accum = stream._readWhile(char => char !== 'd')
    expect(accum).toBe('abc')
})

it('`_readWhile` can return empty string', () => {
    const stream = createStream(testString)
    const accum = stream._readWhile(fnFalse)
    expect(accum).toBe('')
})

it('`_readNumber` reads digit', () => {
    const stream = createStream(testDigit)
    const accum = stream._readNumber()
    expect(accum).toBe(testDigit)
})

it('`_readNumber` reads integers with more than one digit', () => {
    const stream = createStream(testInt)
    const accum = stream._readNumber()
    expect(accum).toBe(testInt)
})

it('`_readNumber` reads floats', () => {
    const stream = createStream(testFloat)
    const accum = stream._readNumber()
    expect(accum).toBe(testFloat)
})

it('tokenizes digits, terminates w/ `null`', () => {
    const stream = createStream(testDigit)
    checkToken(stream.next(), TOKEN_NUM, testDigit)
    expect(stream.next()).toBeNull()
})

it('tokenizes integers with more than one digit, terminates w/ `null`', () => {
    const stream = createStream(testInt)
    checkToken(stream.next(), TOKEN_NUM, testInt)
    expect(stream.next()).toBeNull()
})

it('tokenizes floats, terminates w/ `null`', () => {
    const stream = createStream(testFloat)
    checkToken(stream.next(), TOKEN_NUM, testFloat)
    expect(stream.next()).toBeNull()
})

it('tokenizes operators, terminates w/ `null`', () => {
    forEach.call(testOperators, op => {
        const stream = createStream(op)
        checkToken(stream.next(), TOKEN_OP, op)
        expect(stream.next()).toBeNull()
    })
})

it('tokenizes punctuation, terminates w/ `null`', () => {
    forEach.call(testPunctuation, punc => {
        const stream = createStream(punc)
        checkToken(stream.next(), TOKEN_PUNC, punc)
        expect(stream.next()).toBeNull()
    })
})

it('tokenizes an arithmetic expression, terminates w/ `null`', () => {
    const stream = createStream(testSingleDigitArithmeticExpression)
    forEach.call(testSingleDigitArithmeticExpression, char => {
        if (includes.call(testOperators, char)) {
            checkToken(stream.next(), TOKEN_OP, char)
        } else {
            // in this test string every number is one digit, thus number is only one char
            checkToken(stream.next(), TOKEN_NUM, 1 * char)
        }
    })
    expect(stream.next()).toBeNull()
})

it('peeks next token (nullipotent) in arithmetic expression, terminates w/ `null`', () => {
    const stream = createStream(testSingleDigitArithmeticExpression)
    forEach.call(testSingleDigitArithmeticExpression, char => {
        if (includes.call(testOperators, char)) {
            checkToken(stream.peek(), TOKEN_OP, char)
            checkToken(stream.peek(), TOKEN_OP, char)
            checkToken(stream.peek(), TOKEN_OP, char)
        } else {
            checkToken(stream.peek(), TOKEN_NUM, 1 * char)
            checkToken(stream.peek(), TOKEN_NUM, 1 * char)
            checkToken(stream.peek(), TOKEN_NUM, 1 * char)
        }
        stream.next()
    })
    expect(stream.peek()).toBeNull()
})

it('eofs only once after last token', () => {
    const stream = createStream(testSingleDigitArithmeticExpression)
    forEach.call(testSingleDigitArithmeticExpression, char => {
        expect(stream.eof()).toBe(false)
        stream.next()
    })
    expect(stream.eof()).toBe(true)
})

it('ignores whitespaces', () => {
    const stream = createStream(join.call(testSingleDigitArithmeticExpression, '  '))
    forEach.call(testSingleDigitArithmeticExpression, () => {
        expect(stream.next()).toBeTruthy()
    })
    expect(stream.next()).toBeNull()
})
