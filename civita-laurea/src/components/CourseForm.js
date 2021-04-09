import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import { Box, Button, Card, Divider, TextField } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

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
  const [courseTitle, setCourseTitle] = React.useState('');

  const handleCourseTitleChange = (event) => {
    setCourseTitle(event.target.value);
  };

  const [courseDescription, setCourseDescription] = React.useState('');

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
    // TODO: figure how to pass props or create a props variable
    // <Card {...props}>
    <Card>
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Box sx={{ m: 5 }}>
            <form
              className={classes.root}
              onSubmit={(e) => {
                e.preventDefault();
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
                value={courseTitle}
                onChange={handleCourseTitleChange}
                variant="outlined"
              />
              <TextField
                required
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={courseDescription}
                onChange={handleCourseDescriptionChange}
                variant="outlined"
              />
              <TextField
                required
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
                required
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
