import { calculate } from './interpreter'

it('reproduces literals', () => {
    expect(calculate('42.3')).toBe(42.3)
})
