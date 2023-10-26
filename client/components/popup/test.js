import React, { useState } from 'react'
import axios from 'axios'

function OTPComponent() {
  const [email, setEmail] = useState('')
  const [otp, setOTP] = useState('')
  const [message, setMessage] = useState('')

  const sendOTP = async () => {
    try {
      const response = await axios.get('/send', { params: { email } })
      if (response.data.message === 'Success') {
        setMessage('OTP sent successfully.')
      } else {
        setMessage('Failed to send OTP.')
      }
    } catch (error) {
      console.error(error)
      setMessage('An error occurred while sending OTP.')
    }
  }

  const verifyOTP = async () => {
    try {
      const response = await axios.post('/verify', { email, otp })
      if (response.data.message === 'Success') {
        setMessage('OTP verified successfully.')
      } else {
        setMessage('OTP verification failed.')
      }
    } catch (error) {
      console.error(error)
      setMessage('An error occurred while verifying OTP.')
    }
  }

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendOTP}>Send OTP</button>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
      />
      <button onClick={verifyOTP}>Verify OTP</button>
      <p>{message}</p>
    </div>
  )
}

export default OTPComponent
