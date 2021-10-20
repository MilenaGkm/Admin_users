import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { getMsgs, addToDbMsg, deleteMsgFromDb } from '../../redux/actions/msgs';
import { getUsers } from '../../redux/actions/users';
import NewMsg from "../NewMsg/NewMsg"
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


const Msgs = ({ apiMsgs, apiUsers, isLoading, error, fetchMsgs, fetchUsers, addMsg, deleteMsg }) => {
    // const classes = useStyles();
    const [isOpen, setIsOpen] = React.useState([]);
    const classes = useRowStyles();

    const handleOnClick = (i) => {
        let handleIsOpen = [...isOpen]
        handleIsOpen[i] = !handleIsOpen[i]
        setIsOpen(handleIsOpen)
    }
    
    const handleDeleteMsg = (msg) => {
        deleteMsg(msg)
    }

    const handleSubmitMsg = formMsg => {
        formMsg.reciever_ids = formMsg.reciever_ids.map(user => user._id)
        addMsg(formMsg)
    }

    useEffect(() => {
        fetchMsgs()
    }, [])

    useEffect(() => {
        let newIsOpen = []
        for (let i = 0; i < apiMsgs.length; i++) {
            newIsOpen.push(false)
        }
        setIsOpen(newIsOpen)
    }, [apiMsgs])

    return (
        <div>
            <NewMsg users={apiUsers} msgs={apiMsgs} submitMsg={handleSubmitMsg} />
            {isLoading && <p>Loading...</p>}
            {apiMsgs.length === 0 && !isLoading && <p>No msgs available!</p>}
            {error && !isLoading && <p>{error}</p>}
            {apiMsgs.length > 0 &&
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>From</TableCell>
                                <TableCell>To</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        {apiMsgs.map((msg, i) => (
                            <TableBody key={i}>
                                <TableRow className={classes.root}>
                                    <TableCell>
                                        <IconButton aria-label="expand row" size="small" onClick={() => handleOnClick(i)}>
                                            {isOpen[i] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell component="th" scope="row">{msg.sender_id.username}</TableCell>
                                    <TableCell component="th" scope="row">{msg.reciever_id.username}</TableCell>
                                    <TableCell component="th" scope="row">{msg.subject}</TableCell>
                                    <TableCell component="th" scope="row">{msg.date}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" size="small" onClick={() => handleDeleteMsg(msg._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={isOpen[i]} timeout="auto" unmountOnExit>
                                            <Box margin={1}>
                                                <Typography gutterBottom component="div">
                                                    {msg.body}
                                                </Typography>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ))}
                    </Table>
                </TableContainer>
            }
        </div>
    )
}


const mapStateToProps = (state) => ({
    apiMsgs: state.msgs.msgs,
    isLoading: state.msgs.loading,
    error: state.msgs.error,
    apiUsers: state.users.users,
    isLoading: state.users.loading,
    error: state.users.error
})

const mapDispatchToProps = (dispatch) => ({
    fetchMsgs: () => dispatch(getMsgs()),
    addMsg: (formMsg) => dispatch(addToDbMsg(formMsg)),
    deleteMsg: (msg) => dispatch(deleteMsgFromDb(msg)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Msgs);