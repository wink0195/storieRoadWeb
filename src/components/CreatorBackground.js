import React from 'react'
import CreatorBackgroundForm from './forms/CreatorBackgroundForm'
import FormHeader from './forms/FormHeader'
import FormikSelect, { FormikSelectItem } from './utility/FormikSelect'
import './forms/forms.css'
const config = require('../config.json')

export default function CreatorBackground() {
  return (
    <div>
      <FormHeader />
      <CreatorBackgroundForm className="columns features" />
    </div>
  )
}
