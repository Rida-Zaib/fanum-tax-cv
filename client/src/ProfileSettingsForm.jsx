import { useState } from "react";
import "./ProfileSettingsForm.css";

const BIO_MAX = 160;

const EMPTY_PROFILE = {
  displayName: "",
  email: "",
  bio: "",
  timezone: "UTC",
  emailNotifications: true,
};

function validate(values) {
  const errors = {};
  if (!values.displayName.trim()) {
    errors.displayName = "Enter a display name.";
  } else if (values.displayName.trim().length < 2) {
    errors.displayName = "Display name must be at least 2 characters.";
  }
  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address, like name@example.com.";
  }
  if (values.bio.length > BIO_MAX) {
    errors.bio = `Bio must be ${BIO_MAX} characters or fewer.`;
  }
  return errors;
}

/**
 * Props:
 *  - initialValues: existing profile data (merged over defaults)
 *  - onSave(values): async function that persists the profile; throw to show an error
 */
export default function ProfileSettingsForm({ initialValues, onSave }) {
  const saved = { ...EMPTY_PROFILE, ...initialValues };
  const [values, setValues] = useState(saved);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error
  const [serverError, setServerError] = useState("");

  const timezones =
    typeof Intl.supportedValuesOf === "function"
      ? Intl.supportedValuesOf("timeZone")
      : ["UTC"];

  const isDirty = JSON.stringify(values) !== JSON.stringify(saved);

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    const next = { ...values, [name]: type === "checkbox" ? checked : value };
    setValues(next);
    if (touched[name]) setErrors(validate(next));
    if (status === "saved") setStatus("idle");
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ displayName: true, email: true, bio: true });
    if (Object.keys(found).length > 0) return;

    setStatus("saving");
    setServerError("");
    try {
      await onSave?.({
        ...values,
        displayName: values.displayName.trim(),
        email: values.email.trim(),
        bio: values.bio.trim(),
      });
      setStatus("saved");
    } catch (err) {
      setServerError(err?.message || "Could not save your changes. Try again.");
      setStatus("error");
    }
  }

  function handleReset() {
    setValues(saved);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setServerError("");
  }

  const showError = (name) => touched[name] && errors[name];

  return (
    <form className="psf" onSubmit={handleSubmit} noValidate>
      <h2 className="psf__title">Profile settings</h2>

      <div className="psf__field">
        <label htmlFor="displayName">Display name</label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          autoComplete="name"
          value={values.displayName}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!showError("displayName")}
          aria-describedby={showError("displayName") ? "displayName-error" : undefined}
        />
        {showError("displayName") && (
          <p id="displayName-error" className="psf__error">{errors.displayName}</p>
        )}
      </div>

      <div className="psf__field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!showError("email")}
          aria-describedby={showError("email") ? "email-error" : undefined}
        />
        {showError("email") && (
          <p id="email-error" className="psf__error">{errors.email}</p>
        )}
      </div>

      <div className="psf__field">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          value={values.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!showError("bio")}
          aria-describedby="bio-count"
        />
        <p
          id="bio-count"
          className={`psf__hint ${values.bio.length > BIO_MAX ? "psf__hint--over" : ""}`}
        >
          {values.bio.length}/{BIO_MAX}
        </p>
        {showError("bio") && <p className="psf__error">{errors.bio}</p>}
      </div>

      <div className="psf__field">
        <label htmlFor="timezone">Time zone</label>
        <select
          id="timezone"
          name="timezone"
          value={values.timezone}
          onChange={handleChange}
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>{tz.replace(/_/g, " ")}</option>
          ))}
        </select>
      </div>

      <div className="psf__field psf__field--check">
        <input
          id="emailNotifications"
          name="emailNotifications"
          type="checkbox"
          checked={values.emailNotifications}
          onChange={handleChange}
        />
        <label htmlFor="emailNotifications">Email me about account activity</label>
      </div>

      <div className="psf__actions">
        <button
          type="submit"
          className="psf__btn psf__btn--primary"
          disabled={!isDirty || status === "saving"}
        >
          {status === "saving" ? "Saving…" : "Save changes"}
        </button>
        <button
          type="button"
          className="psf__btn"
          onClick={handleReset}
          disabled={!isDirty || status === "saving"}
        >
          Discard changes
        </button>
        <p className="psf__status" role="status" aria-live="polite">
          {status === "saved" && "Changes saved."}
          {status === "error" && <span className="psf__error">{serverError}</span>}
        </p>
      </div>
    </form>
  );
}
