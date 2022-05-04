import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from './Form'
import userEvent from '@testing-library/user-event'
import { VALID_RANGE } from '../../utils/constants'

const setup = () => {
  const submitData = jest.fn()
  const errorMsg = {
    lat: `Latitude must be between ${VALID_RANGE.MIN_LAT} and ${VALID_RANGE.MAX_LAT}`,
    lng: `Longitude must be between ${VALID_RANGE.MIN_LNG} and ${VALID_RANGE.MAX_LNG}`,
  }
  const utils = render(<Form submitData={submitData} />)
  const latInput = utils.queryByPlaceholderText(/latitude/i) as Element
  const lngInput = utils.queryByPlaceholderText(/longitude/i) as Element
  const changeLatInput = (value: string) => userEvent.type(latInput, value)
  const changeLngInput = (value: string) => userEvent.type(lngInput, value)
  const buttonSubmit = utils.getByRole('button', { name: /plot/i })

  return {
    ...utils,
    latInput,
    lngInput,
    changeLatInput,
    changeLngInput,
    buttonSubmit,
    submitData,
    errorMsg,
  }
}

describe('Form', () => {
  it('should render the basic fields', () => {
    const { container, latInput, lngInput, buttonSubmit } = setup()
    expect(latInput).toBeInTheDocument()
    expect(lngInput).toBeInTheDocument()
    expect(buttonSubmit).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('should not show error when latitude is within allowed range', async () => {
    const { changeLatInput, errorMsg, buttonSubmit } = setup()
    changeLatInput('0')
    userEvent.click(buttonSubmit)

    await waitFor(() => {
      expect(screen.queryByText(errorMsg.lat)).not.toBeInTheDocument()
    })
  })

  it('should show error when latitude is greater than allowed range', async () => {
    const { changeLatInput, errorMsg, buttonSubmit } = setup()
    changeLatInput('999')
    userEvent.click(buttonSubmit)
    expect(await screen.findByText(errorMsg.lat)).toBeInTheDocument()
  })

  it('should show error when latitude is less than allowed range', async () => {
    const { changeLatInput, errorMsg, buttonSubmit } = setup()
    changeLatInput('-999')
    userEvent.click(buttonSubmit)
    expect(await screen.findByText(errorMsg.lat)).toBeInTheDocument()
  })

  it('should not show error when longitude is within allowed range', async () => {
    const { changeLngInput, errorMsg, buttonSubmit } = setup()
    changeLngInput('0')
    userEvent.click(buttonSubmit)

    await waitFor(() => {
      expect(screen.queryByText(errorMsg.lng)).not.toBeInTheDocument()
    })
  })

  it('should show error when longitude is greater than allowed range', async () => {
    const { changeLngInput, errorMsg, buttonSubmit } = setup()
    changeLngInput('999')
    userEvent.click(buttonSubmit)
    expect(await screen.findByText(errorMsg.lng)).toBeInTheDocument()
  })

  it('should show error when longitude is less than allowed range', async () => {
    const { changeLngInput, errorMsg, buttonSubmit } = setup()
    changeLngInput('-999')
    userEvent.click(buttonSubmit)
    expect(await screen.findByText(errorMsg.lng)).toBeInTheDocument()
  })

  it('should call submit function on submit', async () => {
    const { changeLatInput, changeLngInput, buttonSubmit, submitData } = setup()
    changeLatInput('40')
    changeLngInput('-70')
    userEvent.click(buttonSubmit)
    await waitFor(() => expect(submitData).toHaveBeenCalledTimes(1))
  })
})
