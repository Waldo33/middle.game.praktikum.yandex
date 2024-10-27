import { FC } from 'react'
import { rules } from '@pages/MainPage/ui/MainPage'
import { Rules } from '@pages/MainPage/ui/Rules'

export const GameStart: FC = () => {
  return (
    <>
      <h1>как играть</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Rules list={rules} />
      </div>
    </>
  )
}
