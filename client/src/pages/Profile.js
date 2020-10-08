import React, { Component } from 'react';

class Profile extends Component {
    state = {
        profileId: this.props.match.params.id
    }
    render(){
    
    return (
      <>
        <div>
        </div>
      </>
    )
    }
  }
  
  export default Profile;