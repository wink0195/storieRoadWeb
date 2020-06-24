import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { ErrorMessage, Field } from 'formik'
import React from 'react'

// export const Fstyles = styled.div

const FormikSelectStyle = {
  margin: '0px',
  width: 'inherit'
}

const MaterialUISelectField = ({ errorString, label, children, value, name, onChange, onBlur, required }) => {
  return (
    <FormControl style={{ width: '100%' }}>
      <InputLabel required={required}>{label}</InputLabel>
      <Select name={name} onChange={onChange} onBlur={onBlur} value={value}>
        {children}
      </Select>
      <FormHelperText>{errorString}</FormHelperText>
    </FormControl>
  )
}

const FormikSelect = ({ name, items, label, required = false }) => {
  return (
    <div className="FormikSelect" style={FormikSelectStyle}>
      <Field
        name={name}
        as={MaterialUISelectField}
        label={label}
        errorString={<ErrorMessage name={name} />}
        // required={required} //takes away *
      >
        {items.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Field>
    </div>
  )
}

export default FormikSelect
