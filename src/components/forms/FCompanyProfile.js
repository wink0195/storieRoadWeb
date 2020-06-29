import { Button, FormControlLabel, Radio, TextField } from '@material-ui/core'
import { StylesProvider } from '@material-ui/core/styles'
import { Form, Formik, useField } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import FormikSelect from '../formikBits/FormikSelect'

const MyTextFieldV2 = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ''
  return (
    <StylesProvider injectFirst="true" class="long-textInput">
      <TextField
        placeholder={placeholder}
        {...field}
        helperText={errorText}
        error={!!errorText} //casting this string to a boolean
        class="space"
      />
    </StylesProvider>
  )
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const zipRegExp = /^[0-9]{5}(?:-[0-9]{4})?$/

const company_typeItems = [
  {
    label: '...',
    value: ''
  },
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
    label: '...',
    value: ''
  },
  {
    label: 'Work',
    value: 'work'
  },
  {
    label: 'Personal',
    value: 'personal'
  }
]

const stateAbbreviations = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY']

const JobTitle_Types = [
  { label: '...', value: '' },
  { label: 'Academic (Faculty, Administrative)', value: 'Academic (Faculty, Administrative)' },
  { label: 'Actor', value: 'Actor' },
  { label: 'Agent/Manager', value: 'Agent/Manager' },
  { label: 'Analyst', value: 'Analyst' },
  { label: 'Assistant/Administrative', value: 'Assistant/Administrative' },
  { label: 'Associate/Coordinator', value: 'Associate/Coordinator' },
  { label: 'Attorney/Counsel', value: 'Attorney/Counsel' },
  { label: 'Casting Director', value: 'Casting Director' },
  { label: 'Consultant', value: 'Consultant' },
  { label: 'Executive (director, CE, Story Editor, etc.)', value: 'Executive (director, CE, Story Editor, etc.)' },
  { label: 'Filmmaker/Director/Writer', value: 'Filmmaker/Director/Writer' },
  { label: 'Game Developer', value: 'Game Developer' },
  { label: 'Intern', value: 'Intern' },
  { label: 'Other', value: 'Other' },
  { label: 'Producer', value: 'Producer' },
  { label: 'Publicist', value: 'Publicist' },
  { label: 'Reporter/Journalist', value: 'Reporter/Journalist' },
  { label: 'Researcher', value: 'Researcher' },
  { label: 'Senior executive (CEO, VP, Senior VP, EVP, etc)', value: 'Senior executive (CEO, VP, Senior VP, EVP, etc)' },
  { label: 'Senior Management', value: 'Senior Management' },
  { label: 'Student', value: 'Student' }
]

//VALIDATION
const validationSchema = Yup.object({
  companyName: Yup.string().required().max(25),
  zip: Yup.string().required().max(10).matches(zipRegExp, 'Zip code is not valid'),
  companyType: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  emailAddress: Yup.string().email(),
  state: Yup.string().max(2).oneOf(stateAbbreviations, 'State abreviation is not valid')
})

function CompanyProfileForm() {
  return (
    <div className="center-form">
      <div className="center-form">
        {/* DEFAULT VALUES */}
        <Formik
          initialValues={{
            companyName: '',
            companyType: '',
            emailAddress: '',
            gender: '',
            zip: '',
            state: ''
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
            <Form className="my-form">
              <div className="inside-form">
                <p className="subtitle is-4">Company Profile</p>
                <hr class="divider"></hr>

                <label>Company: </label>
                <div className="br-name" class="sp-below" class="wrapper">
                  <MyTextFieldV2 name="companyName" type="input" placeholder="company name*" />
                  <FormikSelect className="selectDd" name="company_type" items={company_typeItems} label="Company Type" required />
                </div>

                <div className="br-address" class="sp-below">
                  <label>Address: </label>
                  <div class="wrapper2">
                    <MyTextFieldV2 name="address1" type="input" placeholder="address line 1" class="long-textInput" />
                    <MyTextFieldV2 name="address2" type="input" placeholder="address line 2" />
                  </div>
                  <div className="br-cityStateZip" class="wrapper">
                    <MyTextFieldV2 name="city" type="input" placeholder="city" />
                    <MyTextFieldV2 name="state" type="input" placeholder="state abreviation" />
                    <MyTextFieldV2 name="zip" type="input" placeholder="zip code*" />
                  </div>
                </div>

                <label>Contacts: </label>
                <div className="br-contacts" class="sp-below">
                  <div class="wrapper">
                    <div>
                      {/* phone number */}
                      <FormikSelect className="selectDd" name="company_type" items={company_typeItems} label="Company Type" required />
                      <MyTextFieldV2 name="companyType" type="input" placeholder="company type" />
                    </div>
                    <div>
                      {/* email */}
                      <FormikSelect className="selectDd" name="email_type" items={email_typeItems} label="Email Type" required />
                      <MyTextFieldV2 name="emailAddress" type="input" placeholder="email address" />
                    </div>
                  </div>
                </div>

                <div className="br-workInfo" class="sp-below">
                  <label>Career Information: </label>
                  <div className="wrapper">
                    <FormikSelect className="selectDd" name="jobTitle" items={JobTitle_Types} label="Job Title" required />
                    {/* <MyTextFieldV2 name="title" type="input" placeholder="job title" /> */}
                    <FormikSelect className="selectDd" name="jobTitle" items={JobTitle_Types} label="Job Title" required />
                    {/* <MyTextFieldV2 name="jobCategory" type="input" placeholder="job category" /> */}
                  </div>
                  <div className="wrapper">
                    <MyTextFieldV2 name="department" type="input" placeholder="department" />
                    <MyTextFieldV2 name="guildAssociation" type="input" placeholder="guild or association" />
                  </div>
                </div>

                <div class="sp-below" class="center-form">
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                  <Button type="reset">Clear</Button>
                </div>
              </div>

              <pre>Values: {JSON.stringify(values, null, 2)}</pre>
              <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CompanyProfileForm
