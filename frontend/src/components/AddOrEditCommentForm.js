import React, { Component } from 'react'
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup } from 'reactstrap';

export default function AddOrEditCommentForm({ defaultValues, onSubmit, edit }) {
  const hiddenStyle = {
    'display': 'none'
  }

  return (
    <AvForm onValidSubmit={onSubmit} model={defaultValues}>
      <AvField name="id" style={hiddenStyle} />
      <AvField name="parentId" style={hiddenStyle} />
      <AvField name="author" style={hiddenStyle} />
      {!edit && <AvField name="author" label="Author" placeholder="Enter your name here." required />}
      <Label>Body</Label>
      <AvInput name="body" label="Body" type="textarea" placeholder="You can say anything here :)" />
      <FormGroup className='formSubmit'>
        <Button color='primary'>{ edit ? 'Edit' : 'Add' }</Button>
      </FormGroup>
    </AvForm>
  )
}
