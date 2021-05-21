import React from 'react';
import { Component } from 'react';
import './style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UsercourseList from './user-courses-list';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


export default class Home extends Component{
  constructor(props){
      super(props);
      this.state = {
          courses: [],
          clickedCourse:"",
          college : "",
          collegeEmail : localStorage.getItem("collegeEmail"),
          token : localStorage.getItem("Token"),
          CollegeName : localStorage.getItem("CollegeName"),

      };
}
componentDidMount(){
    if(this.state.collegeEmail === null){
        window.location.href="/college"
    }
    else
    {
    fetch(`https://rahulmabbu.pythonanywhere.com/api/college_courses/?email=${this.state.collegeEmail}&level=Intermediate`)
    .then((response)=> response.json())
    .then((response)=>{
        if(response.error === undefined){
            console.log(response.courses);
        this.setState({
            courses: response.courses,
            college: response.college,
            clickedCourse: response.courses[0].uid,
        });
            
        }else{
            window.location.href="/college"
    }
    })
    .catch((error) => {
        console.log(error);
    })
}
}
clickCourse = (courseClicked) => {
    this.setState({
        clickedCourse: courseClicked.course,
    });
};
callBack = (course) =>{
    this.setState({
        clickedCourse: course.uid,
    });
};
clearlocalStorage=(e)=>{
    localStorage.clear();
    window.location.href="/"
};
checkboxChange=(description)=>{
    let checkBoxes = this.state.courses.map(check => {
        if(check.uid === description.uid){
            description.checkbox = ! description.checkbox;
        }
        return check;
    });
    this.setState({
        courses:checkBoxes,
    });
};
submitCourse=()=>{
    let submitCourses = this.state.courses.map((checked) => {
        return{ uid: checked.uid, checkbox: checked.checkbox};
    });
    fetch(`https://rahulmabbu.pythonanywhere.com/api/college_courses/?email=${this.state.collegeEmail}&level=Twelveth`,
    {
        method:"POST",
        headers:{
            'content-type': 'application/json',
            Authorization: `Token ${this.state.token}`,
          },
        body:JSON.stringify({
        college: this.state.CollegeName,
        courses: submitCourses,
         }),
    })

    .then((response)=> response.json())
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    })
};
    render(){
        console.log(this.state.courses);
        return(
            
            <div >
                <div className="head_college">College Logged In
                <span className="logoutButton" >
                      <Button onClick={this.clearlocalStorage} variant="outlined" color="primary" >
                         <ExitToAppIcon/>
                     </Button>
               </span>
                </div>
             <Container>
               <Row>
                   <Col sm={4}>
                       <UsercourseList 
                        callBack={this.callBack}
                        clicked={this.state.clickedCourse}
                        course={this.state.courses}
                       />
                    </Col>
                    <Col sm={8}>
                     {this.state.courses.map((description) => 
                            this.state.clickedCourse === description.uid ? (
                        <Row>
                        
                            <Col sm={8}>
                                 <div className="descr">                     
                                     <h3 ><i>DESCRIPTION</i></h3>
                        
                                         {this.state.college}
                                          <span><FormControlLabel
                                            control={
                                                <Checkbox
                                                   checked={description.checkbox}
                                                  onChange={(e)=>this.checkboxChange(description)}
                                                  name="checkedB"
                                                  color="primary"
                                               />
                                                }
                                              label="Primary"
                                             /></span>
                                        <div className="hh">
                          
                                            <div>
                                               <div key={description.uid}>{description.description}</div>
                                                  <div className="opp_sub">
                                                     <ol type="1">
                                                        <h3>Opportunities</h3>
                                                         {description.opportunities.map((oppor) => (
                                                         <li>{oppor}</li>
                                                         ))}
                                                    </ol>
                                                  </div>
                                           </div>
                                        </div>
                               
                                    </div>
                          </Col>                              
                     </Row>
                       ) : (
                        ""
                      )
                     )}
                </Col>
               </Row>
             </Container>
                 
                <div className="submitcourses">
                   <Button onClick={this.submitCourse} variant="outlined" color="primary" >
                       Submit Courses
                   </Button>
                 </div>
          </div>
        );
    }
}



