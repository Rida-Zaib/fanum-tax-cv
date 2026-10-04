import ProfileSettingsForm from "./ProfileSettingsForm";

export default function App() {
  return (
    <ProfileSettingsForm
      initialValues={{ displayName: "", email: "" }}
      onSave={async (values) => {
        console.log(values);
      }}
    />
  );
}
