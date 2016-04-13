'use strict';

import React from 'react-native';
import styles from '../Styles/Main';

let {
	Text,
	View,
	Image,
	ListView,
	ActivityIndicatorIOS,
	TouchableHighlight,
	ScrollView,
} = React;

class MovieDetail extends React.Component{
	constructor(props){
		super(props);

		this.state= {
			movieDetail: '',
			loaded: false,
		};

		const REQUEST_URL = `https://api.douban.com/v2/movie/subject/${this.props.movie.id}`;

		this.fetchData(REQUEST_URL);
	}
	
	fetchData(REQUEST_URL){
		fetch(REQUEST_URL)
		.then(response => response.json())
		.then(responseData => {
			this.setState({
				movieDetail: responseData,
				loaded: true,
			});
		})
		.done();
	}

	renderLoading(){
		return(
			<View style={styles.container}>
				<View style={styles.loading}>
					<ActivityIndicatorIOS size="large" color="#6435c9" />
				</View>
			</View>
		);
	}

	renderDetail(){
		let movie = this.state.movieDetail;
		let defaultAvatar = "https://img3.doubanio.com/f/shire/da4faafb3525db92cb322b3722210c56b84b26eb/pics/celebrity-default-small.gif";
		let casts = movie.casts.map((c, index) => {
			let avatar  = (c.avatars && c.avatars.small || defaultAvatar);
			return (
				<View style={[styles.container,{margin:5}]} key={index}>
					<Image source={{uri:avatar}} style={{width:70, height:100}} />
					<Text style={{padding:5, textAlign:'center', fontSize:12, width:70}}>{c.name}</Text>
				</View>
			);
		});

		let summary = movie.summary.split(/\n/).map((p, index)=>{
			return (
				<View style={{marginBottom: 15, paddingLeft: 6, paddingRight: 6}} key={index}>
					<Text style={styles.itemText}>{p}</Text>
				</View>
			);
		});
		let aka = (()=>{
			if(movie.aka.length){
				return (
					<Text style={styles.detailSumTxt}>又名：{movie.aka.join(' / ')}</Text>
				);
			}else{
				return [];
			}
		})();
		return (
			<View style={[styles.container, {paddingTop: 70, paddingBottom:60}]}>
				<ScrollView
					automaticallyAdjustContentInsets={false}
	        alwaysBounceHorizontal={false}
	        alwaysBounceVertical={false}
	        horizontal={false}
	        style={{paddingLeft:10, paddingRight:10}}
				>
					<View style={[styles.item, {flexDirection: 'column'}]}>

						<Text style={styles.detailSumTxt}>上映年代：{movie.year}</Text>
						<Text style={styles.detailSumTxt}>类型：{movie.genres.join(' / ')}</Text>
						<Text style={styles.detailSumTxt}>制片国家：{movie.countries.join(' / ')}</Text>
						{aka}
						<View>
							<Text style={styles.detailTit}>主演</Text>
							<ScrollView 
								automaticallyAdjustContentInsets={false}
				        alwaysBounceHorizontal={false}
				        alwaysBounceVertical={false}
				        horizontal={true}
				        style={{flex:1, flexDirection:'row',paddingTop:5}}
							>
								{casts}
							</ScrollView>
						</View>
						
						<Text style={styles.detailTit}>剧情简介</Text>
						{summary}
					</View>
				</ScrollView>
			</View>
		);
	}

	render(){
		return this.state.loaded ? this.renderDetail() : this.renderLoading();
	}
}

export {MovieDetail as default };

