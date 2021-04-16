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
import CourseCard from '../course/CourseCard';
import { db } from '../../firebase';
import { selectUser } from '../../features/userSlice';

function AvailableCourses() {
  const user = useSelector(selectUser);
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const response = db.collection('courses');
    const data = await response.get();
    data.docs.forEach((course) => {
      setCourses((prev) => [...prev, ...courses, course.data()]);
    });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // const addCourse = (value) => {
  //   console.log(value);
  // };

  return (
    <Card>
      <CardHeader title="Available Courses" />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Container maxWidth={false}>
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {courses.map((course) => (
                  <Grid item key={course.id} lg={4} md={6} xs={12}>
                    <CourseCard
                      course={course}
                      component={RouterLink}
                      to="/app/course"
                      // onClick={addCourse(course.id)}
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

export default AvailableCourses;
