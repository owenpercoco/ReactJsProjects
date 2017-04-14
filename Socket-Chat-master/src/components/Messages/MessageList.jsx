import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';

class MessageList extends Component{

	 
	render(){
    return(
	  <div>
			<div className="well">
				<h3><strong>M</strong>essages</h3>
					{
						this.props.messages.map((message, i) =>{
							return <Message message={message} key={i} />
						})
					}
			</div>
	  </div>
	
	)
  
  }
}

export default MessageList