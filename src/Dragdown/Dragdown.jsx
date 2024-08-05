import React from 'react'
import Dropdown from '../Dropdown/Dropdown'
import DragdownContent from './DragdownContent'
import "./Dragdown.css"

function Dragdown() {
  return (
    <div>
      <div className="content">
        <Dropdown buttonText="Pilih Daerah Kamu"
        content={<DragdownContent/>}
        
        />
      </div>
    </div>
  )
}

export default Dragdown
