import React, { FC } from 'react'
import './ErrorPage.scss'

interface ErrorGeneralProps {
  title: string
  message: string
}

export const ErrorGeneral: FC<ErrorGeneralProps> = ({ title, message }) => {
  return (
    <div className="error-page">
      <h1 className="text-primary">{title}</h1>
      <div className="error-page__text">{message}</div>
    </div>
  )
}
