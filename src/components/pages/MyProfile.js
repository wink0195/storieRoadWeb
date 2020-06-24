import React from 'react'
import FormHeader from '../Header1'
import MyProfileForm from '../forms/FMyProfile'
const config = require('../../config.json')

export default function MyAcount() {
  return (
    <div>
      <FormHeader />
      <MyProfileForm class=".inside-form" />
    </div>
  )
}
