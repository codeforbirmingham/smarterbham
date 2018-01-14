import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
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
    width: '120px',
    marginBottom: '5px',
  },
  link: {
    display: 'block',
    marginTop: '10px',
    textDecoration: 'none',
  },
  icon: {
    marginRight: '5px',
  },
  span: {
    borderBottom: '1px dotted black',
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
      <Typography type="subheading">
        Nothing exists at <span className={classes.span}>{window.location.href}</span>
      </Typography>
      <a href="/" className={classes.link}><i className={`fa fa-hand-o-left ${classes.icon}`} /> Return home</a>
    </Grid>
  </Grid>
);

NoMatchView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(NoMatchView);
