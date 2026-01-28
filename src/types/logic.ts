export type StrengthLevel = 'Too Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Very Strong'

export interface StrengthResult {
  score: number
  level: StrengthLevel
  feedback: string[]
}

export function analyzePassword(password: string): StrengthResult {
  let score = 0
  const feedback: string[] = []

  if (!password) return { score: 0, level: 'Too Weak', feedback: ['Please enter a password'] }

  if (password.length >= 8) score += 20
  else feedback.push('Password is too short. Consider using at least 16 characters.')

  if (password.length >= 16) score += 20
  else feedback.push('Consider using at least 16 characters.')

  if (/[A-Z]/.test(password)) score += 15
  else feedback.push('Add uppercase letters to strengthen your password.')

  if (/[a-z]/.test(password)) score += 15

  if (/[0-9]/.test(password)) score += 15
  else feedback.push('Add numbers to strengthen your password.')

  if (/[^A-Za-z0-9]/.test(password)) score += 15
  else feedback.push('Add special characters to strengthen your password.')

  if (/(\w)\1\1/.test(password)) {
    score -= 10
    feedback.push('Avoid repeating characters')
  }

  const finalScore = Math.max(0, Math.min(100, score))
  let level: StrengthLevel = 'Too Weak'

  if (finalScore >= 80) level = 'Very Strong'
  else if (finalScore >= 60) level = 'Strong'
  else if (finalScore >= 40) level = 'Moderate'
  else if (finalScore >= 20) level = 'Weak'

  return { score: finalScore, level, feedback }
}
