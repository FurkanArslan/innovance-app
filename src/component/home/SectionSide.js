import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

export default function SectionSide() {
    return (
        <React.Fragment>
            <Title>Section Side</Title>
            <Typography variant="body2" sx={{flex: 1}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
            </Typography>
        </React.Fragment>
    );
}
