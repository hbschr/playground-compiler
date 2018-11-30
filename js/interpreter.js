import Parser from './parser'
import { TOKEN_NUM } from './token_stream'

const evaluateNode = node => {
    const {type, value} = node
    switch (type) {
        case TOKEN_NUM:
            return value
        default:
            throw new Error(`No evaluation implemented for node type ${type}`)
    }
}

export const calculate = str => {
    const ast = (new Parser(str)).parse()
    return evaluateNode(ast)
}
