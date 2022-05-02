import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from './Form'

const submitData = jest.fn()

describe('RecipeForm', () => {
  it('should render the basic fields', () => {
    render(<Form submitData={submitData} />)
    expect(
      screen.getByRole('textbox', { name: /latitude/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /latitude/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /plot/i })).toBeInTheDocument()
  })
})
