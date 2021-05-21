import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CreateIcon from '@material-ui/icons/Create';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';



export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [course, setcourse] = React.useState("");
  const [token, settoken ] = React.useState(localStorage.getItem("Token"))

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submitData=()=>{
    console.log(course);
    fetch("https://rahulmabbu.pythonanywhere.com/api/data_corrections/",{
      method: "POST",
      headers:{
        'content-type': 'application/json',
        Authorization : `Token ${token}`,
      },
      body:JSON.stringify({correction:course, course:props.course, uid: props.uid }),
    })
    .then((response)=> response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const courseChange=(e)=>{
    setcourse(e.target.value);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <CreateIcon/>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Course Modification"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Course: {props.course}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
           UID: {props.uid}
          </DialogContentText>
        </DialogContent>
        <form >
          <TextField name="course" value={course} onChange={courseChange} label="Course Details" />
        </form>
        <DialogActions>
          <Button onClick={submitData} color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
