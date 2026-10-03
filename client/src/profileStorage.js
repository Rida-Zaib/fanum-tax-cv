export const PROFILE_STORAGE_KEY = 'fanumTaxProfile'

export const emptyProfile = {
  displayName: '',
  email: '',
  githubUsername: '',
  portfolioUrl: '',
  targetRole: '',
  experienceLevel: 'beginner',
  location: '',
  bio: '',
}

export function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (!raw) {
      return { ...emptyProfile }
    }
    return { ...emptyProfile, ...JSON.parse(raw) }
  } catch {
    return { ...emptyProfile }
  }
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
}
