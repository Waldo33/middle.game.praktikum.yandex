import { FC } from 'react'
import { Rules } from '@widgets/rules/Rules'

export const GameStart: FC = () => {
  return (
    <>
      <h1>как играть</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Rules />
      </div>
    </>
  )
}
