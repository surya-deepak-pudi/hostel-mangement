import React from "react"
import {
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormControl,
  InputLabel,
  FormHelperText,
  Input
} from "@material-ui/core"
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded"
import {
  MdTextField,
  XsTextField,
  SmTextField,
  RedButton,
  StyledSelect
} from "./styledComponents"
import { Field } from "redux-form"

export const TextFieldComponent = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => {
  switch (custom.size) {
    case "md":
      return (
        <MdTextField
          label={label}
          placeholder={label}
          error={touched && invalid}
          helperText={touched && error}
          {...input}
          {...custom}
        />
      )
    case "xs":
      return (
        <XsTextField
          label={label}
          placeholder={label}
          error={touched && invalid}
          helperText={touched && error}
          {...input}
          {...custom}
        />
      )
    case "sm":
      return (
        <SmTextField
          label={label}
          placeholder={label}
          error={touched && invalid}
          helperText={touched && error}
          {...input}
          {...custom}
        />
      )
    default:
      return (
        <TextField
          label={label}
          placeholder={label}
          error={touched && invalid}
          helperText={touched && error}
          {...input}
          {...custom}
        />
      )
  }
}

export const SyncTextField = data => {
  const {
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  } = data
  console.log(data)
  return (
    <FormControl>
      <InputLabel htmlFor="component-sync">{label}</InputLabel>
      <Input
        placeholder={label}
        id="component-sync"
        {...input}
        error={(touched && invalid) || custom.provideError}
        helperText={touched && error}
        aria-describedby="component-error-text"
      />
      <FormHelperText id="component-error-text" error={true}>
        {custom.helperText}
      </FormHelperText>
    </FormControl>
  )
}

export const radioButtonComponent = ({ input }) => {
  const selectedValue = input.value
  return (
    <FormControl style={{ display: "inline-block" }}>
      <FormLabel component="legend">AC:</FormLabel>
      <RadioGroup
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        row
      >
        <FormControlLabel
          value={true}
          control={<Radio />}
          label="YES"
          labelPlacement="start"
          checked={selectedValue === "true" || selectedValue === true}
        />
        <FormControlLabel
          value={false}
          control={<Radio />}
          label="NO"
          labelPlacement="start"
          checked={selectedValue === "false" || selectedValue === false}
        />
      </RadioGroup>
    </FormControl>
  )
}

export const DeleteButton = ({ onClickMethod }) => {
  return (
    <RedButton size="small" onClick={onClickMethod}>
      <DeleteOutlineRoundedIcon></DeleteOutlineRoundedIcon>
    </RedButton>
  )
}

export const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error} style={{ marginBottom: "20px" }}>
    <InputLabel htmlFor="age-native-simple" style={{ marginLeft: "20px" }}>
      {input.name}
    </InputLabel>
    <StyledSelect
      variant="outlined"
      native
      {...input}
      {...custom}
      inputProps={{
        name: "Branch",
        id: "age-native-simple"
      }}
    >
      {children}
    </StyledSelect>
    {renderFromHelper({ touched, error })}
  </FormControl>
)

export const renderOptions = branches => {
  if (branches) {
    let branchesArr = Object.values(branches)
    return (
      <Field name="Branch" component={renderSelectField} label="branch">
        <option value=""></option>
        {branchesArr.map(branch => {
          return <option value={branch._id}>{branch.name}</option>
        })}
      </Field>
    )
  }
}
