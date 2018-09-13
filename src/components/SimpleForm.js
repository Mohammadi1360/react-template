import React, {Component, Fragment} from 'react';
import {Field, reduxForm, SubmissionError, reset} from 'redux-form';
import {FormGroup, FormControl, Button, Panel, Alert} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';

const owners = ['Allen', 'Bob', 'Cat'];
const types = ['Cloud Service', 'Message Service', 'Add Service', 'Edit Service', 'Money'];

const columns = [{
    dataField: 'id',
    text: 'ID'
}, {
    dataField: 'name',
    text: 'Job Name',
    filter: textFilter()
}, {
    dataField: 'owner',
    text: 'Job Owner',
    filter: textFilter(),
    formatter: (cell, row) => owners[cell],
    filterValue: (cell, row) => owners[cell]
}, {
    dataField: 'type',
    text: 'Job Type',
    filter: textFilter(),
    filterValue: (cell, row) => types[cell]
}];

let jobs = [
    {id: 0, name: 'Job name 0', owner: 1, type: 3},
    {id: 1, name: 'Job name 1', owner: 2, type: 2},
    {id: 2, name: 'Job name 2', owner: 3, type: 1},
    {id: 3, name: 'Job name 3', owner: 2, type: 3},
    {id: 4, name: 'Job name 4', owner: 1, type: 5},
    {id: 5, name: 'Job name 5', owner: 3, type: 4},
    {id: 6, name: 'Job name 6', owner: 1, type: 1},
];

class SimpleForm extends Component {

    // constructor(props, context) {
    //   super(props, context);
    // }

    handleDismiss = () => {
        const {dispatch} = this.props;
        dispatch(reset('simple'));
    };

    locationInput = ({input, meta: {touched, error}, ...custom}) => {
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

    submit({location}, dispatch) {
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


    loadData = (dispatch) => {
        console.log("Here 0 : ");
        return new Promise((resolve, reject) => {
            dispatch({
                type: 'FETCH_CUSTOMER_LIST',
                resolve,
                reject
            });
        }).catch((error) => {
            throw new SubmissionError(error);
        });
        //

        console.log("Here 1 : ");
        console.log(this.props.customer);
    }


    render() {
        const {handleSubmit, pristine, submitting, dispatch} = this.props;

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            // style: (row, rowIndex) => {
            //     const backgroundColor = '#00BFFF';
            //     return {backgroundColor};
            // }
            classes: (row, rowIndex) =>
                (rowIndex > -1 ? 'warning' : 'info')
        };

        return (
            <Fragment>
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

                            <Button bsStyle="info"
                                    type='button'
                                    bsSize="large"
                                    block onClick={this.loadData}>load</Button>

                        </form>
                    </Panel.Body>
                </Panel>

                <Panel bsStyle="info">
                    <Panel.Heading>Psrsonnel List</Panel.Heading>
                    <Panel.Body>
                        <BootstrapTable
                            hover={true}
                            keyField='id'
                            data={jobs}
                            columns={columns}
                            filter={filterFactory()}
                            selectRow={selectRow}
                        />
                    </Panel.Body>
                </Panel>

            </Fragment>

        );
    }
}

const validate = values => {
    const {location} = values;
    const error = {};
    if (!location || location.trim() === '') {
        error.location = ' Location Is Required';
    }
    return error;
};

export default reduxForm({
    form: ' simple',
    validate
})(SimpleForm);
