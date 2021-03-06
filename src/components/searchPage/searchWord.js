import React, { Component } from 'react';
//Connect to the redux store
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2'


export class searchWord extends Component {
    state = {
        word: '',
    }
    handleChange = (event) => {
        this.setState({
            ...this.state,
            word: event.target.value

        })

    }
    handleSubmit = (event) => {
        if (this.state.word === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'please enter in refrence words!',
            })
        } else {
            event.preventDefault();
            console.log(this.state.word);
            this.props.dispatch({ type: 'GET_WORD', payload: { newWord: this.state.word } })
            this.props.history.push('/wordResults');

        }
    }
    handleBack = () => {
        this.props.history.push('/home');
    }

    render() {
        return (
            <div class="move">
                <h1>Search By Refrence-Words</h1>
                <input type='text'
                    value={this.state.word}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSubmit}>Search </button>
                <button onClick={this.handleBack}>Back</button>

            </div>
        )
    }
}




const putPropsOnReduxStore = (reduxStore) => ({
    reduxStore

});



export default withRouter(connect(putPropsOnReduxStore)(searchWord));
