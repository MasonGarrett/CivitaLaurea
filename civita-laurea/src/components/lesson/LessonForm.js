/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Box, Button, Card, Divider, TextField } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { selectUser } from '../../features/userSlice';

// Styles.
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

// The form that creates a lesson for the designated course.
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

  const { id } = useParams();

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
                const lesson = uuid();
                // TODO setup up add lessons to database also uploading pdf
                db.collection('lessons').doc(lesson).set({
                  lessonTitle: lessonTitleValue,
                  lessonDescription: lessonDescriptionValue,
                });

                db.collection('users')
                  .doc(user.uid)
                  .get()
                  .then((userDoc) => {
                    const course = userDoc.data().courses[id];
                    db.collection('courses')
                      .doc(course)
                      .get()
                      .then((courseDoc) => {
                        const courseLessons = courseDoc.data().lessons;
                        const newCourseLessons = [...courseLessons];
                        newCourseLessons.push(lesson);
                        console.log(courseDoc);
                        db.collection('courses').doc(courseDoc.id).set(
                          {
                            lessons: newCourseLessons,
                          },
                          { merge: true }
                        );
                      });
                  })
                  .then(() => {
                    navigate(`/app/course/${id}`);
                    alert('Lesson Added!');
                  });
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
                required
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
