import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Divider } from '@material-ui/core';
import AllPagesPDFViewer from '../pdf/AllPages';
import testPDF from '../pdf/test.pdf';

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  allPage: {
    height: '100%',
    maxHeight: '100%',
    overflow: 'auto',
  },
}));

// Handles the component for displaying a lesson/pdf
export default function Lesson() {
  const classes = useStyles();

  return (
    <>
      <Card>
        <Divider />
        <Box sx={{ minWidth: 800 }}>
          <Box sx={{ m: 5 }}>
            <div className={classes.allPage}>
              <AllPagesPDFViewer pdf={testPDF} />
            </div>
          </Box>
        </Box>
      </Card>
    </>
  );
}
