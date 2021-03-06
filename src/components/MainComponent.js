// import { Component } from 'react';
import React, { Component } from 'react';
import Menu from './MenuComponent';

import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import ContactCourse from './ContactComponentCourse';
// https://reactrouter.com/docs/en/v6/faq#what-happened-to-withrouter-i-need-it
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
} from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {
    // Chỉ có 1 feature được chọn để show, find 1st hoặc filter chọn result[0]
    // Đặt thếm homepage trung gian để viết gọn lại trong routes, xử lý truyền props gọn trước

    const HomePage = () => {
      // fetch trả về obj dishes lại bao gồm dishes bên trong
      return (
        <Home
          dish={
            this.props.dishesFetch.dishes.filter((dish) => dish.featured)[0]
          }
          dishesLoading={this.props.dishesFetch.isLoading}
          dishesErrMess={this.props.dishesFetch.errMess}
          promotion={
            this.props.promotionsFetch.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promoLoading={this.props.promotionsFetch.isLoading}
          promoErrMess={this.props.promotionsFetch.errMess}
          leader={this.props.leaders.find((leader) => leader.featured)}
        />
      );
    };

    // https://stackoverflow.com/questions/64782949/how-to-pass-params-into-link-using-react-router-v6/64816926
    const DishWithId = () => {
      const params = useParams();
      // console.log('params:', params);
      // Có thể thấy comments và dish đang xài chung isLoading với nhau
      // Thực tế có thể sẽ ko trả về cùng lúc như vậy ?
      // Có thể dùng|| ở đây để gom hết loading và err, gọn code ko
      return (
        <DishDetail
          selectedDish={
            this.props.dishesFetch.dishes.filter(
              (dish) => dish.id === parseInt(params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishesFetch.isLoading}
          errMess={this.props.dishesFetch.errMess}
          comments={this.props.commentsFetch.comments.filter(
            (comment) => comment.dishId === parseInt(params.dishId, 10)
          )}
          commentsErrMess={this.props.commentsFetch.errMess}
          postComment={this.props.postComment}
        />
      );
    };

    // Ko dùng vậy được vì hàm render ko được gọi lại theo kiểu router khi chuyển trang
    // let keyAnim = Date.now()
    // console.log('keyAnim:', keyAnim)

    // Chỗ này hack_fix chứ khá loạn xạ
    // Nên viết thẳng rfc từ đầu luôn sẽ đỡ hơn
    
    // https://github.com/remix-run/react-router/issues/8146#issuecomment-947860640
    // Có thể thử cách tiếp cận HOC nhưng thấy cụng kiểu hack-fix, đỡ refactor hơn
    // Bản thân proj này cấu trúc đã ko tốt sẵn -> chỉ có thể hack fix
    // Hướng tiếp cận rcc vs rfc cũng ko tối ưu
    // function withParams(Component) {
    //   return props => <Component {...props} params={useParams()} />;
    // }
    
    // // in BlogPost.js
    // class BlogPost extends React.Component {
    //   render() {
    //     let { id } = this.props.params;
    //     // ...
    //   }
    // }
    
    // export default withParams(BlogPost);
    
    const TransitionMain = () => {
      let { key } = useLocation();
      return (
        <TransitionGroup>
          <CSSTransition key={key} classNames="page" timeout={300}>
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
          </CSSTransition>
        </TransitionGroup>
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
        <TransitionMain />
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
  // Đạt trùng tên vẫn được nhưng khi đó sẽ là this.state.dishes.dishes.map(...)
  return {
    dishesFetch: state.dishes,
    commentsFetch: state.comments,
    promotionsFetch: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => {
    dispatch(postComment(dishId, rating, author, comment));
  },
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
// export default withRouter(connect(mapStateToProps)(Main));
// useParams -> khỏi xài withRouter
