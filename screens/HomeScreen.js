import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ButtonGroup, ListItem } from 'react-native-elements'; 
import { connect } from 'react-redux'

import * as actions from '../actions'

const ALL_INDEX = 0;
const GREAT_INDEX = 1;
const GREAT_COLOR = 'red';

const GOOD_INDEX = 2 ;
const GOOD_COLOR = 'orange';


const POOR_INDEX = 3;
const POOR_COLOR = 'blue';

const GREAT = 'sentiment-very-satisfied'; // ←忘れずに
const GOOD = 'sentiment-satisfied'; // ←忘れずに
const POOR = 'sentiment-dissatisfied'; // ←忘れずに


class HomeScreen extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      selectedIndex: 0
    };
	}

	componentDidMount(){
		this.props.fetchAllReviews();
	}
	
	onListItemPress = (selectedReview) => {
		this.props.selectDetailReview(selectedReview);
		this.props.navigation.navigate('detail');
	}

  renderReviews(){
    let reviewRank;

    switch (this.state.selectedIndex) {
      case GREAT_INDEX:
        reviewRank = GREAT;
        break;

      case GOOD_INDEX:
        reviewRank = GOOD;
        break;

      case POOR_INDEX:
        reviewRank = POOR;
        break;

      default:
        break;
    }

    let rankedReviews = [];

    if (this.state.selectedIndex === ALL_INDEX) { 
      rankedReviews = this.props.allReviews; 
    } 
    else 
    { 
      for (let i = 0; i < this.props.allReviews.length; i++) {
        if (this.props.allReviews[i].rank === reviewRank) {
          rankedReviews.push(this.props.allReviews[i]);
        }
      }
    }
		console.log(rankedReviews)
    return (
      <ScrollView>
        {rankedReviews.map((review, index) => {
					let reviewColor;

					switch (review.rank){
						case GREAT:
							reviewColor = GREAT_COLOR;
							break; 
							
						case GOOD: 
							reviewColor = GOOD_COLOR; 
							break; 
							
						case POOR: 
							reviewColor = POOR_COLOR; 
							break; 
							
						default: 
							break; 
					}

            return(
              <ListItem
								key={index}
								leftIcon={{ name: review.rank, color:reviewColor }}
								title={review.country}
								subtitle={`${review.dateFrom} ~ ${review.dateTo}`}
								onPress={() => this.onListItemPress(review)}
							/>
            );
          })
        }
      </ScrollView>
    );
  }

  onButtonGroupPress = (selectedIndex) => {
    this.setState({
      selectedIndex: selectedIndex
    });
  }


  render(){

		let nGreat = 0; // "Number of Great" の略。値が変更され得るので`let`で宣言
		let nGood = 0; // "Number of Good" の略。値が変更され得るので`let`で宣言
		let nPoor = 0; // "Number of Poor" の略。値が変更され得るので`let`で宣言
		
		// `i` が0から1ずつ増えていって(`this.props.allReviews.length`-1)になるまでの
		// 計`this.props.allReviews.length`回分繰り返す
		for (let i = 0; i < this.props.allReviews.length; i++) {
			switch (this.props.allReviews[i].rank) { // もし`this.props.allReviews[i]`の`rank`が
				case GREAT: // `GREAT`だったら、
					nGreat++; // `nGreat`を1追加
					break; // 比較を終了して抜け出す
	
				case GOOD: // `GOOD`だったら、
					nGood++; // `nGood`を1追加
					break; // 比較を終了して抜け出す
	
				case POOR: // `POOR`だったら、
					nPoor++; // `nPoor`を1追加
					break; // 比較を終了して抜け出す
	
				default: // それ以外だったら、
					break; // (特に何もせず)抜け出す
			}
		}

    const buttonList = [
      `All(${this.props.allReviews.length})`,
      `Great (${nGreat})`,
      `Good (${nGood})`,
      `Poor (${nPoor})`,
    ];

    return(
      <View style={{ flex:1 }}>
        <ButtonGroup
          buttons={buttonList}   
          selectedIndex={this.state.selectedIndex}    
          onPress={this.onButtonGroupPress} 
        />
				{this.renderReviews()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
	return{
		allReviews: state.review.allReviews
	};
};


export default connect(mapStateToProps, actions)(HomeScreen);