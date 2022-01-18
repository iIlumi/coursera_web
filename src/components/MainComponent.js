// import { Component } from 'react';
import React, { Component } from 'react';
import Menu from './MenuComponent';

import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import ContactCourse from './ContactComponentCourse';
// https://reactrouter.com/docs/en/v6/faq#what-happened-to-withrouter-i-need-it
import { addComment, fetchDishes } from '../redux/ActionCreators';

class Main extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     dishes: DISHES,
  //     comments: COMMENTS,
  //     promotions: PROMOTIONS,
  //     leaders: LEADERS,
  //     // selectedDish: null,
  //   };
  // }

  // onDishSelect = (dishId) => {
  //   console.log('click selected');
  //   this.setState({ selectedDish: dishId });
  // };

  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {
    // Chỉ có 1 feature được chọn để show, find 1st hoặc filter chọn result[0]
    // Đặt thếm homepage trung gian để viết gọn lại trong routes, xử lý truyền props gọn trước

    const HomePage = () => {
      // fetch trả về obj dishes lại bao gồm dishes bên trong
      return (
        <Home
          dish={this.props.dishesFetch.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishesFetch.isLoading}
          dishesErrMess={this.props.dishesFetch.errMess}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.find((leader) => leader.featured)}
        />
      );
    };

    // https://stackoverflow.com/questions/64782949/how-to-pass-params-into-link-using-react-router-v6/64816926
    const DishWithId = () => {
      const params = useParams();
      // console.log('params:', params);
      return (
        <DishDetail
          selectedDish={
            this.props.dishesFetch.dishes.filter(
              (dish) => dish.id === parseInt(params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishesFetch.isLoading}
          errMess={this.props.dishesFetch.errMess}
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(params.dishId, 10)
          )}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div>
        <Header />
        {/* <Menu
          dishes={this.state.dishes}
          // selectDish = {this.onDishSelect}
          // Truyền callback kiểu nào trên chuẩn hơn
          onClick={(dishId) => {
            console.log('click menu component');
            this.onDishSelect(dishId);
          }}
        />
        <DishDetail
          selectedDish={this.state.dishes.find(
            (el) => el.id === this.state.selectedDish
          )}
        /> */}

        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/menu"
            element={<Menu dishesFetch={this.props.dishesFetch} />}
            // component={() => <Menu dishes={this.state.dishes} />}
            // old router
          />
          <Route path="/menu/:dishId" element={<DishWithId />} />
          <Route path="/contactus" element={<ContactCourse />} />
          <Route path="/contactme" element={<Contact />} />
          <Route
            path="/aboutus"
            element={<About leaders={this.props.leaders} />}
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </div>
    );
    // https://stackoverflow.com/questions/69868956/how-to-redirect-in-react-router-v6
    // https://reactrouter.com/docs/en/v6/getting-started/overview#not-found-routes
    // https://reactrouter.com/docs/en/v6/upgrading/v5#remove-redirects-inside-switch
  }
}

const mapStateToProps = (state) => {
  // Vì state ở vd này đơn giản nên chứa chính các obj này luôn
  // const { dishes, comments, promotions, leaders } = state
  return {
    dishesFetch: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => {
    dispatch(addComment(dishId, rating, author, comment));
  },
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
// export default withRouter(connect(mapStateToProps)(Main));
// useParams -> khỏi xài withRouter
