import React, { Component } from 'react'
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup } from 'reactstrap';

export default function AddOrEditCommentForm({ defaultValues, onSubmit, edit }) {

  return (
    <AvForm onValidSubmit={onSubmit} model={defaultValues}>
      {!edit && <AvField name="author" label="Author" placeholder="Enter your name here." required />}
      <Label>Body</Label>
      <AvInput name="body" label="Body" type="textarea" placeholder="You can say anything here :)" required />
      <FormGroup className='formSubmit'>
        <Button color='primary'>{ edit ? 'Edit' : 'Add' }</Button>
      </FormGroup>
    </AvForm>
  )
}
