/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Box, Button, Card, Divider, TextField } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { selectUser } from '../../features/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50%',
    },
  },
  input: {
    display: 'none',
  },
}));

export default function LessonForm() {
  const classes = useStyles();
  const [lessonTitleValue, setLessonTitle] = React.useState('');

  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const handleCourseTitleChange = (event) => {
    setLessonTitle(event.target.value);
  };

  const [lessonDescriptionValue, setLessonDescription] = React.useState('');

  const handleCourseDescriptionChange = (event) => {
    setLessonDescription(event.target.value);
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
                  courseTitle: lessonTitleValue,
                  courseDescription: lessonDescriptionValue,
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
                navigate('/app/course');
                alert('Lesson Created!');
              }}
            >
              <h2>Create Lesson</h2>
              <br />
              <TextField
                required
                id="outlined-multiline-flexible-required"
                label="Lesson Title"
                multiline
                rowsMax={4}
                value={lessonTitleValue}
                onChange={handleCourseTitleChange}
                variant="outlined"
              />
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={lessonDescriptionValue}
                onChange={handleCourseDescriptionChange}
                variant="outlined"
              />
              <div className={classes.root}>
                <label htmlFor="upload">
                  <Button variant="contained" color="primary" component="span">
                    Upload PDF
                  </Button>
                </label>
                <input
                  accept="application/pdf"
                  className={classes.input}
                  id="upload"
                  multiple
                  type="file"
                />
              </div>
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
                  Create Lesson
                </Button>
              </div>
            </form>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}
