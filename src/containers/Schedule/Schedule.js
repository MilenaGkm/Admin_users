import React, { useState, useEffect } from "react"
import { connect } from "react-redux";
import { getSchedule } from '../../redux/actions/schedule';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import {
    ViewState,
} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    DayView,
    Appointments,
    Toolbar,
    DateNavigator,
    ViewSwitcher,
    AppointmentForm,
    AppointmentTooltip,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

const PUBLIC_KEY = 'AIzaSyBnNAISIUKe6xdhq1_rjor2rxoI3UlMY7k';
const CALENDAR_ID = 'f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com';

// const getData = (setData, setLoading) => {
//     const dataUrl = ['https://www.googleapis.com/calendar/v3/calendars/', CALENDAR_ID, '/events?key=', PUBLIC_KEY].join('');
//     setLoading(true);

//     return fetch(dataUrl)
//         .then(response => response.json())
//         .then((data) => {
//             setTimeout(() => {
//                 setData(data.items);
//                 setLoading(false);
//             }, 600);
//         });
// };

const styles = {
    toolbarRoot: {
        position: 'relative',
    },
    progress: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
    },
};

const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
    ({ children, classes, ...restProps }) => (
        <div className={classes.toolbarRoot}>
            <Toolbar.Root {...restProps}>
                {children}
            </Toolbar.Root>
            <LinearProgress className={classes.progress} />
        </div>
    ),
);

const initialState = {
    loading: false,
    currentDate: '2021-08-19',
    currentViewName: 'Week',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'setLoading':
            return { ...state, loading: action.payload };
        case 'setCurrentViewName':
            return { ...state, currentViewName: action.payload };
        case 'setCurrentDate':
            return { ...state, currentDate: action.payload };
        default:
            return state;
    }
};

const CustomAppointment = ({ style, ...restProps }) => {
    if (restProps.data.title === "IronMan")
      return (
        <Appointments.Appointment
          {...restProps}
          style={{ ...style, backgroundColor: "red" }}
        />
      );
    if (restProps.data.title === "JakeDope")
      return (
        <Appointments.Appointment
          {...restProps}
          style={{ ...style, backgroundColor: "green" }}
        />
      );
    return (
      <Appointments.Appointment
        {...restProps}
        style={style}
      />
    );
  };

// export default  () => {
const Schedule = ({ apiSchedule, apiUsers, isLoading, error, fetchMsgs, fetchSchedule, addMsg }) => {
    const [schedule, setSchedule] = useState([]);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const { data, loading, currentViewName, currentDate } = state;
    const setCurrentViewName = React.useCallback(nextViewName => dispatch({
        type: 'setCurrentViewName', payload: nextViewName,
    }), [dispatch]);
    const setData = React.useCallback(nextData => dispatch({
        type: 'setData', payload: nextData,
    }), [dispatch]);
    const setCurrentDate = React.useCallback(nextDate => dispatch({
        type: 'setCurrentDate', payload: nextDate,
    }), [dispatch]);
    const setLoading = React.useCallback(nextLoading => dispatch({
        type: 'setLoading', payload: nextLoading,
    }), [dispatch]);

    useEffect(() => {
        fetchSchedule()
    }, []
    )

    useEffect(() => {
        (async () => {
            let schedulerData = [];
            for (let schedule of apiSchedule) {
                for (let shift of schedule.shifts) {
                    const timeSeries = (shiftPeriod, startDate, endDate) => {
                        if (shift[shiftPeriod]) {
                            let scheduledShift = {
                                title: { ...apiUsers.find(user => user._id === shift[shiftPeriod]) }.username,
                                startDate: new Date(shift.date + [startDate]).toLocaleString(),
                                endDate: new Date(shift.date + [endDate]).toLocaleString()
                            }
                            schedulerData.push(scheduledShift)
                        }
                    }
                    timeSeries("morning", " 08:00:00", " 12:00:00")
                    timeSeries("noon", " 12:00:00", " 16:00:00")
                    timeSeries("evening", " 16:00:00", " 20:00:00")
                }
            }
            setSchedule(schedulerData)
        })()
    }, [apiSchedule])

    return (
        <Paper>
            <Scheduler
                data={schedule}
                height={400}
            >
                <ViewState
                    currentDate={currentDate}
                    currentViewName={currentViewName}
                    onCurrentViewNameChange={setCurrentViewName}
                    onCurrentDateChange={setCurrentDate}
                />
                <DayView
                    startDayHour={7.5}
                    endDayHour={20.5}
                />
                <WeekView
                    startDayHour={7.5}
                    endDayHour={20.5}
                />
                <Appointments
                    appointmentComponent={CustomAppointment}
                />
                <Toolbar
                    {...loading ? { rootComponent: ToolbarWithLoading } : null}
                />
                <DateNavigator />
                <TodayButton />
                <ViewSwitcher />
                <AppointmentTooltip
                    showOpenButton
                    showCloseButton
                />
                <AppointmentForm readOnly />
            </Scheduler>
        </Paper>
    );
};

const mapStateToProps = (state) => ({
    apiSchedule: state.schedule.schedule,
    isLoading: state.schedule.loading,
    error: state.schedule.error,
    apiUsers: state.users.users,
    // isLoading: state.users.loading,
    // error: state.users.error
})

const mapDispatchToProps = (dispatch) => ({
    fetchSchedule: () => dispatch(getSchedule()),
    // addMsg: (formMsg) => dispatch(addToDbMsg(formMsg)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);