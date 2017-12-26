import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  item: {
    textAlign: 'center',
  },
  image: {
    width: '150px',
  },
  text: {
    marginTop: '10px',
  },
  link: {
    display: 'block',
    marginTop: '10px',
  },
  icon: {
    marginRight: '5px',
  },
});

const NoMatchView = ({ classes }) => (
  <Grid container className={classes.root}>
    <Grid item className={classes.item}>
      <img
        src="/img/404.png"
        alt="Page Not Found"
        className={classes.image}
      />
      <h1>Uh Oh!</h1>
      <div className={classes.text}>
        Nothing exists at {window.location.href}
      </div>
      <a href="/" className={classes.link}><i className={`fa fa-hand-o-left ${classes.icon}`} /> Return home</a>
    </Grid>
  </Grid>
);

NoMatchView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(NoMatchView);
