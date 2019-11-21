import React, { Component } from 'react'
import './calculator.css';


export default class Numbers extends Component {
    constructor(){
        super();
        this.state = {
            result:"",
            array1:[],
            checker:0,
            screen:""
        }
    }
    deneme = value =>{
        const stack=[];
        const value2=[14,21,'+'];
        const expArray = value;
        for(let i=0;i<expArray.length;i++){
            switch(expArray[i]){
                case "+":
                    stack.push(stack.pop()+stack.pop());
                    break;
                case "-":
                    stack.push(-1*(stack.pop()-stack.pop()));
                    break;
                case "*":
                    stack.push(stack.pop()*stack.pop());
                    break;
                case "/":
                    stack.push(1/(stack.pop()/stack.pop()));
                    break;
                default:
                    stack.push(parseInt(expArray[i]));
            }
        }
        //console.log(stack.pop());
        this.state.screen=stack.pop();
        
        //console.log(this.state.result);
        this.setState(({
            result:this.state.result,
            screen:this.state.screen,
            array1:[]
        }))
        //this.resetResult();
    }
    addToResult = value =>{
        this.state.screen+=value;
        if(value==='-'|| value==='+' || value==='*' || value==='/' || value==='(' || value===')' || value==='='){
            if(this.state.result=="" && (value==='-'|| value==='+' || value==='*' || value==='/' ||value==='(' || value===')') ){
                
            }else{
                this.state.array1.push(this.state.result);
            }
            
            if(value=='='){
                this.resultFunc(this.state.array1);
            }else{
                this.state.array1.push(value);
            }   
           
            this.state.result="";
            this.state.checker=0;
        }else{
            this.state.checker=1;
            if(this.state.checker==1){
                this.state.result+=value;
            }else{
                
            } 
        }               
        console.log(this.state.array1);
        this.setState(({
            result:this.state.result,
            array1:this.state.array1,
            checker:this.state.checker
        }))
    }
    resetResult = () =>{
        this.setState(({
            result:"",
            screen:"",
            array1:[]
        }))
    }
    preced = charc =>{
        if(charc==='+' || charc ==='-'){
            return 1;
        }else if(charc === '*' || charc === '/') {
            return 2;            //Precedence of * or / is 2
        }else {
            return 0;
        }
    }
    resultFunc = value =>{
        console.log(this.state.result);
        const stack1=[];
        let resultStr="";
        const stack2=[];
        stack1.push('#');
        let top = 0;
        for(let i=0;i<value.length;i++){
            if( value[i]!== '+' && value[i]!=="*" && value[i]!=="-" && value[i]!=="/" && value[i]!=="(" && value[i]!==")" ){ 
                resultStr+=value[i];
                stack2.push(value[i]);
            }else if(value[i]==='('){
                stack1.push('(');
                top++;
            }else if(value[i]===')'){
                while(stack1[top] !== '#' && stack1[top] !== '(') {
                    resultStr += stack1[top]; //store and pop until ( has found
                    stack2.push(stack1[top]);
                    stack1.pop();
                    top--;                    
                 }
                 stack1.pop();
                 top--;
            }else{
                if(this.preced(value[i]>this.preced(stack1[top]))){
                    stack1.push(value[i]);
                    top++;
                }else{
                    while(stack1[top] !== '#' && this.preced(value[i]) <= this.preced(stack1[top])) {
                        resultStr += stack1[top];       //store and pop until higher precedence is found
                        stack2.push(stack1[top]);
                        stack1.pop();
                        top--;
                     }
                     stack1.push(value[i]);
                     top++;
                }
            }            
        }
        while(stack1[top] !== '#') {
            resultStr += stack1[top];        //store and pop until stack is not empty.
            stack2.push(stack1[top]);
            stack1.pop();
            top--;
         }
        console.log(resultStr);
        console.log(stack2);
        this.deneme(stack2);        
    }
  render() {
    return (
      <div>
        <div className="calculator">
        <h1>You have to reset calculator after every operation!</h1>
            <div className="inputT">
                <h1  className="inputT1">Screen: {this.state.screen}</h1>
            </div>
            <button name="1" className="buttonN" onClick={e=>this.addToResult(e.target.name)}>1</button>
            <button name="2" className="buttonN" onClick={e=>this.addToResult(e.target.name)}>2</button>
            <button name="3" className="buttonN" onClick={e=>this.addToResult(e.target.name)}>3</button>
            <button name="+" className="buttonN" onClick={e=>this.addToResult(e.target.name)}>+</button>
            <br/>
            <button name="4" className="buttonN" onClick={e=>this.addToResult(e.target.name)}>4</button>
            <button name="5" className="buttonN" onClick={e=>this.addToResult(e.target.name)}>5</button>
            <button name="6" className="buttonN" onClick={e=>this.addToResult(e.target.name)}>6</button>
            <button name="-" className="buttonN" onClick={e=>this.addToResult(e.target.name)}>-</button>
            <button name="r" className="buttonN" onClick={e=>this.resetResult()}>CE</button>
            <br/>
            <button name="7" className="buttonN" onClick={e=>this.addToResult(e.target.name)}>7</button>
            <button name="8" className="buttonN" onClick={e=>this.addToResult(e.target.name)}>8</button>
            <button name="9" className="buttonN"  onClick={e=>this.addToResult(e.target.name)}>9</button>
            <button name="*" className="buttonN" onClick={e=>this.addToResult(e.target.name)}>*</button>
            <button name="=" className="buttonN" onClick={e=>this.addToResult(e.target.name)}>=</button>
            <br/>
            <button name="0" className="buttonN" onClick={e=>this.addToResult(e.target.name)}>0</button>
            <button name="(" className="buttonN" onClick={e=>this.addToResult(e.target.name)}>(</button>
            <button name=")" className="buttonN" onClick={e=>this.addToResult(e.target.name)}>)</button>
            <button name="/" className="buttonN"  onClick={e=>this.addToResult(e.target.name)}>/</button>
            <br/>
        </div>
        
      </div>
    )
  }
}

//(1+((2+3)*(4*5)))