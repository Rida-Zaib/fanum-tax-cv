import { z } from "zod";

export const settingsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(2, "Must be at least 2 characters")
    .max(60, "Must be at most 60 characters"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  degree: z.string().min(1, "Choose a degree"),
  experienceLevel: z.string().min(1, "Choose an experience level"),
  githubUsername: z
    .string()
    .trim()
    .max(39, "Must be at most 39 characters")
    .regex(
      /^$|^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/,
      "Letters, digits and single hyphens only, no leading or trailing hyphen"
    ),
});
