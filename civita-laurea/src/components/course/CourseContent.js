import React from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Pagination,
} from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';
import products from '../../__mocks__/products';
import LessonCard from '../lesson/LessonCard';

export default function CourseContent() {
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
