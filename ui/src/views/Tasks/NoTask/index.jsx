import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import LinkIcon from 'mdi-react/LinkIcon';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dashboard from '../../../components/Dashboard';
import HelpView from '../../../components/HelpView';
import Search from '../../../components/Search';
import db from '../../../utils/db';

@hot(module)
@withStyles(theme => ({
  infoText: {
    marginBottom: theme.spacing.unit,
  },
}))
export default class NoTask extends Component {
  state = {
    recentTasks: null,
  };

  async componentDidMount() {
    const recentTasks = await db.taskIdsHistory
      .limit(5)
      .reverse()
      .toArray();

    this.setState({ recentTasks });
  }

  handleTaskSearchSubmit = taskId => {
    this.props.history.push(`/tasks/${taskId}`);
  };

  render() {
    const { description, classes } = this.props;
    const { recentTasks } = this.state;

    return (
      <Dashboard
        title="View Tasks"
        helpView={<HelpView description={description} />}
        search={<Search onSubmit={this.handleTaskSearchSubmit} />}>
        <Typography className={classes.infoText}>
          Enter a task ID in the search box
        </Typography>
        {recentTasks && Boolean(recentTasks.length) && (
          <List
            dense
            subheader={
              <ListSubheader component="div">Recent Tasks</ListSubheader>
            }>
            {recentTasks.map(({ taskId }) => (
              <ListItem
                button
                className={classes.listItemButton}
                component={Link}
                to={`/tasks/${taskId}`}
                key={taskId}>
                <ListItemText
                  disableTypography
                  primary={<Typography>{taskId}</Typography>}
                />
                <LinkIcon />
              </ListItem>
            ))}
          </List>
        )}
      </Dashboard>
    );
  }
}
