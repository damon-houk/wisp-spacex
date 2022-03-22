import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import {useSpaceX, STATUS_FETCHING} from "./SpaceXProvider";

const testLaunches = JSON.parse('[{"rocket":{"name":"Falcon 1","id":"5e9d0d95eda69955f709d1eb"},"details":"Engine failure at 33 seconds and loss of vehicle","flight_number":1,"name":"FalconSat","id":"5eb87cd9ffd86e000604b32a"},{"rocket":{"name":"Falcon 1","id":"5e9d0d95eda69955f709d1eb"},"details":"Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage","flight_number":2,"name":"DemoSat","id":"5eb87cdaffd86e000604b32b"},{"rocket":{"name":"Falcon 1","id":"5e9d0d95eda69955f709d1eb"},"details":"Residual stage 1 thrust led to collision between stage 1 and stage 2","flight_number":3,"name":"Trailblazer","id":"5eb87cdbffd86e000604b32c"},{"rocket":{"name":"Falcon 1","id":"5e9d0d95eda69955f709d1eb"},"details":"Ratsat was carried to orbit on the first successful orbital launch of any privately funded and developed, liquid-propelled carrier rocket, the SpaceX Falcon 1","flight_number":4,"name":"RatSat","id":"5eb87cdbffd86e000604b32d"},{"rocket":{"name":"Falcon 1","id":"5e9d0d95eda69955f709d1eb"},"details":null,"flight_number":5,"name":"RazakSat","id":"5eb87cdcffd86e000604b32e"},{"rocket":{"name":"Falcon 9","id":"5e9d0d95eda69973a809d1ec"},"details":null,"flight_number":6,"name":"Falcon 9 Test Flight","id":"5eb87cddffd86e000604b32f"},{"rocket":{"name":"Falcon 9","id":"5e9d0d95eda69973a809d1ec"},"details":null,"flight_number":7,"name":"COTS 1","id":"5eb87cdeffd86e000604b330"},{"rocket":{"name":"Falcon 9","id":"5e9d0d95eda69973a809d1ec"},"details":"Launch was scrubbed on first attempt, second launch attempt was successful","flight_number":8,"name":"COTS 2","id":"5eb87cdfffd86e000604b331"},{"rocket":{"name":"Falcon 9","id":"5e9d0d95eda69973a809d1ec"},"details":"CRS-1 successful, but the secondary payload was inserted into abnormally low orbit and lost due to Falcon 9 boost stage engine failure, ISS visiting vehicle safety rules, and the primary payload owner\'s contractual right to decline a second ignition of the second stage under some conditions.","flight_number":9,"name":"CRS-1","id":"5eb87ce0ffd86e000604b332"},{"rocket":{"name":"Falcon 9","id":"5e9d0d95eda69973a809d1ec"},"details":"Last launch of the original Falcon 9 v1.0 launch vehicle","flight_number":10,"name":"CRS-2","id":"5eb87ce1ffd86e000604b333"}]');
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

        alert(params.row.links.presskit)
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
