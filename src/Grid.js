import React,{Component} from 'react';
import Box from './Box';
import './Grid.css';
import ChromePicker from './ColourWheel';

class Grid extends Component{
    static defaultProps = {
        size: 10
    }
    constructor(props){
        super(props);
        this.state = {
            gridArray : [[0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0]],
            brushColour : '#000000',
            mouseDown: false,
            size: 10,
            displayColourPicker: false
            
        }
        this.changeColour = this.changeColour.bind(this)
        this.setPenColour = this.setPenColour.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleOnMouseUp = this.handleOnMouseUp.bind(this)
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.changeGridSize = this.changeGridSize.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.clearScreen = this.clearScreen.bind(this)
        this.handClickColorButtton = this.handClickColorButtton.bind(this)
    }

    
    changeColour(boxId){

        
        
        const box = document.getElementById(boxId)
        box.style.backgroundColor = this.state.brushColour 
    }
    handleMouseDown(e){
        e.preventDefault()
        
        this.setState({mouseDown:true})
        this.changeColour(e.target.id)

        
    }

    handClickColorButtton(){
        this.setState({displayColourPicker: !this.state.displayColourPicker})
    }

    handleOnMouseUp(e){
        
        this.setState({mouseDown:false})
    }

    handleMouseOver(e){
        if(this.state.mouseDown === true){
            this.changeColour(e.target.id)

        }
    }

    changeGridSize(size){
        this.setState({size:size})
    }

    generateGridArray(size){
        const grid = []
        for(let i =0; i<size;i++){
            let row = []
            for(let j=0; j<size;j++){
                row.push(0)
            }
            grid.push(row)
        }
        return grid
    }

    setPenColour(colour){
        this.setState({brushColour:colour})

    }

    handleClick(evt){
        this.clearScreen()
        const newGrid = this.generateGridArray(evt.target.id)
        this.setState({gridArray: newGrid, size:evt.target.id})
    }

    clearScreen(){
        const boxes = document.querySelectorAll('.box')
        boxes.forEach((x)=>{
            x.style='#FFFFFF'
        })

    }


    render(){
        const cover={
            position: 'fixed',
            top: '0px',
            right: '1000px',
            bottom: '0px',
            left: '100px'
        }

        const gridRender = this.state.gridArray.map((boxRow,row)=>boxRow.map((box,col)=>(
            <Box
                key={`${row}-${col}`}
                id={`${row}-${col}`}
                className='box'
                changeColour={this.changeColour}
                handleMouseDown={this.handleMouseDown}
                handleMouseOver={this.handleMouseOver}
                handleOnMouseUp={this.handleOnMouseUp}
            />
        )))
        const gridTemplateStyles = {
            display:'grid',
            gridTemplateRows:`repeat(${this.state.size},1fr)`,
            gridTemplateColumns:`repeat(${this.state.size},1fr)`
            
        }
        return(
            <div className='container'>
                

                <div className='settings'>
                        <button style={{backgroundColor:this.state.brushColour}} className='colour-picker-button' onClick={this.handClickColorButtton}></button>
                        {this.state.displayColourPicker ? 
                            <div className='colourWheel-container' style={cover}>
                                <ChromePicker
                                className='colourWheel'
                                setPenColour={this.setPenColour}/>
                                
                            </div> :null}
                        <div className='size-buttons-container'>
                            <input name='2-button' type='button' value='2X2' id='2'  onClick={this.handleClick}/>
                            <input name='5-button' type='button' value='5X5' id='5'  onClick={this.handleClick}/>
                            <input name='10-button' type='button' value='10X10' id='10'  onClick={this.handleClick}/>
                            <input name='20-button' type='button' value='20X20' id='20'  onClick={this.handleClick}/>
                        </div>
                        <div id='cls-button-container'>
                            <button id='cls-button' onClick={this.clearScreen} >CLEAR</button>
                        </div>
                </div>
               
                <div className='gridContainer' style={gridTemplateStyles} >
            
                    {gridRender}
                </div>

            </div>
        )
    }
}

export default Grid