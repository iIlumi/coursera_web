// import { Component } from 'react';
import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './HomeComponent';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }

  onDishSelect = (dishId) => {
    console.log('click selected');
    this.setState({ selectedDish: dishId });
  };

  render() {
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
          <Route path="/home" element={<Home />} />
          <Route
            path="/menu"
            element={<Menu dishes={this.state.dishes} />}
            // component={() => <Menu dishes={this.state.dishes} />}
            // old router
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
