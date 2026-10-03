import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import SettingsForm from "./SettingsForm";

describe("SettingsForm", () => {
  it("shows an error when full name is empty", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);
    await user.click(screen.getByRole("button", { name: /save settings/i }));
    expect(await screen.findByText("Full name is required")).toBeInTheDocument();
  });

  it("rejects a one-character full name", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);
    await user.type(screen.getByLabelText("Full name"), "a");
    await user.click(screen.getByRole("button", { name: /save settings/i }));
    expect(await screen.findByText("Must be at least 2 characters")).toBeInTheDocument();
  });

  it("rejects an invalid email", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);
    await user.type(screen.getByLabelText("Email"), "abc");
    await user.click(screen.getByRole("button", { name: /save settings/i }));
    expect(await screen.findByText("Enter a valid email")).toBeInTheDocument();
  });

  it("logs the values and shows a message on valid submit", async () => {
    const user = userEvent.setup();
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<SettingsForm />);
    await user.type(screen.getByLabelText("Full name"), "Test User");
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.selectOptions(screen.getByLabelText("Degree"), "CS");
    await user.click(screen.getByLabelText("Beginner"));
    await user.click(screen.getByRole("button", { name: /save settings/i }));
    expect(await screen.findByText("Settings saved")).toBeInTheDocument();
    expect(log).toHaveBeenCalled();
    log.mockRestore();
  });
});
