// src/pages/RegisterPage.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const [fio, setFio] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      console.log('[Register] submitting', { fio, login, password })

      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({
          fio,
          login,
          password,
          role: 'creator'
        })
      })

      console.log('[Register] response status', res.status)

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        console.error('[Register] error response text', text)
        setError(text || 'Ошибка регистрации')
        return
      }

      const data = await res.json().catch(() => null)
      console.log('[Register] success', data)

      navigate('/login')
    } catch (err: any) {
      console.error('[Register] network error', err)
      setError(err?.message || 'Ошибка регистрации')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 600, marginTop: 40, background: '#3A3A3A', padding: 30, borderRadius: 6 }}>
        <h2>Регистрация</h2>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: 10 }}>
            <input
              className="request__cnt-input"
              placeholder="ФИО"
              value={fio}
              onChange={e => setFio(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <input
              className="request__cnt-input"
              placeholder="Логин"
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <input
              className="request__cnt-input"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button className="btn" type="submit">Зарегистрироваться</button>
        </form>

        <div style={{ marginTop: 15 }}>
          Уже есть аккаунт?{' '}
          <span
            style={{ color: '#AA9B7D', cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Войти
          </span>
        </div>
      </div>
    </div>
  )
}
