import React, { Component } from 'react';
import './style.css';


export default class UsercourseList extends Component{
    constructor(props){
        super(props);
        this.state={
            course: this.props.clicked,
        };
    }
    clickCourse = (course) => {
        this.setState({
            course: course.course,
        });
        this.props.callBack(course)
    };
    render(){
        return(
            <div>
                <div className="cl">
                <h3 className="hea">Courses</h3>
                <div>
                    {this.props.course.map((course) => (
                        <div key={course.id} onClick={() => this.clickCourse(course)}
                          className={`${
                            this.props.clicked === course.uid 
                            ? "course_list_item" 
                            : "course_list_item_not_selected"
                          }`}
                        >
                          {course.course}
                        </div>
                    ))}
                </div>
                </div>
            </div>
        );
    }
}