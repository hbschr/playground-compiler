import { calculate } from './interpreter'

it('reproduces literals', () => {
    expect(calculate('42.3')).toBe(42.3)
})

it('adds', () => {
    expect(calculate('1+2')).toBe(3)
})

it('substracts', () => {
    expect(calculate('1-2')).toBe(-1)
})

it('multiplies', () => {
    expect(calculate('1*2')).toBe(2)
})

it('divides', () => {
    expect(calculate('1/2')).toBe(0.5)
})

it('adheres operator precedence', () => {
    expect(calculate('1+2*3')).toBe(7)
})

it('adheres paren precedence', () => {
    expect(calculate('(1+2)*3')).toBe(9)
})
