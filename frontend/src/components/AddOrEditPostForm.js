import React from 'react'
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup } from 'reactstrap';

export default function AddOrEditPostForm({ defaultValues, categories, onSubmit, edit }) {

  return (
    <AvForm onValidSubmit={onSubmit} model={defaultValues}>
      <AvField name="id" style={{'display': 'none'}} />
      <AvField name="title" label="Title" placeholder="Enter a title for the post." required />
      {!edit && <AvField name="author" label="Author" placeholder="Enter your name." required />}
      {!edit && <AvField name="category" type="select" label="Category" helpMessage="Select a category for the post topic." value={categories[0].name} required>
        {categories.map(category => (<option key={category.path}>{category.name}</option>))}
      </AvField>}
      <Label>Body</Label>
      <AvInput name="body" label="Body" type="textarea" placeholder="You can say anything here :)" />
      <FormGroup className='formSubmit'>
        <Button color='primary'>{ edit ? 'Edit' : 'Add' }</Button>
      </FormGroup>
    </AvForm>
  )
}
