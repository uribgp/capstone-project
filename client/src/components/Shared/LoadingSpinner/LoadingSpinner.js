import React from 'react'
import Spinner from '../../../media/loading-spinner.svg'
export default function LoadingSpinner({width = 30}) {
  return (
    <div style={{height: "100%", width: "100%", display:"flex", alignItems:"center", justifyContent:"center"}} className="loading-spinner-wrap"> 
      <img style={{width}} className="spinner" src={Spinner} alt=""/>
    </div>
  )
}
