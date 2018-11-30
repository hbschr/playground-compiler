import Parser from './parser'
import { TOKEN_NUM, TOKEN_OP } from './token_stream'

const assert = (condition, message="Assertion failed") => {
    if (!condition) throw new Error(message)
}

const evaluateOperatorNode = node => {
    assert(node.type === TOKEN_OP)
    switch (node.value) {
        case '+':
            return evaluateNode(node.left) + evaluateNode(node.right)
        case '-':
            return evaluateNode(node.left) - evaluateNode(node.right)
        case '*':
            return evaluateNode(node.left) * evaluateNode(node.right)
        case '/':
            return evaluateNode(node.left) / evaluateNode(node.right)
        default:
            throw new Error(`Invalid operator: ${node.value}`)
    }
}

const evaluateNode = node => {
    const {type, value} = node
    switch (type) {
        case TOKEN_NUM:
            return value
        case TOKEN_OP:
            return evaluateOperatorNode(node)
        default:
            throw new Error(`No evaluation implemented for node type ${type}`)
    }
}

export const calculate = str => {
    const ast = (new Parser(str)).parse()
    return evaluateNode(ast)
}
