import config from './config'

export default {

    get(key: string) { return this[key] },

    Success: { code: 1, msg: '成功' },
    Fail: { code: -1, msg: '失败' },
    AuthFail: { code: 100001, msg: `身份验证失败:${config.API_NAME}` },
    NotFound: { code: 100002, msg: '请求的资源不存在:@param' },

    CommonErr: { code: 110000 },
    SysTypeEmpty: { code: 110001 },
    UsernameEmpty: { code: 110002 },
    PasswordEmpty: { code: 110003 },
    LoginFail: { code: 110004, msg: '用户名或密码错误' },
    VerifyFail: { code: 110005, msg: '访问令牌验证失败' },
    UserExist: { code: 110006, msg: '用户已经存在' },

    KeyEmpty: { code: 110900 },
    ConfigNotExist: { code: 110901, msg: '请求的配置不存在' },
}
