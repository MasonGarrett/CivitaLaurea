import React from 'react';
import { Box, Card, Divider } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Displays the course about information
export default function About() {
  return (
    <Card>
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Box sx={{ m: 5 }}>
            <h2>Title Placeholder</h2>
            <hr />
            <br />
            <p>About content place holder</p>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}
