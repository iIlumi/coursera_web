import React, { Fragment } from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
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

// 2 function con nên chuyển thành rfc luôn hoặc để dạng fucntion local ??
export default function DishdetailComponent(props) {
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
        </div>
      </div>
    </div>
  );
}
