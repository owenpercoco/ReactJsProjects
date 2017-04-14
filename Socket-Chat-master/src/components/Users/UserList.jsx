import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class UserList extends Component{
	 
	render(){
    return(
	  <div>
							<h3><strong>U</strong>sers online now({this.props.users.length})</h3>
				<ul className="list-group">
				{
					this.props.users.map((user, i) =>{
						return <li className="list-group-item" user={user} key={i}>
								{user.name}
								</li>
					})
				}
				</ul>
		
	  </div>
	
	)
  
  }
}

export default UserList