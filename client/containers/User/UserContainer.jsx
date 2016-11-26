import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';
import * as authActions from '../../actions/authActions';
import React, {PropTypes} from 'react';
import NavBar from '../../components/Appbar/AppBar';

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  componentDidMount() {
    this.props.userActions.fetchAllUsers();
  }

  handleLogOut() {
    this.props.authActions.logoutUser();
    this.context.router.push('/');
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleSelect(user) {
    this.props.userActions.fetchUserDocuments(user).then(() =>
      this.context.router.push('/profile')
    );
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }

  render() {
    return (
      <div>
      <NavBar openDrawer={this.handleOpen}
              auth={this.props.auth.getIn(['user', 'user']).toJS()}
              users={this.props.users.get('users').toJS()}
              isOpen={this.state}
              onClose={this.handleClose}
              onLogOut={this.handleLogOut}
              onSelectUser={this.handleSelect}
              />


      </div>
    );
  }
}

UserContainer.propTypes = {
  userActions: PropTypes.object.isRequired,
  users: PropTypes.object,
  auth: PropTypes.object,
  authActions: PropTypes.object

};

UserContainer.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    users: state.user,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);