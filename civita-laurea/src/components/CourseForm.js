import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Box, Button, Card, Divider, TextField } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { db } from '../firebase';
import { selectUser } from '../features/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50%',
    },
  },
}));

export default function CourseForm() {
  const classes = useStyles();
  const [courseTitleValue, setCourseTitle] = React.useState('');

  const user = useSelector(selectUser);

  const handleCourseTitleChange = (event) => {
    setCourseTitle(event.target.value);
  };

  const [courseDescriptionValue, setCourseDescription] = React.useState('');

  const handleCourseDescriptionChange = (event) => {
    setCourseDescription(event.target.value);
  };

  const [courseStartDate, setCourseStartDate] = React.useState('');

  const handleCourseStartDate = (event) => {
    setCourseStartDate(event.target.value);
  };

  const [courseEndDate, setCourseEndDate] = React.useState('');

  const handleCourseEndDate = (event) => {
    setCourseEndDate(event.target.value);
  };

  return (
    <Card>
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Box sx={{ m: 5 }}>
            <form
              className={classes.root}
              onSubmit={(e) => {
                e.preventDefault();
                const course = uuid();
                db.collection('courses').doc(course).set({
                  coureTitle: courseTitleValue,
                  courseDescription: courseDescriptionValue,
                  courseStart: courseStartDate,
                  courseEnd: courseEndDate,
                });

                db.collection('users')
                  .doc(user.uid)
                  .get()
                  .then((doc) => {
                    const userCourses = doc.data().courses;
                    const newUserCourses = [...userCourses];
                    newUserCourses.push(course);
                    db.collection('users').doc(user.uid).set(
                      {
                        courses: newUserCourses,
                      },
                      { merge: true }
                    );
                  });
                alert('Course Created!');
              }}
            >
              <h2>Create Course</h2>
              <br />
              <TextField
                required
                id="outlined-multiline-flexible-required"
                label="Course Title"
                multiline
                rowsMax={4}
                value={courseTitleValue}
                onChange={handleCourseTitleChange}
                variant="outlined"
              />
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={courseDescriptionValue}
                onChange={handleCourseDescriptionChange}
                variant="outlined"
              />
              <TextField
                id="date"
                label="Course Start Date"
                type="date"
                value={courseStartDate}
                onChange={handleCourseStartDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="date"
                label="Course End Date"
                type="date"
                value={courseEndDate}
                onChange={handleCourseEndDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              <br />
              <div>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.margin}
                  type="submit"
                >
                  Create Course
                </Button>
              </div>
            </form>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}
