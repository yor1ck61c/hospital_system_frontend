import { myLogin, myGetUserInfo, myLogout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

// Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。
// 它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

// 定义store的初始变量
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userId: '',
    hospitalName: '',
    centerType: '',
    roles: []
  }
}

// 初始化store的值
const state = getDefaultState()

// 定义改变store的值的操作
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_CENTER_TYPE: (state, centerType) => {
    state.centerType = centerType
  },
  SET_HOSPITAL_NAME: (state, hospitalName) => {
    state.hospitalName = hospitalName
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {

  myLogin({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      myLogin({ username: username.trim(), password: password }).then(res => {
        const { data } = res
        // vue中的store全局变量里扔一个token
        commit('SET_TOKEN', data)
        // 给cookie中扔一个token
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  myGetUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      myGetUserInfo(state.token).then(res => {
        if (!res.data) {
          return reject('拉取用户信息失败，请重新登录。')
        }
        const { username, avatar, role, id, hospitalName, centerType } = res.data
        // alert(username + ' ' + avatar + ' ' + role + ' ' + id)
        const roles = role.split(',')
        commit('SET_USER_ID', id)
        commit('SET_ROLES', roles)
        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        commit('SET_HOSPITAL_NAME', hospitalName)
        commit('SET_CENTER_TYPE', centerType)
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  myLogout({ commit, state }) {
    return new Promise((resolve, reject) => {
      myLogout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

