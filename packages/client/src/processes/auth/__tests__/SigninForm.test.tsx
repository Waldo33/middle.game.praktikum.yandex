import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '@app/store'
import SigninForm from '../ui/SigninForm'
import { BrowserRouter as Router } from 'react-router-dom'

jest.mock('@processes/auth/api/authApi', () => ({
  BASE_AUTH_API: 'https://ya-praktikum.tech/api/v2',
  signinApi: jest.fn(),
}))

describe('SigninForm', () => {
  it('соответствует снапшоту до auth/loading', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <SigninForm />
        </Router>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('соответствует снапшоту после auth/loading', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <SigninForm />
        </Router>
      </Provider>
    )

    store.dispatch({ type: 'auth/loading' })
    expect(asFragment()).toMatchSnapshot()
  })
})
