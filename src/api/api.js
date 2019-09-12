import axios from 'axios';

let env = process.env.NODE_ENV;
console.log(env);

let base = '';
let iotApi = '';
if (env === "development"){
	iotApi = 'api';
} else {
	iotApi = '';
}

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const getDevList = params => {return axios.get(`${iotApi}/wxApi/getDevList`, { params: params }); };

export const saveDevCsv = params => {
	return axios({
		method: 'post',
		url: `${iotApi}/admin/upload/saveDevCsv`,
		data: params,
		headers: {'Content-Type': 'multipart/form-data'} 
	});
};

export const singleAuthorizeDevice = params => { return axios.get(`${iotApi}/wx/singleAuthorizeDevice`, { params: params }); };

export const deleteDev = params => { return axios.get(`${iotApi}/wxApi/deleteDev`, { params: params }); }