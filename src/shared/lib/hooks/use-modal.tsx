import * as React from "react"

function useModal() {
  const [openDesktop, setOpenDesktop] = React.useState(false)
  const [openMobile, setOpenMobile] = React.useState(false)

  return {
    openDesktop,
    setOpenDesktop,
    openMobile,
    setOpenMobile,
  }
}

export default useModal
