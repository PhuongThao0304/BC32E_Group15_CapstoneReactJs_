import React from 'react'
import { loadingAction, useLoading } from '../../store/filmManage'

const Loading = () => {
  const { isLoading } = useLoading()
  console.log(isLoading)
  console.log(loadingAction)
  return (
    <> {isLoading ?
      <div style={{ position: 'fixed', top: '0', bottom: '0', width: '100%', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '1000' }}>
        <div className='text-4xl text-white'>Loading</div> </div> : ''}
    </>
    // <div style={{position: 'absolute', top: '0', bottom: '0', width: '100%', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)',  justifyContent: 'center', alignItems: 'center',zIndex: '1000'}}>
    //  <div className='text-4xl text-white'>Loading</div> </div>

  )
}

export default Loading