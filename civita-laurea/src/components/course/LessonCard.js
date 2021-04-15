import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';

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
  product: PropTypes.object.isRequired,
};

export default LessonCard;
