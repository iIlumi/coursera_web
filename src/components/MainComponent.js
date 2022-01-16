// import { Component } from 'react';
import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

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
        <Menu
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
        />
        <Footer />
      </div>
    );
  }
}
