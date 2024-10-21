import { FC } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@shared/components/ui/pagination'

export const ForumPagination: FC = () => {
  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink size="icon" href="#">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="icon" href="#">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
