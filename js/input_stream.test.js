import InputStream from './input_stream'

const forEach = Array.prototype.forEach
const reduce = Array.prototype.reduce

const testInput = 'abcdefgh'
const testInputWithNewline = 'a\nb\nc'

it('reads input bytewise, terminates with empty string', () => {
    const stream = new InputStream(testInput)
    forEach.call(testInput, char => expect(stream.next()).toBe(char))
    expect(stream.next()).toBe('')
})

it('peeks next char (nullipotent), terminates with empty string', () => {
    const stream = new InputStream(testInput)
    forEach.call(testInput, char => {
        expect(stream.peek()).toBe(char)
        expect(stream.peek()).toBe(char)
        expect(stream.peek()).toBe(char)
        stream.next()
    })
    expect(stream.peek()).toBe('')
})

it('eofs only once at the end', () => {
    const stream = new InputStream(testInput)
    forEach.call(testInput, char => {
        expect(stream.eof()).toBe(false)
        stream.next()
    })
    expect(stream.eof()).toBe(true)
})

it('counts `pos` and `col` without newlines', () => {
    const stream = new InputStream(testInput)
    forEach.call(testInput, (_, index) => {
        expect(stream.col).toBe(index)
        expect(stream.pos).toBe(index)
        stream.next()
    })
    expect(stream.col).toBe(testInput.length)
    expect(stream.pos).toBe(testInput.length)
})

it('counts `line` w/ newlines', () => {
    const stream = new InputStream(testInputWithNewline)
    reduce.call(testInputWithNewline, (lineCount, char) => {
        expect(stream.line).toBe(lineCount)
        stream.next()
        return char === '\n' ? lineCount + 1 : lineCount
    }, 1)
})

it('counts `col` with newlines', () => {
    const stream = new InputStream(testInputWithNewline)
    reduce.call(testInputWithNewline, (colCount, char) => {
        expect(stream.col).toBe(colCount)
        stream.next()
        return char === '\n' ? 0 : colCount + 1
    }, 0)
})
