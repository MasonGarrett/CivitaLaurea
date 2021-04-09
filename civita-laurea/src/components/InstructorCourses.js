import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// eslint-disable-next-line import/no-unresolved
import GridList from '@material-ui/core/GridList';
// eslint-disable-next-line import/no-unresolved
import GridListTile from '@material-ui/core/GridListTile';
// eslint-disable-next-line import/no-unresolved
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
// // eslint-disable-next-line import/no-unresolved
// import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 700,
    height: 600,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

const tileData = [
  {
    img:
      'https://www.thegreatcoursesplus.com/media/catalog/product/1/0/1014.jpg',
    title: 'Fundamentals of Math',
    author: 'Joe Bob',
  },
  {
    img:
      'https://www.gqrgm.com/wp-content/uploads/2019/09/2.-Blog-Banner-Template.jpg',
    title: 'Programming Basics',
    author: 'Joe Bob',
  },
  {
    img:
      'https://blogs.biomedcentral.com/on-biology/wp-content/uploads/sites/5/2017/12/DNA.png',
    title: 'Biology 101',
    author: 'Joe Bob',
  },
  {
    img:
      'https://www.thegreatcoursesplus.com/media/catalog/product/1/0/1014.jpg',
    title: 'Fundamentals of Math',
    author: 'Joe Bob',
  },
  {
    img:
      'https://www.gqrgm.com/wp-content/uploads/2019/09/2.-Blog-Banner-Template.jpg',
    title: 'Programming Basics',
    author: 'Joe Bob',
  },
];

export default function TitlebarGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          {/* <ListSubheader component="div">December</ListSubheader> */}
        </GridListTile>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.title}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
