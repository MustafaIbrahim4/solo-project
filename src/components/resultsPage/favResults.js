import React, { Component } from 'react'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2'


class favResult extends Component {
    componentDidMount() {
        this.getFavs(this.props.reduxStore.user.id)
    }

    getFavs(id) {
        this.props.dispatch({ type: 'FAV', payload: id });
    }

    handleDelete = (id) => {
        console.log('in fav delete', id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({ type: 'DELETE_FAV', payload: id });
                Swal.fire(
                    'Smart Mark Deleted!',

                    'success'

                )
            }
        })

    }


    displayItems = (list) => {
        if (list) {
            return (
                <div>
                    <header> Your Favorite Marks</header>
                    {list.map(item =>
                        <table>
                            <tr>
                                <th>Topic</th>
                                <th>Error-Code</th>
                                <th>Site-Name</th>
                                <th>link</th>
                                <th>Delete Favorite </th>

                            </tr>
                            <tr>
                                <td>{item.topic}</td>
                                <td>{item.errorcode}</td>
                                <td>{item.site}</td>
                                <td><a href={item.url}>{item.url}</a></td>
                                <td>   <button onClick={() => this.handleDelete(item.id)}>Delete</button></td>

                            </tr>
                        </table>


                    )}
                </div>
            )


        }
    }
    render() {
        return (
            <div>
                {this.displayItems(this.props.getFav)}
            </div>
        )
    }
}
const putPropsOnRedux = (reduxStore) => ({
    getFav: reduxStore.getFav,
    reduxStore
})
export default withRouter(connect(putPropsOnRedux)(favResult));
