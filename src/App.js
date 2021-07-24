import './App.css';
import React, { Component } from 'react'
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import {Input} from '@material-ui/core';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, //to show the modal which is used for addChapter and editChapter
      data : [ //dummyData
        {
          class: "1",
          subjects: [
            {
              name: "Maths",
              chapters: [
                {
                  name: "Shapes and Spaces",
                  topics: ["Intro to Shapes", "Types of Shapes", "Spaces"]
                },
                {
                  name: "Numbers from one to nine",
                  topics: ["Intro to Numbers", "Use of Numbers", "Numbers from One to Nine"]
                },
                {
                  name: "Addition",
                  topics: ["Carry On From Numbers", "Concept of addition", "Single digit addition"]
                },
              ]
            },
            {
              name: "English",
              chapters: [
                {
                  name: "Clap, Clap, Clap",
                  topics: ["Topic 1", "Topic 2", "Topic 3"]
                },
                {
                  name: "One, Two",
                  topics: ["Topic 1", "Topic 2", "Topic 3"]
                },
                {
                  name: "The Little Bird",
                  topics: ["Topic 1", "Topic 2", "Topic 3"]
                },
              ]
            },
            {
              name: "Hindi",
              chapters: [
                {
                  name: "Jhoola",
                  topics: ["Topic 1", "Topic 2", "Topic 3"]
                },
                {
                  name: "Aam Ki Kahani",
                  topics: ["Topic 1", "Topic 2", "Topic 3"]
                },
                {
                  name: "Aam Ki Tokari",
                  topics: ["Topic 1", "Topic 2", "Topic 3"]
                }
              ]
            }
          ]
        },
        {
          class: "2",
          subjects:[
            {
              name: "Maths",
              chapters: [
                {
                  name: "What is Long, What is Round ?",
                  topics:["Intro to 2-D Shapes", "Intro to 3-D Shapes", "Spatial Setting"]
                },
                {
                  name: "Counting in Groups",
                  topics: ["Guess The Numbers", "Ring the Correct Answer", "Hop Till You Drop"]
                },
                {
                  name: "How much can you carry",
                  topics: ["Recap from addition", "Find Out", "Topic 3"]
                },
                
              ]
            },
            {
              name: "English",
              chapters: [
                {
                  name: "Action Song(Poem)",
                  topics: ["Topic 1", "Topic 2", "Topic 3"]
                },
                {
                  name: "Our Day",
                  topics: ["Topic 1", "Topic 2", "Topic 3"]
                },
                {
                  name: "My Family",
                  topics: ["Topic 1", "Topic 2", "Topic 3"]
                }
              ]
            },
            {
              name: "Hindi",
              chapters: [
                {
                  name: "Chapter 1",
                  topics: ["Topic 1", "Topic 2", "Topic 3"]
                },
                {
                  name: "Chapter 2",
                  topics: ["Topic 1", "Topic 2", "Topic 3"]
                },
                {
                  name: "Chapter 3",
                  topics: ["Topic 1", "Topic 2", "Topic 3"]
                }
              ]
            }
          ]
        }
      ], //end of data
      classses: [], 
      subjects: [],
      chapters: [],
      selectedClass: '', 
      selectedSubject: '',
      oldChapterName: "",  //to save the old chapter name to find and replace it when editing chapter
      modalInput: "", //input from modal
      modalHeading: "",  //case based heading of the modal addChapter or editChapter
      editStatus: false 
    }
    this.changeClass = this.changeClass.bind(this);
		this.changeSubject = this.changeSubject.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddChapter = this.handleAddChapter.bind(this);

  }
  componentDidMount() { 
    //console.log(this.state.data)
  }

  //changeClass captures the change from the class select and option
  changeClass(event) { 
		this.setState({selectedClass: event.target.value});
		this.setState({subjects : this.state.data.find(cls => cls.class === event.target.value).subjects});
	}

  //changeSubject captures the change from the subject select and option
	changeSubject(event) {
		this.setState({selectedSubject: event.target.value});
		//const subs = this.state.data.find(cls => cls.class === this.state.selectedClass).subjects;
    //console.log(this.state.subjects)
		this.setState({chapters : this.state.subjects.find(sub => sub.name === event.target.value).chapters});
	}

  //handleDelete copies the current data in the temp and then deletes the target chapter and updates the data with the temp
  handleDelete(name) {
    let data1 = this.state.data;
    data1.find(cls => cls.class === this.state.selectedClass).subjects.find(sub => sub.name === this.state.selectedSubject).chapters = this.state.data.find(cls => cls.class === this.state.selectedClass).subjects.find(sub => sub.name === this.state.selectedSubject).chapters.filter((chapter) => chapter.name !== name)
    this.setState({
      data: data1
    })
//    this.forceUpdate();
  }

  //handleChange captures the changes of the modal input
  handleChange(event){
    this.setState({
      modalInput: event.target.value
    })
  }

  //handleSave responses based on the editStatus if it is it updates the chapter if it is false it adds a new chapter
  handleSave() {
    let data1 = this.state.data;
    if(this.state.editStatus) {
      data1.find(cls => cls.class === this.state.selectedClass).subjects.find(sub => sub.name === this.state.selectedSubject).chapters.find(chapter => chapter.name === this.state.oldChapterName).name = this.state.modalInput;
      this.setState({
        data: data1,
        show: false,
        modalInput: ""
      })
    }
    else {
      data1.find(cls => cls.class === this.state.selectedClass).subjects.find(sub => sub.name === this.state.selectedSubject).chapters = [...data1.find(cls => cls.class === this.state.selectedClass).subjects.find(sub => sub.name === this.state.selectedSubject).chapters, {
        name: this.state.modalInput,
        topics: []
      }]
      this.setState({
        data: data1,
        show: false,
        modalInput: ""
      })
    }
  }
  //handleClose closes the modal
  handleClose = () => this.setState({show:false});

  //handleEdit activates when we click the edit button of a chapter
  handleEdit = (name) => {
    this.setState({
      show:true,
      oldChapterName: name,
      modalHeading: "Edit Chapter Name",
      editStatus: true
    })
  };

  //as the names says itself this function adds a new chapter to the selected class and subject
  handleAddChapter() {
    console.log("In handleAddChapter")
    if(this.state.selectedClass === '') {
      NotificationManager.warning('Class is not Selected', 'Please Select a Class', 3000);
    }
    else if(this.state.selectedSubject === '') {
      NotificationManager.warning('Subject is not Selected', 'Please Select a Subject', 3000); 
    }
    else {
      this.setState({
        show: true,
        modalHeading: "Add a New Chapter",
        editStatus: false
      })
  
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Row className="selectRow ">
            <Col>
            <div className="card">
              <div className="card-body">
                <label className="label">Class</label>
                <select placeholder="Class" className="select" value={this.state.selectedClass} onChange={this.changeClass} >
                  <option>-----------Choose Class-----------</option>
                  {this.state.data.map((e, key) => {
                    return <option className="option" key={key}>{e.class}</option>;
                  })}
                </select>
              </div>
            </div>
            </Col>
            <Col> 
            <div className="card">
              <div className="card-body">
                <label className="label">Subject</label>
                <select placeholder="Subject" className="select" value={this.state.selectedSubject} onChange={this.changeSubject}>
                  <option>----------Choose Subject----------</option>
                  {this.state.subjects.map((e, key) => {
                    return <option key={key}>{e.name}</option>;
                  })}
                </select>
              </div>
            </div>
            </Col>
          </Row>
          <Row className="details">
            <div className="card">
              <div className="card-body">
                <div className="row justify-content-md-center">
                  <h5 className="card-title col">Chapters</h5>
                  <button className="btn btn-primary col-md-auto" onClick={this.handleAddChapter} >
                    Add a Chapter
                  </button>
                </div>
              </div>
              </div>   
          </Row>
          <Row>
            <Col>
              {this.state.chapters.map((e, key) => {
                return <div className="card" style={{marginBottom : 10 + "px"}} key={key} >
                <div className="card-body">
                  <div className="row justify-content-md-center">
                    <h5 className="card-title col">{e.name}</h5>
                    <button style={{marginRight: 50  + "px"}} className="btn btn-primary col-md-auto" onClick={ () => this.handleEdit(e.name)}>
                      Edit
                    </button>
                    <button style={{marginRight: 50  + "px"}} className="btn btn-danger col-md-auto" onClick={() => this.handleDelete(e.name)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>;
              })}
            </Col>
          </Row>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header >
              <Modal.Title>{this.state.modalHeading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Input placeholder="Enter New Name" value={this.state.modalInput} onChange={this.handleChange} ></Input>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={this.handleSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
        <NotificationContainer/>
      </div>
    )
  }
}

export default App;
