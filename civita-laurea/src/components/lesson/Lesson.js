import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Divider } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AllPagesPDFViewer from '../pdf/AllPages';
import testPDF from '../pdf/test.pdf';
import { db } from '../../firebase';
import { selectUser } from '../../features/userSlice';

// Styles
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

// Handles the component for displaying a lesson/pdf
export default function Lesson() {
  const classes = useStyles();
  const { id } = useParams();

  const user = useSelector(selectUser);
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
