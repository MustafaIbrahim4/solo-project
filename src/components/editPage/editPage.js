import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl } from '@material-ui/core';
import { Input } from '@material-ui/core';
import Swal from 'sweetalert2'

class editPage extends Component {

    state = ({
        id: this.props.edit.id,
        errorCode: this.props.edit.errorcode,
        url: this.props.edit.url,
        siteName: this.props.edit.site,
        topic: this.props.edit.topic
    })



    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        })

    }

    handleBack = () => {
        this.props.history.push('/allResults');
    }

    handleClick = (event) => {
        if (this.state.url === '' || this.state.siteName === '' || this.state.topic === '') {
            Swal.fire({
                position: 'middle-end',
                icon: 'error',
                title: 'please fill out the form below',
                showConfirmButton: false,
                timer: 1600
            })
        } else {
            event.preventDefault();
            console.log('In submit edit ', this.state);
            this.props.dispatch({
                type: 'EDIT', payload: {
                    id: this.state.id,
                    errorCode: this.state.errorCode,
                    url: this.state.url,
                    siteName: this.state.siteName,
                    topic: this.state.topic

                }

            })
        }

        this.setState({
            errorCode: '',
            url: '',
            siteName: '',
            topic: ''
        })
        this.props.history.push('/allResults');

    }

    render() {
        return (
            <>
                <FormControl className>
                    <h1>EDIT MARK</h1>
                    <input
                        type="text"
                        name="errorCode"
                        placeholder=" error Code"
                        onChange={this.handleChange('errorCode')}
                        value={this.state.errorCode} />
                    <input
                        type="text"
                        name="url"
                        placeholder="url"
                        onChange={this.handleChange('url')}
                        value={this.state.url} />
                    <input
                        type="text"
                        name="siteName"
                        placeholder="site Name"
                        onChange={this.handleChange('siteName')}
                        value={this.state.siteName} />
                    <input
                        type="text"
                        name="topic"
                        placeholder="topic"
                        onChange={this.handleChange('topic')}
                        value={this.state.topic} />

                    <button onClick={this.handleClick}>Submit</button>
                    <button onClick={this.handleBack}>Back</button>

                </FormControl>

            </>

        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    edit: reduxState.edit
});

export default connect(mapReduxStateToProps)(editPage);