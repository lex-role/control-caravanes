'use client'

import { useState } from 'react'
import { Locale } from '@/config/i18n'

type RegistrationFormProps = {
  dict: {
    register_button: string
    plate_placeholder: string
    error_already_registered: string
    error_generic: string
    success_message: string
    dashboard_button: string
  }
  lang: Locale
}

export default function RegistrationForm({ dict}: RegistrationFormProps) {
  const [plate, setPlate] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plate }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.error === 'Vehicle already registered') {
          setStatus('error')
          setMessage(dict.error_already_registered)
        } else {
          setStatus('error')
          setMessage(dict.error_generic)
        }
        return
      }

      setStatus('success')
      setMessage(dict.success_message)
      setPlate('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setStatus('error')
      setMessage(dict.error_generic)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          value={plate}
          onChange={(e) => setPlate(e.target.value.toUpperCase())}
          placeholder={dict.plate_placeholder}
          className="w-full p-2 border border-gray-300 rounded"
          pattern="[A-Z0-9]+"
          required
          disabled={status === 'loading'}
        />
        <button 
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={status === 'loading'}
        >
          {dict.register_button}
        </button>
        {message && (
          <p className={`text-center ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}