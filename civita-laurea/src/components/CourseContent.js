import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Box, Button, Card, Divider, TextField } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { db } from '../firebase';
import { selectUser } from '../features/userSlice';
import SinglePagePDFViewer from './pdf/SinglePage';
import AllPagesPDFViewer from './pdf/AllPages';

import testPDF from './pdf/test.pdf';
import testPDF2 from './pdf/test2.pdf';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  allPage: {
    height: '100%',
    maxHeight: '500px',
    overflow: 'auto',
  },
}));

export default function CourseContent() {
  const classes = useStyles();

  const user = useSelector(selectUser);

  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          // component={RouterLink}
          to="/app/create-course"
          color="primary"
          variant="contained"
        >
          Add Content
        </Button>
      </Box>
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Box sx={{ m: 5 }}>
            <div className={classes.allPage}>
              <AllPagesPDFViewer pdf={testPDF} />
            </div>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}
