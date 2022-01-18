import React, { Fragment, useState } from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
  Input,
} from 'reactstrap';
import { Form, Field } from 'react-final-form';
// import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

const renderDish = (dish) =>
  (dish && (
    <Card className="border border-primary">
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  )) || <div></div>;

const RenderComments = ({ comments }) =>
  (comments && (
    <div>
      <h4>Comments</h4>
      {comments.map((el, idx) => {
        return (
          <Fragment key={idx}>
            <p>{el.comment}</p>
            <p>
              {/* 
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat

            Có thể dùng 

            ${new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            }).format(new Date(Date.parse(comment.date)))}
            */}
              {`
            -- ${el.author} , ${new Date(el.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            `}
            </p>
          </Fragment>
        );
      })}
    </div>
  )) || <div></div>;

// Form submit
const handleSubmit = (values, dishId, addComment) => {
  // console.log('dishId:', dishId);
  // console.log('values:', values);
  console.log('Current State is: ' + JSON.stringify(values));
  addComment(dishId, values.rating, values.author, values.comment);
  // alert('Current State is: ' + JSON.stringify(values));
  //   ev.preventDefault();
};

// Form validate
const required = (value) => (value ? undefined : 'Required');
const minLength = (min) => (value) =>
  !value || value.length >= min ? undefined : `Should be more than ${min} char`;
const maxLength = (max) => (value) =>
  value && value.length <= max ? undefined : `Should be less than ${max} char`;

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

// 2 function con nên chuyển thành rfc luôn hoặc để dạng fucntion local ??
export default function DishdetailComponent(props) {
  // BS modal in React
  let [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  // Phải khai báo default chứ ko dùng html selected vô input được
  let formData = { rating: 1 };
  // Bóc ra trước để an toàn vì component của BS có thể gây hiểu nhầm về props
  const {
    addComment,
    selectedDish: { id: dishId },
  } = props;

  // console.log('dishId:', dishId)
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.selectedDish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {renderDish(props.selectedDish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} />
          {/* Nếu onClick truyền toggle thì báo lỗi */}
          <Button outline onClick={handleOpenModal}>
            <span className="fa fa-pencil"></span> Submit Comment
          </Button>
        </div>
      </div>
      <Modal isOpen={showModal} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>Submit comment</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(values) => handleSubmit(values, dishId, addComment)}
            initialValues={formData}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <Field name="rating">
                  {({ input }) => (
                    <Row className="form-group">
                      <Label htmlFor="rating" md={12}>
                        Rating
                      </Label>
                      <Col md={12}>
                        <Input className="w-100" type="select" {...input}>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </Col>
                    </Row>
                  )}
                </Field>
                <Field
                  name="author"
                  validate={composeValidators(
                    required,
                    minLength(3),
                    maxLength(15)
                  )}
                >
                  {({ input, meta }) => {
                    return (
                      <Row className="form-group">
                        <Label htmlFor="author" md={12}>
                          Your Name
                        </Label>
                        <Col md={12}>
                          <Input
                            {...input}
                            type="text"
                            placeholder="Your Name"
                          />
                          {meta.error && meta.touched && (
                            <span className="text-danger">{meta.error}</span>
                          )}
                        </Col>
                      </Row>
                    );
                  }}
                </Field>
                <Field name="comment">
                  {({ input }) => (
                    <Row className="form-group">
                      <Label htmlFor="comment" md={12}>
                        Your Feedback
                      </Label>
                      <Col md={12}>
                        <Input {...input} type="textarea" rows="12" />
                      </Col>
                    </Row>
                  )}
                </Field>
                <Button type="submit" color="primary">
                  Send Feedback
                </Button>
                {/* <Row className="form-group">
                  <Col md={{ size: 10}}>
                  </Col>
                </Row> */}
              </form>
            )}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}
