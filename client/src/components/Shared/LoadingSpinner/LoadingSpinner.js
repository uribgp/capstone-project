import React from 'react'
import Spinner from '../../../media/loading-spinner.svg'
export default function LoadingSpinner() {
  return (
    <div className="loading-spinner-wrap"> 
      <img className="spinner" src={Spinner} alt=""/>
    </div>
  )
}
