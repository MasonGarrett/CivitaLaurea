import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

const LessonCard = ({ lesson, ...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
    {...rest}
  >
    <CardContent>
      <Typography align="center" color="textPrimary" gutterBottom variant="h4">
        {/* TODO setup for database */}
        {/* {lesson.courseTitle} */}
        Lesson One
      </Typography>
      <Typography align="center" color="textPrimary" variant="body1">
        {/* {lesson.courseDescription} */}
        Programming
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
  </Card>
);

LessonCard.propTypes = {
  lesson: PropTypes.object.isRequired,
};

export default LessonCard;
