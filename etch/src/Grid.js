import React,{Component} from 'react';
import Box from './Box';
import './Grid.css';
import ColourWheel from './ColourWheel';

const size = 10

class Grid extends Component{
    constructor(props){
        super(props);
        this.state = {
            gridArray : this.generateGridArray(size),
            brushColour : '#000000',
            mouseDown: false,
            
        }
        this.changeColour = this.changeColour.bind(this)
        this.setPenColour = this.setPenColour.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleOnMouseUp = this.handleOnMouseUp.bind(this)
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.changeGridSize = this.changeGridSize.bind(this)
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


    render(){

        const gridRender = this.state.gridArray.map((boxRow,row)=>boxRow.map((box,col)=>(
            <Box
                key={`${row}-${col}`}
                id={`${row}-${col}`}
                changeColour={this.changeColour}
                handleMouseDown={this.handleMouseDown}
                handleMouseOver={this.handleMouseOver}
                handleOnMouseUp={this.handleOnMouseUp}
            />
        )))
        const gridTemplateStyles = {
            display:'grid',
            gridTemplateRows:`repeat(${size},1fr)`,
            gridTemplateColumns:`repeat(${size},1fr)`
            
        }
        return(
            <div className='container'>
                <div className='controls'>
                    <div className='colourWheel'>
                        <ColourWheel
                        setPenColour={this.setPenColour}/>
                    </div>
                    <div id='grid-size-boxes-container'>
                        <button>2x2</button>
                        <button>5x5</button>
                        <button>10x10</button>
                        <button>20x20</button>
                        <button>50x50</button>
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