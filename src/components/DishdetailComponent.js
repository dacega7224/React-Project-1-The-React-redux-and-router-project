/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-undef */
/* eslint-disable no-useless-constructor */
import React, {Component, useState}from "react"
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Col, Modal, ModalHeader, ModalBody,
  Label } from 'reactstrap';
import {Link } from "react-router-dom"
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Control, LocalForm,Errors} from 'react-redux-form';
// import { postComment } from "../redux/ActionCreators";

class CommentForm extends Component{
  render(){
    return (
      <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                <i class="fa-solid fa-pen"></i>
                                    <Button type="button"  onClick={this.props.onClick}><span className="fa-solid fa-pen" ></span>
                                    Comment
                                    </Button>
                                </Col>
                            </Row>
    )

  }
}


function RenderComment({comments, onClick, postComment, dishId}){


    if(comments === null){
        return (<div></div>)
    }else{


        let mapComment = comments.map((comments)=>
        <Stagger in>
             <Fade in>
                <ul className = "list-unstyled" key={comments.id}>
                <li>{comments.comment}</li>
                <li>-- {comments.author}, {new Intl.DateTimeFormat("en-US", {year: "numeric", month: "short", day: "2-digit"}).format(new Date (Date.parse(comments.date))) }</li>
                </ul>
                </Fade>
  </Stagger>
  )
  return(


    <div  className="col-12 col-md-5 m-1">
    <Card key ={comments.id}>
        <CardBody>
          <h4>Comments</h4>
          {mapComment}
          <CommentForm onClick = {onClick} dishId={dishId} postComment={postComment} />

        </CardBody>
    </Card>
</div>
)
}

}
function RenderDish({dish}){
  return (
       <div  className="col-12 col-md-5 m-1">
      <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card key={dish.id}>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        </div>
  )
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


function DishDetail (props){
// eslint-disable-next-line no-undef
console.log(props.postComment)
 const [isModalOpen, setModalOpen] = useState(false)
  function toggleModal() {
    setModalOpen((prev => !prev))
  }

  function handleSubmit(values) {
    toggleModal()
    props.postComment(props.dish.id, values.rating, values.author, values.comment);
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current values is: ' + JSON.stringify(values));

}

if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
    );
}
else if (props.errMess) {
    return(
        <div className="container">
            <div className="row">
                <h4>{props.errMess}</h4>
            </div>
        </div>
    );
}

else
        return (

        <div className="container">
        <div className="row">

        <Modal isOpen={isModalOpen} toggle={toggleModal}>
                            <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>


                            <LocalForm onSubmit={(values) => handleSubmit(values)}>
                                <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                    <Col md={10}>

                                        <Control.select model=".rating" name="rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>

                                        </Control.select>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="author" md={2}>Your Name</Label>
                                    <Col md={10}>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                            />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>


                                <Row className="form-group">
                                    <Label htmlFor="message" md={2}>Comment</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="6"
                                            className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size:10, offset: 2}}>
                                        <Button type="submit" color="primary">

                                        Submit
                                        </Button>
                                    </Col>
                                </Row>
        </LocalForm>



                            </ModalBody>
                        </Modal>
                            <Breadcrumb>

                                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr />
                            </div>
                        </div>
            <div className="row">


                                <RenderDish dish={props.dish} />


                                <RenderComment comments={props.comments} onClick = {toggleModal} />

            </div>
        </div>

            );

        }





export default DishDetail
