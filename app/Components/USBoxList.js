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
} = React;

class USBoxList extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			movies: [],
			loaded: false,
			count: 20,
			start: 0,
			total: 0,
		};

		this.dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2 
		});

		this.REQUEST_URL = 'https://api.douban.com/v2/movie/us_box';

		this.fetchData();
	}

	requestURL(
		url = this.REQUEST_URL,
		count = this.state.count,
		start = this.state.start
	){
		console.log(`${url}?count=${count}&start=${start}`);
		return (
			`${url}?count=${count}&start=${start}`
		);
	}

	fetchData(){
		fetch(this.requestURL())
		.then(response => response.json())
		.then(responseData => {
			let newStart = responseData.start + responseData.count;
			if(responseData.code==1998){
				console.warn('API 使用次数超限！！！！');
				return;
			}
			this.setState({
				movies: responseData.subjects,
				loaded: true,
				total: responseData.total,
				start: newStart,
			});
		})
		.done();
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
				onPress={() => this.showMovieDetail(movie.subject)}
			>
				<View style={styles.item}>
					<View style={styles.itemImage}>
						<Image source={{uri: movie.subject.images.large}} style = {styles.image}/>
					</View>

					<View style={styles.itemContent}>
						<Text style={styles.itemHeader}>{movie.subject.title}</Text>
						<Text style={styles.itemMeta}>
							{movie.subject.original_title} ( {movie.subject.year} )
						</Text>
						<Text style={styles.redText}>{movie.subject.rating.average}</Text>
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
						style={{paddingTop:55, paddingBottom:50}}
					/>
				</View>
			);
	}
	
	render(){
		return this.state.loaded ? this.renderMovieList() : this.renderLoading();
	}
}

export { USBoxList as default };