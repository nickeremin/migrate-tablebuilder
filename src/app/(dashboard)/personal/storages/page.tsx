import CustomIcon from "@/shared/components/icons/custom-icon"

function StoragesPage() {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-accent-1 px-4 py-8 ring-1 ring-border">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-background ring-1 ring-border">
          <CustomIcon name="Database" className="h-10 w-10" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium">Создайте хранилище</p>
          <p className="max-w-[280px] text-center text-sm text-muted-foreground">
            Создавайте хранилища и сохраняйте в них ваши документы.
          </p>
        </div>
      </div>
    </div>
  )
}

export default StoragesPage
