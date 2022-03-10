// getter用于取vuex中定义的全局变量。
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  roles: state => state.user.roles,
  hospitalName: state => state.user.hospitalName,
  permission_routes: state => state.permission.routes
}
export default getters
