import { Form, Field } from 'react-final-form';
import { Button, Row, Col, Label, Input } from 'reactstrap';

// ===========================================================

const handleSubmit = (values) => {
  console.log('Current State is: ' + JSON.stringify(values));
  alert('Current State is: ' + JSON.stringify(values));
  //   ev.preventDefault();
};

// ===========================================================
// http://jinno.io/app/14/?source=react-final-form

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const onSubmit = async (values) => {
//   await sleep(300);
//   window.alert(JSON.stringify(values, 0, 2));
// };

const required = (value) => (value ? undefined : 'Required');
const mustBeNumber = (value) => (isNaN(value) ? 'Must be a number' : undefined);
const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

export const FinalReactFormDemo = () => {
  let formData = {};
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={formData}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="firstName">
            {({ input, meta }) => {
              console.log('meta:', meta);
              console.log('input:', input);

              return (
                <Row className="form-group">
                  <Label htmlFor="firstname" md={2}>
                    First Name
                  </Label>
                  <Col md={10}>
                    <Input {...input} type="text" placeholder="First Name" />
                  </Col>
                </Row>
              );
            }}
          </Field>
          <Field name="lastName">
            {({ input, meta }) => (
              <Row className="form-group">
                <Label htmlFor="lastname" md={2}>
                  Last Name
                </Label>
                <Col md={10}>
                  <Input {...input} type="text" placeholder="Last Name" />
                </Col>
              </Row>
            )}
          </Field>
          <Field name="telnum">
            {({ input, meta }) => (
              <Row className="form-group">
                <Label htmlFor="telnum" md={2}>
                  Contact Tel.
                </Label>
                <Col md={10}>
                  <Input {...input} type="tel" placeholder="Tel. Number" />
                </Col>
              </Row>
            )}
          </Field>
          <Field name="email">
            {({ input, meta }) => (
              <Row className="form-group">
                <Label htmlFor="email" md={2}>
                  Email
                </Label>
                <Col md={10}>
                  <Input {...input} type="tel" placeholder="Email" />
                </Col>
              </Row>
            )}
          </Field>
          <Row className="form-group">
            <Field name="agree">
              {({ input, meta }) => (
                <Col md={{ size: 6, offset: 2 }}>
                  <div className="form-check">
                    <Label check>
                      <Input type="checkbox" {...input} />
                      <strong>May we contact you?</strong>
                    </Label>
                  </div>
                </Col>
              )}
            </Field>
            <Field name="contactType">
              {({ input, meta }) => (
                <Col md={{ size: 3, offset: 1 }}>
                  <Input type="select" {...input}>
                    <option>Tel.</option>
                    <option>Email</option>
                  </Input>
                </Col>
              )}
            </Field>
          </Row>
          <Field name="message">
            {({ input, meta }) => (
              <Row className="form-group">
                <Label htmlFor="message" md={2}>
                  Your Feedback
                </Label>
                <Col md={10}>
                  <Input
                    {...input}
                    type="textarea"
                    rows="12"
                  />
                </Col>
              </Row>
            )}
          </Field>

          <Row className="form-group">
            <Col md={{ size: 10, offset: 2 }}>
              <Button type="submit" color="primary">
                Send Feedback
              </Button>
            </Col>
          </Row>
        </form>
      )}
    />
  );
};
