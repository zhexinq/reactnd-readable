import React, { Component } from 'react'
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup } from 'reactstrap';

export default function AddOrEditPostForm({ defaultValues, onSubmit, edit }) {

  return (
    <AvForm onValidSubmit={onSubmit} model={defaultValues}>
      <AvField name="title" label="Title" placeholder="Enter a title for the post." required />
      <AvField name="author" label="Author" placeholder="Enter your name." required />
      <AvField name="category" label="Category" placeholder="Enter a category for the post topic." required />
      <Label>Body</Label>
      <AvInput name="body" label="Body" type="textarea" placeholder="You can say anything here :)" required />
      <FormGroup className='formSubmit'>
        <Button color='primary'>{ edit ? 'Edit' : 'Add' }</Button>
      </FormGroup>
    </AvForm>
  )
}
