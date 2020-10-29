import React from 'react'
import Input from '../Input/Input'
import './horizontal-menu.style.scss'
export default function HorizontalMenuSelector({menuItems, active, onChange}) {

  return (
    <div className="horizontal-menu">
      {menuItems.map((menuItem) => {
        return (
          <div style={active === menuItem ? {background: "#CBF6E9", padding: "12px 24px"} : {border: "None", padding: "12px 24px"}} className="horizontal-menu-item">
            <label style={ active === menuItem ? {color: "#1A936F"} : {color: "black"}} htmlFor={"menus"}>{menuItem}</label>
            <input   name="menus" type="radio" onChange={event => onChange(event)} value={menuItem} />
          </div>
        )
      })}
    </div>
  )
}
