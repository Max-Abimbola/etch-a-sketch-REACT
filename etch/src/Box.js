import React,{Component} from 'react'
import './Box.css'


class Box extends Component{
    render(){

        return(
            <div 
                id={this.props.id}
                className='box'
                onMouseEnter={this.props.handleMouseOver}
                onMouseDown={this.props.handleMouseDown}
                onMouseUp={this.props.handleOnMouseUp}
                onMouseOver={this.props.handleMouseOver}
                style={{pointerEvents:'auto', backgroundColor:this.props.colour}}
            >
            </div>
        )
    }
}

export default Box