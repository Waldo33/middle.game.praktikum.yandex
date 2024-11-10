import { Button } from '@shared/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@shared/components/ui/dialog'

import { Slider } from '@shared/components/ui/slider'
import { Difficulty } from './GamePage'

export function GameDifficultyDialog({
  onChange,
  onSubmit,
  value,
}: {
  onSubmit: () => void
  onChange: (value: Difficulty[]) => void
  value: Difficulty
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button> Играть с ботом</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Сложность</DialogTitle>
          <DialogDescription>{value}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Slider
            defaultValue={[value]}
            max={5}
            min={1}
            step={1}
            onValueChange={onChange}
          />
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Закрыть
            </Button>
          </DialogClose>
          <Button type="submit" size="sm" className="px-3" onClick={onSubmit}>
            Начать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
