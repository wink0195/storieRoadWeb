import React from 'react'
import FormHeader from '../Header1'
import CompanyProfileForm from '../forms/FCompanyProfile'

export default function MyAcount() {
  return (
    <div>
      <FormHeader />
      <CompanyProfileForm className="columns features" />
    </div>
  )
}
