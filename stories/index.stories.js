import React from 'react';

import {storiesOf} from '@storybook/react';
import {muiTheme} from 'storybook-addon-material-ui';

import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const action = msg => () => console.log(msg);

const MaterialComponent = withStyles(
    theme => ({
        card: {
            maxWidth: 800,
            margin: 'auto',
        },
        media: {
            height: 0,
            paddingTop: '30%', // 16:9
        },
    }),
    {withTheme: true}
)(({classes, variant}) => (
    <>
        <Button size="small" variant={variant} onClick={action('Default')}>
            Default
        </Button>
        <Button
            size="small"
            color="primary"
            variant={variant}
            onClick={action('primary')}
        >
            primary
        </Button>
        <Button
            size="small"
            color="secondary"
            variant={variant}
            onClick={action('secondary')}
        >
            secondary
        </Button>
        <Button
            size="small"
            disabled
            variant={variant}
            onClick={action('disabled')}
        >
            disabled
        </Button>
    </>
));

storiesOf('Button', module)
    .addDecorator(muiTheme())
    .add('Text Buttons', () => <MaterialComponent/>)
    .add('Outlined Buttons', () => <MaterialComponent variant="outlined"/>)
    .add('Contained Buttons', () => <MaterialComponent variant="contained"/>);
