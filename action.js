
import { actionMixin, fetch, getComponent, navigate } from 'maka'
import md5 from 'md5'

@actionMixin('base')
export default class action {
    constructor(option) {
        Object.assign(this, option.mixins)
    }

    onInit = () => {
        var form = {
            password: localStorage['login.password'] && Array(parseInt(localStorage['login.passwordLength']) + 1).join('*'),
            user: localStorage['login.user']
        }
        this.base.setState({ 'data.form': form })
    }


    login = (data) => async () => {
        const form = data.form

        if (!this.checkUser(form.user)) return
        if (!this.checkPassword(form.password)) return
        var pwd = form.password
        pwd = (localStorage['login.password'] && pwd == Array(parseInt(localStorage['login.passwordLength']) + 1).join('*'))
            ? localStorage['login.password']
            : md5(pwd)

        const response = await fetch.post('/v1/user/login', { account: form.user, password: pwd })
        const Toast = getComponent('antdMobile.Toast')
        if (response.result == false) {
            Toast && Toast.show(response.error.message)
        }
        else {
            Toast && Toast.show('sign in success')

            this.base.context.set('currentUser', response)

            localStorage['login.user'] = form.remember ? form.user : ''
            localStorage['login.password'] = form.remember ? pwd : ''
            localStorage['login.passwordLength'] = form.remember ? form.password.length : ''

            navigate.redirect('/zlj-portal')
        }
    }

    checkUser = (user) => {
        var message = (!user && 'Please input your mobile!') || (!/^1[3|4|5|8][0-9]\d{8}$/.test(user) && 'This is an invalid mobile number')

        var Toast = getComponent('antdMobile.Toast')
        if (message)
            Toast.show(message)

        return !message
    }

    checkPassword = (password) => {
        var message = !password && 'Please input your password'
        var Toast = getComponent('antdMobile.Toast')
        if (message)
            Toast.show(message)

        return !message
    }


    goForgetPassword = () => {
        if (this.component.props.onRedirect && this.config.goForgetPassword) {
            this.component.props.onRedirect(this.config.goForgetPassword)
        }
    }

    keyup = (e) => {
        if (e.type === 'keyup' && (e.key === 'Enter' || e.keyCode == 13) && e.target.tagName != 'BUTTON') {
            this.login()
        }
    }

    componentDidMount = () => {
        const win = window
        if (win.addEventListener) {
            win.addEventListener('keyup', this.keyup, false)
        } else if (win.attachEvent) {
            win.attachEvent('onkeyup', this.keyup)
        } else {
            win.onKeyUp = this.keyup
        }
    }

    componentWillUnmount = () => {
        const win = window
        if (win.removeEventListener) {
            win.removeEventListener('keyup', this.keyup, false)
        } else if (win.detachEvent) {
            win.detachEvent('onkeyup', this.keyup)
        } else {
            win.onKeyUp = undefined
        }
    }

}
