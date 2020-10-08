import React from 'react'

export default function Input({value, onChange, placeholder}) {
  return (
    <>
    <input className="input" placeholder={placeholder} value={value} onChange={e => onChange(e)} type="text"/>
    </>
  )
}
