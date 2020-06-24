import React from 'react'
import FormHeader from '../Header1'
import CompanyProfileForm from '../forms/FCompanyProfile'
const config = require('../../config.json')

export default function MyAcount() {
  return (
    <div>
      <FormHeader />
      <CompanyProfileForm className="columns features" />
    </div>
  )
}
