import React, { Fragment } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
// import dateFormat from 'dateformat';

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

const RenderComments = ({ dish }) =>
  (dish && dish.comments && (
    <div>
      <h4>Comments</h4>
      {dish.comments.map((el, idx) => {
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
  return props.selectedDish ? (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {renderDish(props.selectedDish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments dish={props.selectedDish} />
        </div>
      </div>
    </div>
  ) : null;
}
