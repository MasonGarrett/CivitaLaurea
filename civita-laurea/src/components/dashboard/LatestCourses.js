import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Container,
  Grid,
  Button,
  Card,
  CardHeader,
  Divider,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../product/ProductCard';
import products from '../../__mocks__/products';
import { db } from '../../firebase';
import { selectUser } from '../../features/userSlice';

function LatestOrders() {
  const user = useSelector(selectUser);
  const [courses, setCourses] = useState([]);

  const fetchUser = async () => {
    const response = db.collection('users');
    const data = await response.get();
    data.docs.forEach((userr) => {
      if (userr.id === user.uid) {
        const userCourses = userr.data().courses;
        for (let i = 0; i < userCourses.length; i += 1) {
          db.collection('courses')
            .doc(userCourses[i])
            .get()
            .then((docCourse) => {
              setCourses((prev) => [...prev, ...courses, docCourse.data()]);
            });
        }
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(courses[0]);

  return (
    <Card>
      <CardHeader title="My Courses" />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Container maxWidth={false}>
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {courses.map((course, index) => (
                  <Grid item key={index} lg={4} md={6} xs={12}>
                    <ProductCard
                      product={course}
                      component={RouterLink}
                      to={`/app/course/${index}`}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

export default LatestOrders;
