import { Button } from '@shared/components/ui/button'
import { FC } from 'react'

type ResetButtonProps = {
  onClick: () => void
}

export const ResetButton: FC<ResetButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M31.7078 25.7078L21.9998 15.9998L31.7078 6.29181C31.8938 6.10351 31.9981 5.84949 31.9981 5.58481C31.9981 5.32013 31.8938 5.06611 31.7078 4.87781L27.1218 0.29181C26.9343 0.104339 26.68 -0.000976562 26.4148 -0.000976562C26.1496 -0.000976562 25.8953 0.104339 25.7078 0.29181L15.9998 9.99981L6.29181 0.29181C6.10428 0.104339 5.84997 -0.000976562 5.58481 -0.000976562C5.31965 -0.000976562 5.06534 0.104339 4.87781 0.29181L0.29181 4.87781C0.104339 5.06534 -0.000976563 5.31965 -0.000976562 5.58481C-0.000976563 5.84997 0.104339 6.10428 0.29181 6.29181L9.99981 15.9998L0.29181 25.7078C0.104339 25.8953 -0.000976562 26.1496 -0.000976562 26.4148C-0.000976562 26.68 0.104339 26.9343 0.29181 27.1218L4.87781 31.7078C5.06534 31.8953 5.31965 32.0006 5.58481 32.0006C5.84997 32.0006 6.10428 31.8953 6.29181 31.7078L15.9998 21.9998L25.7078 31.7078C25.8953 31.8953 26.1496 32.0006 26.4148 32.0006C26.68 32.0006 26.9343 31.8953 27.1218 31.7078L31.7078 27.1218C31.8953 26.9343 32.0006 26.68 32.0006 26.4148C32.0006 26.1496 31.8953 25.8953 31.7078 25.7078Z"
          fill="black"
        />
      </svg>
    </Button>
  )
}