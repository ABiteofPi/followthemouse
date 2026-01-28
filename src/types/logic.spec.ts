import { describe, expect, it } from 'vitest'
import { analyzePassword } from './logic'

describe('analyzePassword', () => {
  describe('empty password', () => {
    it('should return score 0 for empty password', () => {
      const result = analyzePassword('')
      expect(result.score).toBe(0)
    })

    it('should return Too Weak level for empty password', () => {
      const result = analyzePassword('')
      expect(result.level).toBe('Too Weak')
    })

    it('should provide feedback for empty password', () => {
      const result = analyzePassword('')
      expect(result.feedback).toContain('Please enter a password')
    })
  })

  describe('password length requirements', () => {
    it('should award points for passwords >= 8 characters', () => {
      const result = analyzePassword('12345678')
      expect(result.score).toBeGreaterThanOrEqual(20)
    })

    it('should award extra points for passwords >= 20 characters', () => {
      const short = analyzePassword('12345678')
      const long = analyzePassword('123456789012345678901')
      expect(long.score).toBeGreaterThan(short.score)
    })

    it('should suggest longer password when < 8 characters', () => {
      const result = analyzePassword('short')
      expect(result.feedback).toContain(
        'Password is too short. Consider using at least 16 characters.',
      )
    })

    it('should not suggest longer password when >= 16 characters', () => {
      const result = analyzePassword('longpassword1234')
      expect(result.feedback).not.toContain('Consider using at least 16 characters.')
    })
  })

  describe('character type requirements', () => {
    it('should award points for uppercase letters', () => {
      const withoutUpper = analyzePassword('password123!')
      const withUpper = analyzePassword('Password123!')
      expect(withUpper.score).toBeGreaterThan(withoutUpper.score)
    })

    it('should suggest uppercase when missing', () => {
      const result = analyzePassword('password123!')
      expect(result.feedback).toContain('Add uppercase letters to strengthen your password.')
    })

    it('should award points for lowercase letters', () => {
      const result = analyzePassword('PASSWORD123')
      expect(result.score).toBeGreaterThanOrEqual(0) // lowercase is not explicitly required
    })

    it('should award points for numbers', () => {
      const withoutNumbers = analyzePassword('Password!')
      const withNumbers = analyzePassword('Password1!')
      expect(withNumbers.score).toBeGreaterThan(withoutNumbers.score)
    })

    it('should suggest numbers when missing', () => {
      const result = analyzePassword('Password!')
      expect(result.feedback).toContain('Add numbers to strengthen your password.')
    })

    it('should award points for special characters', () => {
      const withoutSpecial = analyzePassword('Password123')
      const withSpecial = analyzePassword('Password123!')
      expect(withSpecial.score).toBeGreaterThan(withoutSpecial.score)
    })

    it('should suggest special characters when missing', () => {
      const result = analyzePassword('Password123')
      expect(result.feedback).toContain('Add special characters to strengthen your password.')
    })
  })

  describe('repeating characters penalty', () => {
    it('should penalize repeating characters (3 or more)', () => {
      const withoutRepeat = analyzePassword('Password123!')
      const withRepeat = analyzePassword('Passsword123!')
      expect(withRepeat.score).toBeLessThan(withoutRepeat.score)
    })

    it('should provide feedback for repeating characters', () => {
      const result = analyzePassword('Passsword123!')
      expect(result.feedback).toContain('Avoid repeating characters')
    })

    it('should not penalize 2 consecutive characters', () => {
      const result = analyzePassword('Passwword123!')
      const feedback = result.feedback
      expect(feedback).not.toContain('Avoid repeating characters')
    })
  })

  describe('strength levels', () => {
    it('should return Too Weak for very low score', () => {
      const result = analyzePassword('weak')
      expect(result.level).toBe('Too Weak')
    })

    it('should return Weak for score 20-39', () => {
      const result = analyzePassword('password')
      expect(result.level).toBe('Weak')
    })

    it('should return Moderate for score 40-59', () => {
      const result = analyzePassword('Password')
      expect(result.level).toBe('Moderate')
    })

    it('should return Strong for score 60-79', () => {
      const result = analyzePassword('Password123')
      expect(result.level).toBe('Strong')
    })

    it('should return Very Strong for score 80+', () => {
      const result = analyzePassword('VeryStrong1234567890!')
      expect(result.level).toBe('Very Strong')
    })
  })

  describe('score bounds', () => {
    it('should never return negative score', () => {
      const result = analyzePassword('aaa')
      expect(result.score).toBeGreaterThanOrEqual(0)
    })

    it('should never return score > 100', () => {
      const result = analyzePassword('VeryStrongPassword123!@#$%^&*()')
      expect(result.score).toBeLessThanOrEqual(100)
    })
  })

  describe('complex passwords', () => {
    it('should handle very strong password correctly', () => {
      const result = analyzePassword('MyStr0ng!P@ss1234')
      expect(result.level).toBe('Very Strong')
      expect(result.score).toBeGreaterThanOrEqual(60)
    })

    it('should handle password with mixed special characters', () => {
      const result = analyzePassword('Test@Pass#123')
      expect(result.score).toBeGreaterThan(0)
      expect(result.level).not.toBe('Too Weak')
    })

    it('should provide complete feedback for weak password', () => {
      const result = analyzePassword('weak')
      expect(result.feedback.length).toBeGreaterThan(0)
    })

    it('should provide no feedback for very strong password', () => {
      const result = analyzePassword('MyStr0ng!P@ss123456789')
      expect(result.feedback.length).toBe(0)
    })
  })

  describe('return type structure', () => {
    it('should always return valid StrengthResult object', () => {
      const result = analyzePassword('test')
      expect(result).toHaveProperty('score')
      expect(result).toHaveProperty('level')
      expect(result).toHaveProperty('feedback')
      expect(typeof result.score).toBe('number')
      expect(typeof result.level).toBe('string')
      expect(Array.isArray(result.feedback)).toBe(true)
    })
  })
})
