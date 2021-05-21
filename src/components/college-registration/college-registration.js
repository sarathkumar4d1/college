import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




export default function Collegelogin(){

    const [values, setvalues] = React.useState({
        details: {
            name: "",
            email:"",
            URL:"",
            city:"",
            country:"",
            phone_number:"",
            pin:"",
            prospectus_link:"",
            state:"",
            password:"",
        },
    });
    
     const collegeDetails =(e) => {
        let collegeDetails = values.details;
        collegeDetails [e.target.name] = e.target.value;
        setvalues({details: collegeDetails});
     };
    //  const submitData = () => {
    //      console.log(values.details);
    //  }
     const submitData = () => {
        fetch("https://rahulmabbu.pythonanywhere.com/api/college_registration/",{
            method: "POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(values.details),
        })
             .then((response)=> response.json())
             .then(response=>{
             console.log(response);
        })
            .catch(error=>{
             console.log(error);
        })
    };

    return(
        <div>
            <Container>
            <div>
               <h3><i><b>College Registration</b></i></h3>
            </div>
            <div>
                <form>
                    <Row>
                        <Col sm={6}> <div className="inputs"><TextField label="College Name" value={values.name} name="name" onChange={collegeDetails} variant="outlined"/></div></Col>
                        <Col sm={6}> <div className="inputs"><TextField label="URL" value={values.URL} name="URL" onChange={collegeDetails} variant="outlined"/></div></Col>
                        <Col sm={6}> <div className="inputs"><TextField label="City" value={values.city} name="city" onChange={collegeDetails} variant="outlined"/></div></Col>
                        <Col sm={6}> <div className="inputs"><TextField label="Country" value={values.country} name="country" onChange={collegeDetails} variant="outlined"/></div></Col>
                        <Col sm={6}> <div className="inputs"><TextField label="Phone Number" value={values.phone_number} name="phone_number" onChange={collegeDetails} variant="outlined"/></div></Col>
                        <Col sm={6}> <div className="inputs"><TextField label="Pin" value={values.pin} name="pin" onChange={collegeDetails} variant="outlined"/></div></Col>
                        <Col sm={6}> <div className="inputs"><TextField label="Prospectus_link" value={values.prospectus_link} name="prospectus_link" onChange={collegeDetails} variant="outlined"/></div></Col>
                        <Col sm={6}> <div className="inputs"><TextField label="State" value={values.state} name="state" onChange={collegeDetails} variant="outlined"/></div></Col>
                        <Col sm={6}> <div className="inputs"><TextField label="Password" value={values.password} name="password" onChange={collegeDetails} variant="outlined" type="password"/></div></Col>
                        <Col sm={6}><div className="inputs"><TextField label="College Email" value={values.email} name="email" onChange={collegeDetails} variant="outlined"/></div></Col>
                        <Col sm={6}> <Button onClick={submitData} variant="contained" color="primary">Submit</Button></Col>
                  </Row>
                </form>
            </div>
            </Container>
        </div>
    )
}