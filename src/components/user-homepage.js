import React from 'react';
import { Component } from 'react';
import './style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UsercourseList from './user-courses-list';
import Editcourse from "./dialog";
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export default class Home extends Component{
  constructor(props){
      super(props);
      this.state = {
          courses: [],
          clickedCourse:"",
          college : localStorage.getItem("CollegeName")

      }
}
componentDidMount(){
    fetch("https://rahulmabbu.pythonanywhere.com/api/courses_colleges/Intermediate/")
    .then((response)=> response.json())
    .then((response)=>{
        console.log(response);
        this.setState({
            courses: response,
            clickedCourse: response[0].uid,
        });
    })
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
}
clearlocalStorage=(e)=>{
    localStorage.clear();
    window.location.href="/"
}
    render(){
        return(
            <div >
                 <div className="nav_user">User Logged In  
                    <span className="logoutButtonuser" >
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
                     <div className="des">
                        <h3 ><i>DESCRIPTION</i></h3>
                        {this.state.college}
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
                                        <ol type="1">
                                           <h3>Subjects</h3>
                                           {description.subjects.map((oppor) => (
                                           <li>{oppor}</li>
                                           ))}
                                        </ol>

                                    </div>
                               </div>
                         </div>
                               <div>
                                    <div className="pencil">
                                        <Editcourse {...description} />
                                    </div>
                              </div>
                     </div>
                               </Col>
                               <Col sm={4}>
                            <div>
                                <div className="college">
                                <h3 ><i>COLLEGES</i></h3>
                                {  description.colleges.length>0 ?
                                    description.colleges.map((college) => (
                                    <div className="hh">
                                        {college.name}
                                        <br/>
                                        {college.URL}
                                        <br/>
                                        {college.email}
                                        <br/>
                                        {college.phone_number}
                                        <br/>
                                        {college.country}
                                        <br/>
                                        {college.pin}
                                        <br/>
                                        {college.prospectus_link}
                                        <br/>
                                        {college.state}
                                        
                                    </div>
                                    
                                    
                                )):"Comming Soon"
                                }
                                
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
             
            </div>
        );
    }
}



