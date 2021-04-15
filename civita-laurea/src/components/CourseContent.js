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
import products from '../__mocks__/products';
import LessonCard from './course/LessonCard';

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
    <>
      <Card>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            component={RouterLink}
            to="/app/create-lesson"
            color="primary"
            variant="contained"
          >
            Add Content
          </Button>
        </Box>
      </Card>

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              <div id="courses" />
              {products.map((product) => (
                <Grid item key={product.id} lg={4} md={6} xs={12}>
                  <LessonCard
                    product={product}
                    component={RouterLink}
                    to="/app/lesson"
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3,
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </>
  );
}
