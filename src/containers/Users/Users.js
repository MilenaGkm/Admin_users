import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { getUsers } from '../../redux/actions/users';
import Card from '../../components/Card/Card';

const Users = ({apiUsers, isLoading, error, fetchUsers}) => {
   
    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {apiUsers.length === 0 && !isLoading && <p>No users available!</p>}
            {error && !isLoading && <p>{error}</p>}
            {apiUsers.length > 0 && apiUsers.map((user) => (
                <Card key={user._id} user={user} />
            ))}
        </div>
    )
}

const mapStateToProps = (state) => ({
    apiUsers: state.users.users,
    isLoading: state.users.loading,
    error: state.users.error
})

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => dispatch(getUsers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Users);