'use strict';

import React from 'react-native';

let { StyleSheet } = React;

let styles = StyleSheet.create({
	container:{
		backgroundColor:'#eae7ff',
		flex:1,
	},
	loading:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	item:{
		flexDirection:'row',
		borderBottomWidth:1,
		borderColor:'rgba(100,53,201,0.1)',
		paddingBottom:6,
		paddingTop:6,
	},
	itemImage:{

	},
	image:{
		width:99,
		height:138,
		margin:6,
	},
	itemText:{
		fontSize: 15,
		fontFamily:'Helvetica Neue',
		fontWeight: '300',
		color:'rgba(0,0,0,0.8)',
		lineHeight: 26,
	},
	itemContent:{
		flex:1,
		marginLeft:13,
		marginTop:6,
	},
	itemHeader:{
		fontSize:18,
		fontFamily: 'Helvetica Neue',
		fontWeight: '300',
		color: '#6435c9',
		marginBottom: 6,
	},
	itemMeta:{
		fontSize: 16,
		color: 'rgba(0,0,0,0.6)',
		marginBottom:6,
	},
	redText:{
		color:'#db2828',
		fontSize:15,
	},
	footerLoading:{
		marginVertical: 20,
		paddingBottom:50,
		alignSelf: 'center',
	},
	footerLoadingTxt:{
		color:'rgba(0,0,0,0.3)'
	},
	detailSumTxt:{
		marginBottom:5,
		color:'rgba(0,0,0,0.6)',
	},
	detailTit:{
		color:'#888',
		paddingLeft:5,
		fontSize: 16,
		fontFamily:'Helvetica Neue',
		fontWeight: '300',
		lineHeight:32,
	},
	searchIptBox:{
		padding:7,
		paddingBottom:0,
		borderColor:'rgba(100, 53, 201, 0.1)',
		borderBottomWidth: 1,
	},
	searchLoadingIco:{
		position: 'absolute',
		right: 10,
		top: 20,
	},
	searchHeader:{
		color: 'rgba(0,0,0,0.8)',
		fontSize: 18,
		marginTop: 30,
		marginLeft: 10,
	},
	deleteIcon: {
		width: 20,
		height: 20,
		margin: 10,
		opacity: 0.6,
	}
});

export { styles as default };