import React from 'react'

import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

const footer = () => {
  return (
    <MDBFooter className='bg-light text-center text-white'>
    <MDBContainer className='p-4 pb-0'>
      <section className='mb-4'>
        <MDBBtn
          floating
          className='m-1'
          target="_blank"
          style={{ backgroundColor: '#3b5998' }}
          href='https://www.facebook.com/youthleadershipcenter'
          role='button'
        >
          <MDBIcon fab icon='facebook-f' />
        </MDBBtn>

        <MDBBtn
          floating
          className='m-1'
          target="_blank"
          style={{ backgroundColor: '#55acee' }}
          href='https://twitter.com/bylctweets'
          role='button'
        >
          <MDBIcon fab icon='twitter' />
        </MDBBtn>

        <MDBBtn
          floating
          className='m-1'
          target="_blank"
          style={{ backgroundColor: '#dd4b39' }}
          href='https://www.google.com'
          role='button'
        >
          <MDBIcon fab icon='google' />
        </MDBBtn>
        <MDBBtn
          floating
          className='m-1'
          target="_blank"
          style={{ backgroundColor: '#ac2bac' }}
          href='https://www.instagram.com/insta_bylc/?hl=en'
          role='button'
        >
          <MDBIcon fab icon='instagram' />
        </MDBBtn>

        <MDBBtn
          floating
          className='m-1'
          target="_blank"
          style={{ backgroundColor: '#0082ca' }}
          href='https://www.linkedin.com/company/bangladesh-youth-leadership-center-bylc-/'
          role='button'
        >
          <MDBIcon fab icon='linkedin-in' />
        </MDBBtn>

      </section>
    </MDBContainer>

    <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 50, 0.3)' }}>
      Copyright © 2023 - BYLC IT SUPPORT SYSTEM - Version 1.0 Developed by BYLC IT
    </div>
  </MDBFooter>
  )
}

export default footer