"use client"

// This necessary for react-image-crop styles
import "react-image-crop/dist/ReactCrop.css"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import { FileRejection, FileWithPath, useDropzone } from "react-dropzone"
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop"
import { toast } from "sonner"

import { Icons } from "@/shared/components/icons"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar"
import { Button } from "@/shared/components/ui/button"
import { Card, CardTitle } from "@/shared/components/ui/card"
import {
  DesktopModal,
  DesktopModalContent,
} from "@/shared/components/ui/desktop-modal"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { canvasPreview } from "@/shared/lib/canvas-preview"
import { catchError, cn, formatBytes } from "@/shared/lib/utils"

// Constants for react-dropzone
const MAX_SIZE = 1024 * 1024 * 12
const MAX_FILES = 1

// Set the cropping frame to the center
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 50,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

function UpdateImageForm() {
  // Get signed in user
  const { user } = useUser()

  const [showUpdateImageDialog, setShowUpdateImageDialog] =
    React.useState(false)
  const [isPending, startTransition] = React.useTransition()

  // This function is called when an avatar image is selected
  function onDrop(
    acceptedFiles: FileWithPath[],
    rejectedFiles: FileRejection[]
  ) {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]!
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "")
        setShowUpdateImageDialog(true)
      })
      reader.readAsDataURL(file)
    }

    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ errors }) => {
        if (errors[0]?.code === "file-too-large") {
          toast.error(
            `Файл слишком большой. Максимальный размер ${formatBytes(
              MAX_SIZE
            )}.`
          )
          return
        }
        errors[0]?.message && toast.error(errors[0].message)
      })
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: MAX_FILES,
    maxSize: MAX_SIZE,
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop,
  })

  // Control crop data of react-image-crop
  const [imgSrc, setImgSrc] = React.useState("")
  const imgRef = React.useRef<HTMLImageElement>(null)
  const [crop, setCrop] = React.useState<Crop>()
  const [completedCrop, setCompletedCrop] = React.useState<PixelCrop>()

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, 1 / 1))
  }

  async function onDownloadCropClick() {
    if (!user) return

    startTransition(async () => {
      try {
        if (!user || !imgRef.current || !completedCrop) return

        const imageBlob = (await canvasPreview(
          imgRef.current,
          completedCrop,
          1,
          0
        )) as Blob

        const imageFile = new File([imageBlob], imageBlob.size.toString())

        await user.setProfileImage({
          file: imageFile,
        })

        setShowUpdateImageDialog(false)

        toast.success("Аватар обновлен.")
      } catch (error) {
        catchError(Error)
      }
    })
  }

  return (
    <>
      <Card as="section">
        <div className="relative border-b p-6">
          <div
            className={cn(
              "absolute inset-0 flex flex-col gap-3 p-6",
              !!user && "hidden"
            )}
          >
            <Skeleton className="h-7 w-full max-w-[80px]" />
            <Skeleton className="h-6 w-full max-w-[120px]" />
          </div>
          {/* Avatar button which open file dialog when it pressed */}
          <div
            {...getRootProps({
              className: cn(
                "relative flex float-right rounded-full cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background-100",
                user ? "visible" : "invisible"
              ),
            })}
          >
            <input {...getInputProps()} />
            <Avatar className="h-20 w-20">
              <AvatarImage
                aria-label={user?.username ?? ""}
                src={user?.imageUrl}
                alt={user?.imageUrl}
                className="relative bg-transparent before:absolute before:bottom-0 before:left-0 before:z-50 before:h-28 before:w-28 before:bg-red-200 before:content-['']"
              />
              <AvatarFallback>
                <Skeleton className="h-full w-full rounded-full" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-3">
            <CardTitle
              className={cn("text-xl", user ? "visible" : "invisible")}
            >
              Аватар
            </CardTitle>
            <p className={cn("text-sm/6", user ? "visible" : "invisible")}>
              Это ваш аватар.
              <br />
              Нажмите на изображение, чтобы загрузить собственный аватар из
              ваших файлов.
            </p>
          </div>
        </div>
        <div className="relative flex min-h-[64px] flex-col items-center justify-center gap-3 rounded-b-xl bg-muted p-6 sm:flex-row sm:justify-between sm:py-3">
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center p-6 sm:items-start",
              !!user && "hidden"
            )}
          >
            <Skeleton className="h-5 w-full max-w-[320px]" />
          </div>
          <p
            className={cn(
              "text-center text-sm text-muted-foreground sm:text-start",
              user ? "visible" : "invisible"
            )}
          >
            Аватар не обязателен, но настоятельно рекомендуется.
          </p>
        </div>
      </Card>
      <DesktopModal
        open={showUpdateImageDialog}
        onOpenChange={setShowUpdateImageDialog}
      >
        <DesktopModalContent
          className={cn("flex max-h-[min(800px,80vh)]  flex-col p-0")}
        >
          <div className="overflow-y-auto overflow-x-hidden">
            <div className="relative overflow-y-auto overflow-x-hidden p-8">
              <ReactCrop
                keepSelection={true}
                className="m-auto !block !max-w-[350px]"
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1 / 1}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  onLoad={onImageLoad}
                  className="w-full"
                />
              </ReactCrop>
            </div>
            <div className="sticky bottom-0 flex justify-between rounded-b-lg border-t bg-background p-4">
              <Button
                disabled={isPending}
                variant="outline"
                className="bg-background"
                onClick={() => {
                  setShowUpdateImageDialog(false)
                }}
              >
                Отмена
              </Button>
              <Button disabled={isPending} onClick={onDownloadCropClick}>
                {isPending && (
                  <Icons.spinner
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Сохранить
              </Button>
            </div>
          </div>
        </DesktopModalContent>
      </DesktopModal>
    </>
  )
}

export default UpdateImageForm
