import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema } from "./settingsSchema";
import "../SettingsForm.css";

const DEGREES = ["CS", "SE", "IT", "EE", "Business", "Other"];

function FieldError({ id, error }) {
  if (!error) return null;
  return (
    <p id={id} role="alert" className="error">
      {error.message}
    </p>
  );
}

export default function SettingsForm() {
  const [saved, setSaved] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      fullName: "",
      email: "",
      degree: "",
      experienceLevel: "",
      githubUsername: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    setSaved(true);
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field">
        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          type="text"
          {...register("fullName")}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
        />
        <FieldError id="fullName-error" error={errors.fullName} />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        <FieldError id="email-error" error={errors.email} />
      </div>

      <div className="field">
        <label htmlFor="degree">Degree</label>
        <select
          id="degree"
          {...register("degree")}
          aria-invalid={!!errors.degree}
          aria-describedby={errors.degree ? "degree-error" : undefined}
        >
          <option value="">Select degree</option>
          {DEGREES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <FieldError id="degree-error" error={errors.degree} />
      </div>

      <fieldset
        className="field"
        aria-describedby={errors.experienceLevel ? "level-error" : undefined}
      >
        <legend>Experience level</legend>
        <div className="radio">
          <input id="level-beginner" type="radio" value="beginner" {...register("experienceLevel")} />
          <label htmlFor="level-beginner">Beginner</label>
        </div>
        <div className="radio">
          <input id="level-experienced" type="radio" value="experienced" {...register("experienceLevel")} />
          <label htmlFor="level-experienced">Experienced</label>
        </div>
        <FieldError id="level-error" error={errors.experienceLevel} />
      </fieldset>

      <div className="field">
        <label htmlFor="githubUsername">GitHub username (optional)</label>
        <input
          id="githubUsername"
          type="text"
          {...register("githubUsername")}
          aria-invalid={!!errors.githubUsername}
          aria-describedby={errors.githubUsername ? "github-error" : undefined}
        />
        <FieldError id="github-error" error={errors.githubUsername} />
      </div>

      <button type="submit" disabled={isSubmitting}>
        Save settings
      </button>
      {saved && (
        <p role="status" className="success">
          Settings saved
        </p>
      )}
    </form>
  );
}
