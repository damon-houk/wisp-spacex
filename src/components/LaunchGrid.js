import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import {useSpaceX, STATUS_FETCHING} from "./SpaceXProvider";

export default function LaunchGrid() {
    const {launches, status} = useSpaceX()
    const [dialogData, setDialogData] = React.useState(undefined)
    const columns = [
        {
            field: 'flight_number',
            headerName: 'Number',
            width: 75,
            headerAlign: 'center',
        },
        {
            field: 'year',
            headerName: 'Year',
            description: 'Year of launch.',
            width: 100,
            headerAlign: 'center',
            valueGetter: (params) => {
                const d = new Date(params.row.date_utc)
                return d.getFullYear()
            }
        },
        {
            field: 'rocket',
            headerName: 'Rocket',
            width: 100,
            headerAlign: 'center',
            valueGetter: (params) => params.row.rocket.name
        },
        {
            field: 'name',
            headerName: 'Flight',
            width: 200,
            headerAlign: 'center',
        },
        {
            field: 'details',
            headerName: 'Details',
            type: 'number',
            width: 400,
            headerAlign: 'center',
        }
    ];

    const cellClickHandler = (params) => {
        params.row.links.presskit ? (window.location.href = params.row.links.presskit) : setDialogData({
            title: `No Press Kit For ${params.row.name}`,
            text: `${params.row.links.wikipedia ? `Wikipedia URL: ${params.row.links.wikipedia}` : 'No wikipedia link.'}`
        })
    }

    return <React.Fragment>{(status !== STATUS_FETCHING) ? <div style={{height: 800, width: '100%'}}>
        <Dialog open={dialogData != undefined}
                onClose={() => setDialogData(undefined)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{dialogData && dialogData.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{dialogData && dialogData.text}</DialogContentText>
            </DialogContent>
        </Dialog>
        <div style={{display: 'flex', height: '100%'}}>
            <div style={{flexGrow: 1}}>
                <DataGrid
                    rows={launches}
                    columns={columns}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    onRowClick={cellClickHandler}
                />
            </div>
        </div>
    </div> : <Box sx={{display: 'flex'}}>
        <CircularProgress/>
    </Box>
    }</React.Fragment>;
}
