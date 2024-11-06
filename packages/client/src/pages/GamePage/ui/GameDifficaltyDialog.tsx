import { Button } from '@shared/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shared/components/ui/dialog'

import { Slider } from '@shared/components/ui/slider'
import { NumberFromOneToTen } from './GamePage'

export function GameDifficaltyDialog({
  onChange,
  onSubmit,
  value,
}: {
  onSubmit: () => void
  onChange: (value: NumberFromOneToTen[]) => void
  value: NumberFromOneToTen
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button> Играть с ботом</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Difficalty</DialogTitle>
          {value}
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Slider
            defaultValue={[value]}
            max={6}
            min={1}
            step={1}
            onValueChange={onChange}
          />
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" size="sm" className="px-3" onClick={onSubmit}>
            Start
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
