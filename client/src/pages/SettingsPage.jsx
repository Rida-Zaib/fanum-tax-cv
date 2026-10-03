import { ProfileSettingsForm } from '../components/ProfileSettingsForm.jsx'

export function SettingsPage() {
  return (
    <section className="page">
      <p className="eyebrow">Account</p>
      <h1>Profile settings</h1>
      <p className="lede">
        Tell us who you are so we can tax the weak spots in your CV, GitHub,
        and portfolio — and point you at roles that actually fit.
      </p>
      <ProfileSettingsForm />
    </section>
  )
}
