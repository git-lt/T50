'use strict';

import React from 'react-native';
import styles from '../Styles/Main';
import SearchResult from './SearchResult';
import icons from '../Assets/Icons';

let {
	Text,
	View,
	Image,
	ListView,
	ActivityIndicatorIOS,
	TouchableHighlight,
	NavigatorIOS,
	TextInput,
	AsyncStorage,
} = React;

class SearchForm extends React.Component {
	constructor(props){
		super(props);

		this.dataSource= new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2
		});

		this.state = {
			query: '',
			loaded: false,
			opacity: 0,
			searchHistory:[],
		};

		AsyncStorage.getItem('searchHistory')
		.then((searchHistory)=>{
			if(searchHistory){
				this.setState({
					searchHistory: JSON.parse(searchHistory)
				});
			}
		});
	}
	
	searchHistory(){
		let newSearchHistory = [...new Set([this.state.query, ...this.state.searchHistory])];
	
		this.setState({ searchHistory: newSearchHistory });

		AsyncStorage.setItem(
			'searchHistory', JSON.stringify(newSearchHistory)
		);
	}

	fetchData(){
		this.searchHistory();

		this.setState({
			loaded:false,
			opacity:1
		});

		const REQUEST_URL = `http://api.douban.com/v2/movie/search?q=${this.state.query}`;

		fetch(REQUEST_URL)
		.then(response => response.json())
		.then(responseData => {
			this.setState({
				loaded: true,
				opacity: 0
			});

			this.props.navigator.push({
				title: responseData.title,
				component: SearchResult,
				passProps:{
					results: responseData,
					query: this.state.query,
				}
			});
		})
		.done();
	}

	async search(item){
		try{
			await this.setState({
				query: item,
			});

			this.fetchData();
		}catch(e){
			console.log(e);
		}
	}

	deleteSearchHistoryItem(item){
		let newSearchHistory = new Set(this.state.searchHistory);
		newSearchHistory.delete(item);

		this.setState({
			searchHistory: [...newSearchHistory]
		})

		AsyncStorage.setItem(
			'searchHistory', JSON.stringify([...newSearchHistory])
		);
	}

	renderSearchHistoryList(item){
		return (
			<TouchableHighlight
				underlayColor='rgba(34,26,38,0.1)'
				onPress = {()=>this.search(item)}
			>
				<View style={styles.item}>
					<TouchableHighlight
					underlayColor='rgba(34,26,38,0.1)'
					onPress = {()=>this.deleteSearchHistoryItem(item)}
					>
						<Image source={{uri: icons.delete }} style={styles.deleteIcon} />
					</TouchableHighlight>
					<View style={ styles.itemContent }>
						<Text style={ styles.itemHeader }>{item}</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}


	render(){
		return (
			<View style={[styles.container, {paddingTop: 60}]}>
				<View style={styles.searchIptBox}>
					<TextInput
						value={this.state.query}
						placeholder="搜索 ..."
						style={{ height: 50 }}
						clearButtonMode = "while-editing"
						returnKeyType="search"
						onChangeText= {(query) => { this.setState({ query })}}
						onSubmitEditing= {this.fetchData.bind(this)}
					/>
					<ActivityIndicatorIOS 
						size="small"
						color="#6435c9"
						animating={!this.state.loaded}
						style={[styles.searchLoadingIco,{opacity: this.state.opacity}]}
					/>
				</View>

				<Text style={styles.searchHeader}>搜索历史</Text>
				<ListView 
					dataSource = {this.dataSource.cloneWithRows( this.state.searchHistory )}
					renderRow = {this.renderSearchHistoryList.bind(this)}
				/>
			</View>
		);
	}
}

export { SearchForm as default };
