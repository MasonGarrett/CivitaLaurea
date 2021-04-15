import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Container,
  Grid,
  Pagination,
} from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';
// import products from '../__mocks__/products';
// import LessonCard from './course/LessonCard';

// import { db } from '../firebase';
// import { selectUser } from '../features/userSlice';
// import SinglePagePDFViewer from './pdf/SinglePage';
import AllPagesPDFViewer from '../pdf/AllPages';

import testPDF from '../pdf/test.pdf';
import testPDF2 from '../pdf/test2.pdf';

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

export default function Lesson() {
  const classes = useStyles();

  //   const user = useSelector(selectUser);

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
