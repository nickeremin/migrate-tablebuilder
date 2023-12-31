import { UserOrganizations } from "@/widgets/pages"
import { CreateOrganizationForm } from "@/features/forms"
import { Button } from "@/shared/components/ui/button"

function TeamsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Команды</h2>
          <CreateOrganizationForm>
            <Button>Создать Аккаунт</Button>
          </CreateOrganizationForm>
        </div>
        <p className="text-sm text-secondary-foreground">
          Управляйте командами, в которых вы участвуете, присоединяйтесь к
          предложенным или создавайте новые.
        </p>
      </div>
      <UserOrganizations />
    </div>
  )
}

export default TeamsPage
