import React, { FC } from 'react'

interface ErrorGeneralProps {
  title: string
  message: string
}

export const ErrorGeneral: FC<ErrorGeneralProps> = ({ title, message }) => {
  return (
    <div className="max-w-[600px] m-auto">
      <h1 className="text-primary">{title}</h1>
      <p>{message}</p>
    </div>
  )
}
