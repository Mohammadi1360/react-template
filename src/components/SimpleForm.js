import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import { FormGroup, FormControl, Button, Panel, Alert } from 'react-bootstrap';

class SimpleForm extends Component {

  // constructor(props, context) {
  //   super(props, context);
  // }

  handleDismiss = () => {
    const { dispatch } = this.props;
    dispatch(reset('simple'));
  };

  locationInput = ({ input, meta: { touched, error }, ...custom }) => {
    const hasError = touched && error !== undefined;

    return (

      <div>

        <FormGroup controlId="locationId"
                   validationState={hasError ? 'error' : 'success'}>

          {hasError &&
          <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
            <h4>Oh snap! You got an error!</h4>
            <p>
              {error}
            </p>
          </Alert>
          }

          <FormControl type="text"
                       placeholder='Location...'
                       {...input}
                       {...custom} />

        </FormGroup>
      </div>

    );
  };

  submit({ location }, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'FETCH_WEATHER',
        location,
        resolve,
        reject
      });
    }).catch((error) => {
      throw new SubmissionError(error);
    });
    //
  }


  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <Panel bsStyle="default">
        <Panel.Heading>Search Weather</Panel.Heading>

        <Panel.Body>
          <form onSubmit={handleSubmit(this.submit.bind(this))}>
            <Field name='location' component={this.locationInput}/>
            <Button disabled={pristine || submitting}
                    bsStyle="primary"
                    type='submit'
                    bsSize="large"
                    block>Submit</Button>

          </form>
        </Panel.Body>
      </Panel>
    );
  }
}

const validate = values => {
  const { location } = values;
  const error = {};
  if (!location || location.trim() === '') {
    error.location = 'Location Is Required';
  }
  return error;
};

export default reduxForm({
  form: 'simple',
  validate
})(SimpleForm);
