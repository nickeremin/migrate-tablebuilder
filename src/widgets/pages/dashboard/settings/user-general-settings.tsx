import {
  DeleteAccountrForm,
  UpdateEmailForm,
  UpdateImageForm,
  UpdateUsernameForm,
} from "@/features/forms"

function UserGeneralSettings() {
  return (
    <div className="flex flex-col gap-8">
      <UpdateImageForm />
      <UpdateUsernameForm />
      <UpdateEmailForm />
      <DeleteAccountrForm />
    </div>
  )
}

export default UserGeneralSettings
