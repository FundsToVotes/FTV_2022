import Plotly from 'plotly.js'
import React, { Component } from "react";
import ComparisonSearch from "./ComparisonSearch"
import Top10Pie from "./Top10Pie"
import Top10Bar from "./Top10Bar"

export class ComparisonPage extends Component {
    constructor(props) {
        super(props);

        //default state
        this.state = {
          name1: "FirstName LastName1",
          cid1: "N00009825",
          name2: "FirstName LastName2",
          cid2: "N00009825"
        };
      }
//TODO: HAILEY? could you make ComparisonSearch change the state and update the vis components Top10Bar and Top10Pie??he 
//OTHER NOTES: for some reason, the graphs render on top of each other/replace each other. 
            //you'll only ever see one Top10Bar and one Top10Graph on the page


render(){

    //cid= is candidate id, which Top10 components use for API call
    //name= is candidate name
    //<ComparisonSearch/> TODO: see above TODO
    return(
    <div>
        <ComparisonSearch /> 
        
        <Top10Bar cid={this.state.cid2} name={this.state.name2}/>
        <Top10Bar cid={this.state.cid1} name={this.state.name1}/>
        
        <Top10Pie cid={this.state.cid1}  name={this.state.name1}/>
        <Top10Pie cid={this.state.cid2}  name={this.state.name2}/>


        <div>whats going on here</div>
    </div>
    )
}}

export default ComparisonPage;