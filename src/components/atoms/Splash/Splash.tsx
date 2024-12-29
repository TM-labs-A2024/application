import React from 'react'

import Logo from '../../../../public/static/icons/iso.svg'

export default function Splash() {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center"
      data-testid="splash-screen"
    >
      <Logo />
    </div>
  )
}
