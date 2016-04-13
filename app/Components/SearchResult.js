'use strict';

import React from 'react-native';
import styles from '../Styles/Main';
import MovieDetail from './MovieDetail';

let {
	Text,
	View,
	Image,
	ListView,
	ActivityIndicatorIOS,
	TouchableHighlight,
	NavigatorIOS
} = React;

class SearchResult extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			movies: this.props.results.subjects,
			count: this.props.results.count,
			start: this.props.results.start,
			total: this.props.results.total,
			query: this.props.query,
		};

		this.dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2 
		});

		this.REQUEST_URL = 'http://api.douban.com/v2/movie/search';

	}

	requestURL(
		url = this.REQUEST_URL,
		count = this.state.count,
		start = this.state.start,
		query = this.state.query
	){
		console.log(`${url}?q={query}&count=${count}&start=${start}`);
		return (
			`${url}?q={query}&count=${count}&start=${start}`
		);
	}


	showMovieDetail(movie){
		this.props.navigator.push({
			title: movie.title,
			component: MovieDetail,
			passProps:{movie}
		});
	}


	renderMovieItem(movie){
		return (
			<TouchableHighlight
				underlayColor="rgba(34, 26, 38, 0.1)"
				onPress={() => this.showMovieDetail(movie)}
			>
				<View style={styles.item}>
					<View style={styles.itemImage}>
						<Image source={{uri: movie.images.large}} style = {styles.image}/>
					</View>

					<View style={styles.itemContent}>
						<Text style={styles.itemHeader}>{movie.title}</Text>
						<Text style={styles.itemMeta}>
							{movie.original_title} ( {movie.year} )
						</Text>
						<Text style={styles.redText}>{movie.rating.average}</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}

	loadMore(){
		fetch(this.requestURL())
		.then(response => response.json())
		.then(responseData=>{
			let newStart = responseData.start + responseData.count;
			this.setState({
				movies:[...this.state.movies, ...responseData.subjects],
				start: newStart
			});
		})
		.done();
	}

	onEndReached(){
		console.log(
			`到底了！ 开始：${this.state.start}, 总共：${this.state.total}`
		);
		this.state.total > this.state.start && this.loadMore();
	}

	renderFooter(){
		if(this.state.total > this.state.start){
			return (
				<View style={ styles.footerLoading }>
					<ActivityIndicatorIOS />
				</View>
			);
		}else{
			return (
				<View style={ styles.footerLoading }>
					<Text style={ styles.footerLoadingTxt }>
						没有可以显示的内容了：）
					</Text>
				</View>
			);
		}
	}

	renderLoading(){
		return (
			<View style={styles.container}>
				<View style={styles.loading}>
					<ActivityIndicatorIOS size="large" color="#6435c9" />
				</View>
			</View>
		);
	}

	renderMovieList (){
			return (
				<View style={styles.container}>
					<ListView 
						renderFooter = {this.renderFooter.bind(this)}
						pageSize = {this.state.count}
						initialListSize = {this.state.count}
						dataSource = {this.dataSource.cloneWithRows(this.state.movies)}
						renderRow = {this.renderMovieItem.bind(this)}
						onEndReached = {this.onEndReached.bind(this)}
						style={{paddingBottom:50}}
					/>
				</View>
			);
	}
	
	render(){
		return this.renderMovieList();
	}
}

export { SearchResult as default };