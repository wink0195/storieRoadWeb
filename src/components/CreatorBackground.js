import React, { Component, Fragment } from 'react'
import FormStylesheet from './forms/forms.css'
import { Formik, Field, Form, useField, FieldArray } from 'formik'
import { TextField, Button, Checkbox, Radio, FormControlLabel, MenuItem, Select, Box } from '@material-ui/core'
import * as Yup from 'yup'
import { container } from 'aws-amplify'
import FormikSelect, { FormikSelectItem } from '../components/utility/FormikSelect.js'
const config = require('../config.json')

//custom fields
const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props)
  return (
    // value={field.value} onChange={field.onChange} doesn't need to be defined if you use {...field}
    // these are all the props that handle updating a field
    <FormControlLabel {...field} control={<Radio />} label={label} />
  )
}

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ''
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText} //casting this string to a boolean
      class="space"
    />
  )
}

const phone_typeItems = [
  {
    label: 'Work',
    value: 'work'
  },
  {
    label: 'Home',
    value: 'home'
  },
  {
    label: 'Mobile',
    value: 'mobile'
  }
]

const email_typeItems = [
  {
    label: 'Work',
    value: 'work'
  },
  {
    label: 'Personal',
    value: 'personal'
  }
]

const validationSchema = Yup.object({
  firstName: Yup.string().required().max(25),
  lastName: Yup.string().required().max(25)
})

function CreatorBackgroundForm() {
  return (
    <div>
      <div className="container-left">
        <h1>My Background</h1>
        <p className="subtitle is-5">Decide what info displays publically.</p>
        <br />
      </div>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          gender: ''
        }}
        validationSchema={validationSchema}
        // isSubmitting & setSubmitting helps the user not spam the buttons
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true)
          // make async call
          console.log('submit: ', data)
          //console.log('errors: ', error)
          setSubmitting(false)
        }}
      >
        {({ values, errors, isSubmitting }) => (
          //if you use the form element, you can skip defining handleChange, handleBlur, and handleSubmit. They are defined by default by a utility.
          <Form style={FormStylesheet} className="my-form">
            <p className="subtitle is-4">Account Profile</p>

            <label>Name: </label>
            <div className="br-name" class="sp-below" class="wrapper">
              <MyTextField name="firstName" type="input" placeholder="first name" />
              <MyTextField name="lastName" type="input" placeholder="last name" />
            </div>

            <label>Gender: </label>
            <div className="br-gender" class="sp-below">
              <MyRadio name="gender" type="radio" value="Male" label="Male" />
              <MyRadio name="gender" type="radio" value="Female" label="Female" />
              <MyRadio name="gender" type="radio" value="Non-binary" label="Non-binary" />
            </div>

            <label>Contacts: </label>
            <div className="br-contacts" class="sp-below">
              <div class="wrapper">
                <div>
                  {/* phone number */}
                  <FormikSelect className="selectDd" name="phone_type" items={phone_typeItems} label="Phone Type" required />
                  <MyTextField name="phone" type="input" placeholder="Phone Number" />
                </div>
                <div>
                  {/* email */}
                  <FormikSelect className="selectDd" name="email_type" items={email_typeItems} label="Email Type" required />
                  <MyTextField name="email" type="input" placeholder="Phone Number" />
                </div>
              </div>
            </div>

            <div className="br-address" class="sp-below">
              <label>Address: </label>
              <div class="wrapper2">
                <MyTextField name="address1" type="input" placeholder="Address 1" />
                <MyTextField name="address2" type="input" placeholder="Address 2" />
              </div>
              <div className="br-cityStateZip" class="wrapper">
                <MyTextField name="city" type="input" placeholder="City" />
                <MyTextField name="state" type="input" placeholder="State" />
                <MyTextField name="zip" type="input" placeholder="Zip Code" />
              </div>
            </div>

            <div className="br-workInfo" class="sp-below">
              <label>Work Information: </label>
              <div className="wrapper">
                <MyTextField name="title" type="input" placeholder="Title" />
                <MyTextField name="jobCategory" type="input" placeholder="Job Category" />
              </div>
              <div className="wrapper">
                <MyTextField name="department" type="input" placeholder="Department" />
                <MyTextField name="guildAssociation" type="input" placeholder="Guild & Associations" />
              </div>
            </div>

            <div class="sp-below">
              <button disabled={isSubmitting} type="submit">
                Submit
              </button>
              <button type="reset">Clear</button>
            </div>

            <pre>Values: {JSON.stringify(values, null, 2)}</pre>
            <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreatorBackgroundForm
