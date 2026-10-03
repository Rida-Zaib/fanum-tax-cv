import { useState } from 'react'
import { loadProfile, saveProfile } from '../profileStorage.js'

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isValidGithubUsername(value) {
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(value)
}

function isValidUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function validate(profile) {
  const errors = {}

  if (!profile.displayName.trim()) {
    errors.displayName = 'Name is required.'
  }

  if (!profile.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(profile.email.trim())) {
    errors.email = 'That email does not look real.'
  }

  if (profile.githubUsername.trim() && !isValidGithubUsername(profile.githubUsername.trim())) {
    errors.githubUsername = 'GitHub usernames can use letters, numbers, and hyphens.'
  }

  if (profile.portfolioUrl.trim() && !isValidUrl(profile.portfolioUrl.trim())) {
    errors.portfolioUrl = 'Use a full URL, like https://yoursite.dev'
  }

  return errors
}

export function ProfileSettingsForm() {
  const [profile, setProfile] = useState(() => loadProfile())
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  function updateField(event) {
    const { name, value } = event.target
    setProfile((current) => ({ ...current, [name]: value }))
    setStatus('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(profile)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('Fix the highlighted fields, then try again.')
      return
    }

    const cleaned = {
      ...profile,
      displayName: profile.displayName.trim(),
      email: profile.email.trim(),
      githubUsername: profile.githubUsername.trim(),
      portfolioUrl: profile.portfolioUrl.trim(),
      targetRole: profile.targetRole.trim(),
      location: profile.location.trim(),
      bio: profile.bio.trim(),
    }

    saveProfile(cleaned)
    setProfile(cleaned)
    setStatus('Saved. We will use this when we review your profile.')
  }

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <div className="field-grid">
        <label>
          Display name
          <input
            name="displayName"
            value={profile.displayName}
            onChange={updateField}
            autoComplete="name"
            aria-invalid={Boolean(errors.displayName)}
          />
          {errors.displayName ? <span className="error">{errors.displayName}</span> : null}
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={updateField}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <span className="error">{errors.email}</span> : null}
        </label>

        <label>
          GitHub username
          <input
            name="githubUsername"
            value={profile.githubUsername}
            onChange={updateField}
            placeholder="octocat"
            autoComplete="username"
            aria-invalid={Boolean(errors.githubUsername)}
          />
          {errors.githubUsername ? (
            <span className="error">{errors.githubUsername}</span>
          ) : null}
        </label>

        <label>
          Portfolio URL
          <input
            type="url"
            name="portfolioUrl"
            value={profile.portfolioUrl}
            onChange={updateField}
            placeholder="https://yoursite.dev"
            aria-invalid={Boolean(errors.portfolioUrl)}
          />
          {errors.portfolioUrl ? <span className="error">{errors.portfolioUrl}</span> : null}
        </label>

        <label>
          Target role
          <input
            name="targetRole"
            value={profile.targetRole}
            onChange={updateField}
            placeholder="Frontend intern"
          />
        </label>

        <label>
          Experience level
          <select
            name="experienceLevel"
            value={profile.experienceLevel}
            onChange={updateField}
          >
            <option value="beginner">Beginner</option>
            <option value="intern">Intern / student</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
          </select>
        </label>
      </div>

      <label>
        Location
        <input
          name="location"
          value={profile.location}
          onChange={updateField}
          placeholder="City, country"
          autoComplete="address-level2"
        />
      </label>

      <label>
        Short bio
        <textarea
          name="bio"
          rows="4"
          value={profile.bio}
          onChange={updateField}
          placeholder="What you are building, and what you want next."
        />
      </label>

      <div className="form-actions">
        <button type="submit">Save profile</button>
        {status ? <p className="status">{status}</p> : null}
      </div>
    </form>
  )
}
