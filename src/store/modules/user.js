import { myLogin, myGetUserInfo, myLogout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
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
        commit('SET_TOKEN', data)
        // cookie的token
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
        alert(res.data.username)
        const { username, avatar } = res.data

        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
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

