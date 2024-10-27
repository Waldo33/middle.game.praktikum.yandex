import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from '@shared/components/ui/button'
import './NotFoundPage.scss'

export const NotFoundPage: FC = () => {
  const navigate = useNavigate()
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
