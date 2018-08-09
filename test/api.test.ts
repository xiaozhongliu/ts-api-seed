import request from 'supertest'
import app from '../app'
import messages from '../message'
const { Success } = messages

describe('api tests', () => {

    let jwt

    it('monitor     ', async () => {
        const { body } = await request(app).get('/')
        expect(body.code).toBe(Success.code)
    })

    it('login       ', async () => {
        const { body } = await request(app)
            .post('/login')
            .send({
                'sysType': 1,
                'username': 'unittest',
                'password': 'e10adc3949ba59abbe56e057f20f883e',
            })
        expect(body.code).toBe(Success.code)
        expect(body.data.jwt).not.toBeNull()
        jwt = body.data.jwt
    })

    it('verify      ', async () => {
        const { body } = await request(app)
            .get('/verify')
            .set('Authorization', `Bearer ${jwt}`)
        expect(body.code).toBe(Success.code)
        expect(body.data.username).not.toBeNull()
    })

    it('register    ', async () => {
        const { body } = await request(app)
            .post('/register')
            .send({
                'sysType': 1,
                'username': 'unittest',
                'password': 'e10adc3949ba59abbe56e057f20f883e',
                'avatar': 'https://nodejs.org/static/images/logo.svg',
            })
        expect(body.code).toBe(messages.UserExist.code)
    })
})
