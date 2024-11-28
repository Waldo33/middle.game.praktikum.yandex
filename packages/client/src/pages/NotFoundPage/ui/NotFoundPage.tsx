import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from '@shared/components/ui/button'
import '@shared/components/ui/ErrorPage.scss'
import { usePage } from '@shared/hooks/usePage'

export const NotFoundPage: FC = () => {
  const navigate = useNavigate()
  usePage({ initPage: initNotFoundPage })

  return (
    <div className="error-page">
      <h1 className="text-primary">404</h1>
      <div className="error-page__subtitle">ой, страница не найдена</div>
      <div className="error-page__text">
        можно вернуться{' '}
        <Button variant="link" onClick={() => navigate(-1)}>
          назад
        </Button>{' '}
        или на <Link to="/">главную</Link>
      </div>
    </div>
  )
}

export const initNotFoundPage = () => Promise.resolve()
