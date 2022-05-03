import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from './Form'
import userEvent from '@testing-library/user-event'
import { VALID_RANGE } from '../../utils/constants'

const submitData = jest.fn()
const errorMsg = {
  lat: `Latitude must be between ${VALID_RANGE.MIN_LAT} and ${VALID_RANGE.MAX_LAT}`,
  lng: `Longitude must be between ${VALID_RANGE.MIN_LNG} and ${VALID_RANGE.MAX_LNG}`,
}

describe('RecipeForm', () => {
  it('should render the basic fields', () => {
    const { container } = render(<Form submitData={submitData} />)
    expect(screen.queryByPlaceholderText(/latitude/i)).toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText(/longitude/i)

      // screen.getByRole('textbox', { name: /latitude/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /plot/i })).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
  it('should not show error when latitude is within allowed range', async () => {
    render(<Form submitData={submitData} />)
    const lat = screen.queryByPlaceholderText(/latitude/i) as Element
    const submit = screen.getByRole('button', { name: /plot/i })
    userEvent.type(lat, '0')
    userEvent.click(submit)
    await waitFor(() => {
      expect(screen.queryByText(errorMsg.lat)).not.toBeInTheDocument()
    })
  })
  it('should show error when latitude is greater than allowed range', async () => {
    render(<Form submitData={submitData} />)
    const lat = screen.queryByPlaceholderText(/latitude/i) as Element
    const submit = screen.getByRole('button', { name: /plot/i })
    userEvent.type(lat, '999')
    userEvent.click(submit)
    expect(await screen.findByText(errorMsg.lat)).toBeInTheDocument()
  })
  it('should show error when latitude is less than allowed range', async () => {
    render(<Form submitData={submitData} />)
    const lat = screen.queryByPlaceholderText(/latitude/i) as Element
    const submit = screen.getByRole('button', { name: /plot/i })
    userEvent.type(lat, '-999')
    userEvent.click(submit)
    expect(await screen.findByText(errorMsg.lat)).toBeInTheDocument()
  })
  it('should not show error when longitude is within allowed range', async () => {
    render(<Form submitData={submitData} />)
    const lng = screen.queryByPlaceholderText(/longitude/i) as Element
    const submit = screen.getByRole('button', { name: /plot/i })
    userEvent.type(lng, '0')
    userEvent.click(submit)
    await waitFor(() => {
      expect(screen.queryByText(errorMsg.lng)).not.toBeInTheDocument()
    })
  })
  it('should show error when longitude is greater than allowed range', async () => {
    render(<Form submitData={submitData} />)
    const lng = screen.queryByPlaceholderText(/longitude/i) as Element
    const submit = screen.getByRole('button', { name: /plot/i })
    userEvent.type(lng, '999')
    userEvent.click(submit)
    expect(await screen.findByText(errorMsg.lng)).toBeInTheDocument()
  })
  it('should show error when longitude is less than allowed range', async () => {
    render(<Form submitData={submitData} />)
    const lng = screen.queryByPlaceholderText(/longitude/i) as Element
    const submit = screen.getByRole('button', { name: /plot/i })
    userEvent.type(lng, '-999')
    userEvent.click(submit)
    expect(await screen.findByText(errorMsg.lng)).toBeInTheDocument()
  })
})
