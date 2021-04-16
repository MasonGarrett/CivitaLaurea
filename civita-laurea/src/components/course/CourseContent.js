import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Pagination,
} from '@material-ui/core';

import { Link as RouterLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import courses from '../../__mocks__/courses';
import LessonCard from '../lesson/LessonCard';
import { db } from '../../firebase';
import { selectUser } from '../../features/userSlice';

// Component that handles the course content element of a course
export default function CourseContent() {
  const user = useSelector(selectUser);
  const { id } = useParams();
  const [course, setCourse] = useState({});

  const fetchUser = async () => {
    const response = db.collection('users');
    const data = await response.get();
    data.docs.forEach((dbUser) => {
      if (dbUser.id === user.uid) {
        const userCourses = dbUser.data().courses;
        db.collection('courses')
          .doc(userCourses[id])
          .get()
          .then((docCourse) => {
            setCourse(docCourse.data());
          });
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);
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
            to={`/app/create-lesson/${id}`}
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
              {courses.map((product) => (
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
