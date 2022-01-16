// import { Component } from 'react';
import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      // selectedDish: null,
    };
  }

  // onDishSelect = (dishId) => {
  //   console.log('click selected');
  //   this.setState({ selectedDish: dishId });
  // };

  render() {
    // Chỉ có 1 feature được chọn để show, find 1st hoặc filter chọn result[0]
    // Đặt thếm homepage trung gian để viết gọn lại trong routes, xử lý truyền props gọn trước
    
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.find((leader) => leader.featured)}
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
            element={<Menu dishes={this.state.dishes} />}
            // component={() => <Menu dishes={this.state.dishes} />}
            // old router
          />
          <Route path="/contactus" element={<Contact />} />
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
