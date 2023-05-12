import React,{Component} from 'react'
import './ColourWheel.css'
import { ChromePicker } from 'react-color';

class ColourWheel extends Component{
    constructor(props){
        super(props);
        this.state = {
            color: ''
        }
    this.handleChange = this.handleChange.bind(this)
    }

    handleChange(colour){
        const newColour = colour.hex;
        this.setState({brushColour:newColour});
        this.props.setPenColour(newColour)
    }
    render(){
        return(
            <div>
                <ChromePicker
                    color={this.state.brushColour}
                    onChange={this.handleChange}

                />
            </div>
/*             <form> 
                <label htmlFor='colorWheel'>Select Colour</label>
                <input
                 type='color'
                 id='colorWheel'
                 name='color'
                 value='#000000'
                 onChange={this.handleChange}
                 ></input>
            </form> */

        )
    }
}

export default ColourWheel
