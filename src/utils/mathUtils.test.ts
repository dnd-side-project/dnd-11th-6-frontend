import { add, subtract, isEven } from './mathUtils'

describe('Math Utils', () => {
  describe('add function', () => {
    it('should correctly add two positive numbers', () => {
      expect(add(2, 3)).toBe(5)
    })

    it('should correctly handle negative numbers', () => {
      expect(add(-1, 1)).toBe(0)
      expect(add(-1, -1)).toBe(-2)
    })
  })

  describe('subtract function', () => {
    it('should correctly subtract two positive numbers', () => {
      expect(subtract(5, 3)).toBe(2)
    })

    it('should correctly handle negative numbers', () => {
      expect(subtract(1, -1)).toBe(2)
      expect(subtract(-1, -1)).toBe(0)
    })
  })

  describe('isEven function', () => {
    it('should return true for even numbers', () => {
      expect(isEven(2)).toBe(true)
      expect(isEven(0)).toBe(true)
      expect(isEven(-4)).toBe(true)
    })

    it('should return false for odd numbers', () => {
      expect(isEven(1)).toBe(false)
      expect(isEven(-3)).toBe(false)
    })
  })
})
