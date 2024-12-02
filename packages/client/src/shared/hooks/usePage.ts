import { PageInitArgs, PageInitContext } from '@app/router'
import store from '@app/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectPageHasBeenInitializedOnServer,
  setPageHasBeenInitializedOnServer,
} from '../../slices/ssrSlice'

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>
}

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}[\]\\/^])/g, '\\$1') + '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const createContext = (): PageInitContext => ({
  clientToken: getCookie('token'),
})

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useDispatch()
  const pageHasBeenInitializedOnServer = useSelector(
    selectPageHasBeenInitializedOnServer
  )

  useEffect(() => {
    if (pageHasBeenInitializedOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false))
      return
    }
    initPage({ dispatch, state: store.getState(), ctx: createContext() })
  }, [])
}
