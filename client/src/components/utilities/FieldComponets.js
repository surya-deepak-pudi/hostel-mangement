import React from "react"
import {
  TextField,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel
} from "@material-ui/core"

import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded"
import {
  MdTextField,
  XsTextField,
  SmTextField,
  RedButton
} from "./styledComponents"

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
