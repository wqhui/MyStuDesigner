import {Map,List} from 'immutable';

const  defAppState = {
	clientinfo: {device:"web",useragent:"webkit", ip:"", width:1024, height:768, clientType:""},
	user: {logon:false,name:"",photo:"",token:"", locale:"zh_CN"},
	forms: new Map(),
	shareState: {},
	location:{details:{},time:'2018/01/01 12:03:09'}
};

export default defAppState;